const setNotificationJWTToken = await import("StoreFrontContainerReduxSlice/StoreFrontContainerReduxSlice").then((module)=>module.setNotificationJWTToken);
const  {React, useCallback, useEffect } = await import("react").then((module)=>({React:module.default,useCallback:module.useCallback,useEffect:module.useEffect}));
const { useDispatch, useSelector } = await import("react-redux").then((module)=>({ useSelector: module.useSelector,  useDispatch: module.useDispatch}));
const { API } = await import("@getflits/storefront-shared-api/src/storefront-shared-apis/allAPI").then((module) => module)

export const NotificationJWT = () => {
  const notificationJWTToken = useSelector(
    (state) => state.storeFrontContainer.notificationJWTToken
  );
  const dispatch = useDispatch();

  const getToken = useCallback(async () => {
    let shopID = window?.flitsThemeAppExtensionObjects?.shop_id;
    const takePrefixName = window?.flitsThemeAppExtensionObjects?.proxy_name;
    const prefixMap = {
      FlitsDev1: "dev1_app_",
      FlitsDev2: "dev2_app_",
      FlitsDev3: "dev3_app_",
      FlitsDev4: "dev4_app_",
      FlitsTesting: "testing_app_",
      flits: "shopify_app_"
    };
    const beforeLoginPayloadData = {
      action: "create_notification_token",
      merchant_id: `${prefixMap[takePrefixName]}${shopID}`,
    };
    const afterLoginPayloadData = {
      action: "create_notification_token",
      merchant_id: `${prefixMap[takePrefixName]}${shopID}`,
      customer_id: window?.flitsThemeAppExtensionObjects?.customer?.customer_id,
      token: window?.flitsThemeAppExtensionObjects?.shop_token,
      customer_hash:
        window?.flitsThemeAppExtensionObjects?.customer?.customer_hash,
    };

    const presentCustomerId =
      window?.flitsThemeAppExtensionObjects?.customer?.customer_id !== "" &&
      window?.flitsThemeAppExtensionObjects?.customer?.customer_id !== "-1";
    const JWTToken = await API.notification.getJwttoken(
      presentCustomerId ? afterLoginPayloadData : beforeLoginPayloadData
    );
    dispatch(setNotificationJWTToken(JWTToken));
  }, [ dispatch]);
  useEffect(() => {
    if (!notificationJWTToken) {
      getToken();
    }
  }, [notificationJWTToken, getToken]);

  return <></>;
};
