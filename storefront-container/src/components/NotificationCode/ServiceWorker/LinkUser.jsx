export async function LinkUser(
  SetLocalStorage,
  getDataLocalStorageNotification,
  API,
  userData,
  notificationJWTToken
) {
  let shopID = window?.flitsThemeAppExtensionObjects?.shop_id;
  const takePrefixName = window?.flitsThemeAppExtensionObjects?.proxy_name;
  const prefixMap = {
    FlitsDev1: "dev1_app_",
    FlitsDev2: "dev2_app_",
    FlitsDev3: "dev3_app_",
    FlitsDev4: "dev4_app_",
    FlitsTesting: "testing_app_",
    flits: "shopify_app_",
  };
  let bodyData = {
    action: "update_notification_customer_data",
    merchant_id: `${prefixMap[takePrefixName]}${shopID}`,
    flits_user_id: userData?.userId,
    customer_id: window?.flitsThemeAppExtensionObjects?.customer?.customer_id,
    token: window?.flitsThemeAppExtensionObjects?.shop_token,
    customer_hash:
      window?.flitsThemeAppExtensionObjects?.customer?.customer_hash,
  };

  let retryCount = 0;
  let maxRetries = 10;
  let retryDelay = 1000;

  function retryFunction(delay) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

  async function apiCall(bodyData, notificationJWTToken) {
    return API.notification.linkUser(bodyData, notificationJWTToken);
  }

  apiCall(bodyData, notificationJWTToken)
    .then((data) => {
      if (data?.result?.data === "user updated") {
        let localUpdate = {
          ...getDataLocalStorageNotification,
          [window?.flitsThemeAppExtensionObjects?.customer?.customer_id]: {
            ...userData,
            customerId:
              window?.flitsThemeAppExtensionObjects?.customer?.customer_id,
          },
        };
        delete localUpdate[""];
        delete localUpdate["-1"];
        SetLocalStorage("Notification", localUpdate);
        return data;
      } else {
        if (retryCount < maxRetries) {
          retryCount++;
          retryDelay *= 2;
          return retryFunction(retryDelay).then(() =>
            apiCall(bodyData, notificationJWTToken)
          );
        } else {
          throw new Error("Max retries exceeded");
        }
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
