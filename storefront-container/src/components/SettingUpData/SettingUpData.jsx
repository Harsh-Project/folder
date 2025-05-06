const { React, Suspense, useCallback, lazy, useEffect } = await import(
  "react"
).then((module) => ({
  lazy: module.lazy,
  useCallback: module.useCallback,
  useEffect: module.useEffect,
  Suspense: module.Suspense,
  React: module.default,
}));
const { useDispatch, useSelector } = await import("react-redux").then(
  (module) => ({
    useDispatch: module.useDispatch,
    useSelector: module.useSelector,
  })
);
const { setLanguageData, setMicroFrontEndData, setRedirectURLAfterLogin } =
  await import(
    "../../StoreFrontContainerReduxSlice/StoreFrontContainerReduxSlice"
  ).then((module) => ({
    setLanguageData: module.setLanguageData,
    setMicroFrontEndData: module.setMicroFrontEndData,
    setRedirectURLAfterLogin: module.setRedirectURLAfterLogin,
  }));
const { setShopifyCartData } = await import(
  "StoreFrontContainerReduxSlice/StoreFrontShopifyDataReduxSlice"
).then((module) => module);
const { MainAction } = await import("components/RenderMainAction").then(
  (module) => module
);
const Analytics = lazy(() => import("components/Analytics/Analytics"));
const SetLastVisitedUrl = await import(
  "components/UtilityFunction/SetLastVisitedUrl"
).then((module) => module.SetLastVisitedUrl);
const GetShopifyCartData = await import(
  "components/UtilityFunction/GetShopifyCartData"
).then((module) => module.GetShopifyCartData);
const SetupCartEvents = await import(
  "components/UtilityFunction/SetupCartEvents"
).then((module) => module.SetupCartEvents);
const SetLocalStorage = await import(
  "components/UtilityFunction/LocalStorage"
).then((module) => module.SetLocalStorage);
const SetCustomFieldValueAjax = await import(
  "components/UtilityFunction/SetCustomFieldValueAjax"
).then((module) => module.SetCustomFieldValueAjax);
const EVENTS = await import("components/UtilityFunction/EVENTS").then(
  (module) => module.EVENTS
);
const Utility = await import("../UtilityFunction/UtilityFunction").then(
  (module) => module.Utility
);
const API = await import("@getflits/storefront-shared-api/src/storefront-shared-apis/allAPI").then(
  (module) => module.API
);
const NotificationJWT = await import("components/NotificationJWT/NotificationJWT").then(
  (module) => module.NotificationJWT
);
const NotificationCode = await import("components/NotificationCode/NotificationCode").then(
  (module) => module.NotificationCode
);

const SettingUpData = (props) => {
  const microFrontEndData = useSelector(
    (state) => state.storeFrontContainer.microFrontEndData
  );
  const languageData = useSelector(
    (state) => state.storeFrontContainer.languageData
  );

  const dispatch = useDispatch();
  const SetColorSetting = (colorData) => {
    const data = {
      borderColor: "rgb(142, 142, 142)",
      facebookBGColor: "rgb(59, 89, 152)",
      facebookTextColor: "rgb(255, 255, 255)",
      whatsappBGColor: "rgb(18, 140, 126)",
      whatsappTextColor: "rgb(255, 255, 255)",
      shareBGColor: "rgb(42, 187, 188)",
      shareTextColor: "rgb(255, 255, 255)",
      googleplusBGColor: "rgb(66, 133, 244)",
      googleplusTextColor: "rgb(255, 255, 255)",
      twitterBGColor: "rgb(0, 172, 237)",
      twitterTextColor: "rgb(255, 255, 255)",
      amazoneBGColor: "rgb(255, 153, 0)",
      inputBoxShadow: "0px 0px 3px 2px rgb(147 147 147 / .3)",
      amazoneTextColor: "rgb(0, 0, 0)",
      primaryTingleButtonBGColor: "rgb(0, 6, 84)",
      primaryTingleButtonHoverBGColor: "rgb(77, 81, 169)",
      primaryTingleButtonTextColor: "rgb(255, 255, 255)",
      secondaryTingleButtonBGColor: "rgb(0, 6, 84)",
      secondaryTingleButtonTextColor: "rgb(0, 6, 84)",
      cardBGColor: "rgb(255, 255, 255)",
      earn: "rgb(37, 216, 114)",
      spent: "rgb(234, 28, 44)",
      current: "rgb(0, 101, 209)",
      inputBGColor: "rgb(235, 240, 247)",
      ALERT_DANGER: "rgb(255, 0, 0)",
      before_heart_clr:
        window?.flitsThemeAppExtensionObjects?.Metafields
          ?.WSL_BEFORE_HEART_COLOR,
      before_btn_clr:
        window?.flitsThemeAppExtensionObjects?.Metafields?.WSL_BEFORE_BTN_COLOR,
      before_text_clr:
        window?.flitsThemeAppExtensionObjects?.Metafields
          ?.WSL_BEFORE_BTN_TEXT_COLOR,
      before_border_clr:
        window?.flitsThemeAppExtensionObjects?.Metafields
          ?.WSL_BEFORE_BTN_BORDER_COLOR,
      after_heart_clr:
        window?.flitsThemeAppExtensionObjects?.Metafields
          ?.WSL_AFTER_HEART_COLOR,
      after_btn_clr:
        window?.flitsThemeAppExtensionObjects?.Metafields?.WSL_AFTER_BTN_COLOR,
      after_text_clr:
        window?.flitsThemeAppExtensionObjects?.Metafields
          ?.WSL_AFTER_BTN_TEXT_COLOR,
      after_border_clr:
        window?.flitsThemeAppExtensionObjects?.Metafields
          ?.WSL_AFTER_BTN_BORDER_COLOR,
      collection_before_heart_clr:
        window?.flitsThemeAppExtensionObjects?.Metafields
          ?.WSL_DEFAULT_BEFORE_HEART_COLOR,
      collection_after_heart_clr:
        window?.flitsThemeAppExtensionObjects?.Metafields
          ?.WSL_DEFAULT_AFTER_HEART_COLOR,
      ALERT_SUCCESS: "rgb(57, 167, 6)",
      ALERT_DEFAULT: "rgb(0, 0, 0)",
      cardBoxShadow:
        "0 2px 5px 0 rgba(0, 0, 0, .16),0 2px 10px 0 rgba(0, 0, 0, .12)",
      ...colorData,
    };
    const styleElement = document.createElement("style");

    let cssRules = ":root {\n";

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = data[key];
        cssRules += `  --${key}: ${value};\n`;
      }
      const hoverKey = `--${key.replace("BG", "HoverBG")}`;
      if (key.includes("BG"))
        document.documentElement.style.setProperty(
          hoverKey,
          Utility.lightOrDark(data[key])
        );
    }

    cssRules += "}\n\n";

    styleElement.textContent = cssRules;
    document.head.appendChild(styleElement);
  };

  const SetLanguageData = useCallback(
    async (url) => {
      const response = await API.multilangauge.get(url);
      dispatch(setLanguageData(response));
    },
    [dispatch]
  );

  const fetchMicroFrontEndData = useCallback(async () => {
    let frontEndData = await API.microfrontend.get();
    if (!frontEndData || !frontEndData.status) {
      window?.flitsMainContentDiv?.classList?.add("flits-old-account");
      window?.flitsMainContentDiv?.classList?.remove("flits-loading");
      return;
    }

    MainAction();

    if (frontEndData?.data?.accountSettings?.template === 1) {
      const Component = {
        ...(await import(
          "@getflits/storefront-shared-component-uno/src/components/index.jsx"
        ).then((module) => module)),
        ...(await import(
          "@getflits/storefront-shared-component-uno/src/components/ChangePasswordComponent/index"
        )),
        ...(await import(
          "@getflits/storefront-shared-component-uno/src/components/CreditComponent/index"
        )),
        ...(await import(
          "@getflits/storefront-shared-component-uno/src/components/DeliveryAddressComponent/index"
        )),
        ...(await import(
          "@getflits/storefront-shared-component-uno/src/components/Form/index"
        )),
        ...(await import(
          "@getflits/storefront-shared-component-uno/src/components/General/index"
        )),
        ...(await import(
          "@getflits/storefront-shared-component-uno/src/components/HowToManageCreditComponent/index"
        )),
        ...(await import(
          "@getflits/storefront-shared-component-uno/src/components/MyOrderComponent/index"
        )),
        ...(await import(
          "@getflits/storefront-shared-component-uno/src/components/MyProfileComponent/index"
        )),
        ...(await import(
          "@getflits/storefront-shared-component-uno/src/components/RecentViewProductComponent/index"
        )),
        ...(await import(
          "@getflits/storefront-shared-component-uno/src/components/TopOrderProductComponent/index"
        )),
        ...(await import(
          "@getflits/storefront-shared-component-uno/src/components/WishlistPageComponent/index"
        )),
        ...(await import(
          "@getflits/storefront-shared-component-uno/src/components/ReferFriendComponent/index"
        )),
        ...(await import(
          "@getflits/storefront-shared-component-uno/src/components/Navigation/index.js"
        )),
      };
      window.UnoDuoComponent = (name) => {
        return Component[name];
      };
    }

    if (frontEndData?.data?.accountSettings?.template === 2) {
      const Component = {
        ...(await import(
          "@getflits/storefront-shared-component-duo/src/components/index.jsx"
        ).then((module) => module)),
        ...(await import(
          "@getflits/storefront-shared-component-duo/src/components/ChangePasswordComponent/index"
        )),
        ...(await import(
          "@getflits/storefront-shared-component-duo/src/components/CreditComponent/index"
        )),
        ...(await import(
          "@getflits/storefront-shared-component-duo/src/components/DeliveryAddressComponent/index"
        )),
        ...(await import(
          "@getflits/storefront-shared-component-duo/src/components/Form/index"
        )),
        ...(await import(
          "@getflits/storefront-shared-component-duo/src/components/General/index"
        )),
        ...(await import(
          "@getflits/storefront-shared-component-duo/src/components/HowToManageCreditComponent/index"
        )),
        ...(await import(
          "@getflits/storefront-shared-component-duo/src/components/MyOrderComponent/index"
        )),
        ...(await import(
          "@getflits/storefront-shared-component-duo/src/components/MyProfileComponent/index"
        )),
        ...(await import(
          "@getflits/storefront-shared-component-duo/src/components/RecentViewProductComponent/index"
        )),
        ...(await import(
          "@getflits/storefront-shared-component-duo/src/components/TopOrderProductComponent/index"
        )),
        ...(await import(
          "@getflits/storefront-shared-component-duo/src/components/WishlistPageComponent/index"
        )),
        ...(await import(
          "@getflits/storefront-shared-component-duo/src/components/ReferFriendComponent/index"
        )),
        ...(await import(
          "@getflits/storefront-shared-component-duo/src/components/Navigation/index.js"
        )),
      };
      window.UnoDuoComponent = (name) => {
        return Component[name];
      };
    }
    frontEndData = frontEndData.data;
    SetColorSetting(frontEndData.accountSettings.colorSettings);
    dispatch(setMicroFrontEndData(frontEndData));
  }, [dispatch]);

  useEffect(() => {
    if (!microFrontEndData) {
      fetchMicroFrontEndData();
    }
    if (microFrontEndData && !languageData) {
      SetLanguageData(microFrontEndData.multilanguage);
    }
  }, [
    fetchMicroFrontEndData,
    SetLanguageData,
    languageData,
    microFrontEndData,
  ]);

  useEffect(() => {
    if (window?.flitsThemeAppExtensionObjects?.CountryListUrl) {
      fetch(window?.flitsThemeAppExtensionObjects?.CountryListUrl)
        .then((module) => module.json())
        .then((data) => {
          window.country_list = data?.country_list;
        });
    }
    if (window?.flitsThemeAppExtensionObjects?.UnoDuoIconsUrl) {
      fetch(
        window?.flitsThemeAppExtensionObjects?.UnoDuoIconsUrl
      )
        .then((module) => module.json())
        .then((data) => {
          window.UnoIcon = data?.UnoIcon;
          window.DuoIcon = data?.DuoIcon;
        });
    }
    if(window?.flitsThemeAppExtensionObjects?.ManageCreditRuleIcons){
      fetch(window?.flitsThemeAppExtensionObjects?.ManageCreditRuleIcons)
        .then((module) => module.json())
        .then((data) => {
          window.ImageArray = data?.ImageArray;
          window.HowToManageCreditIcon = data?.HowToManageCreditIcon;
        })
    }
  }, []);

  useEffect(() => {
    const styleTagString =
      window?.flitsThemeAppExtensionObjects?.Metafields
        ?.FLITS_EXTENSION_ONSITE_CONTENT_CSS;

    if(styleTagString) {
      const tempDiv = document.createElement("div");
      tempDiv.setAttribute("id", "flits_customized_css_string")
      tempDiv.innerHTML = styleTagString;
      document.head.appendChild(tempDiv);
    }
  }, []);

  useEffect(() => {
    const lastVisitedUrl = SetLastVisitedUrl();
    dispatch(setRedirectURLAfterLogin(lastVisitedUrl));
    if (window?.flitsThemeAppExtensionObjects?.customer?.customer_id !== -1) {
      Utility.setCookie("flits-referral-code", "", -1);
    }
    SetLocalStorage("lastLoadedSpentRules", {});
    SetLocalStorage("lastLoadedCart", "");
  }, [dispatch]);

  useEffect(() => {
    if(!window?.commonEndpoint) {
      window?.flitsThemeAppExtensionObjects?.addCommonEndpoint()
    }
  }, [])

  useEffect(() => {
    SetupCartEvents();
  }, []);

  useEffect(() => {
    const setCartData = async () => {
      const cartData = await GetShopifyCartData();
      dispatch(setShopifyCartData(cartData));
    };
    const debouncedSetcartData = Utility.debounce(async () => {
      const cartData = await GetShopifyCartData();
      dispatch(setShopifyCartData(cartData));
    }, 2500);
    Utility.subscribeEvent(
      EVENTS.AJAX_CART_PRODUCT_ADDED,
      debouncedSetcartData
    );
    Utility.subscribeEvent(EVENTS.AJAX_CART_CART_UPDATED, debouncedSetcartData);
    Utility.subscribeEvent(EVENTS.AJAX_CART_CART_CLEARED, debouncedSetcartData);
    Utility.subscribeEvent(
      EVENTS.AJAX_CART_CART_RENDERED,
      debouncedSetcartData
    );
    setCartData();
    return () => {
      Utility.unsubscribeEvent(
        EVENTS.AJAX_CART_PRODUCT_ADDED,
        debouncedSetcartData
      );
      Utility.unsubscribeEvent(
        EVENTS.AJAX_CART_CART_UPDATED,
        debouncedSetcartData
      );
      Utility.unsubscribeEvent(
        EVENTS.AJAX_CART_CART_CLEARED,
        debouncedSetcartData
      );
      Utility.unsubscribeEvent(
        EVENTS.AJAX_CART_CART_RENDERED,
        debouncedSetcartData
      );
    };
  }, [dispatch]);

  useEffect(() => {
    SetCustomFieldValueAjax();
  });
  if (!microFrontEndData) {
    return null;
  }

  if (!languageData) {
    return null;
  }

  return (
    <Suspense fallback={<></>}>
      {props.children}
      <Analytics />
      <NotificationJWT />
      <NotificationCode />
    </Suspense>
  );
};

export default SettingUpData;
