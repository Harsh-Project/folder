const check = (data) => {
  for (const [key, value] of Object.entries(data)) {
    if (key === window?.flitsThemeAppExtensionObjects?.customer?.customer_id && value?.shopDomain === window?.location?.host)
      return true;
  }

  if((data["-1"] || data[""]) && window?.flitsThemeAppExtensionObjects?.customer?.customer_id !== "" && window?.flitsThemeAppExtensionObjects?.customer?.customer_id !== "-1") {
    return true
  }

  return false;
};

export const checkUserSubscribed = (GetLocalStorage) => {
  return new Promise((resolve, reject) => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      navigator.serviceWorker
        .getRegistration(
          `/apps/${window?.flitsThemeAppExtensionObjects?.proxy_name}/api/1/${window?.flitsThemeAppExtensionObjects?.shop_id}/notifications/web_push/service_worker.js?token=${window?.flitsThemeAppExtensionObjects?.shop_token}&theme_id=${window?.flitsThemeAppExtensionObjects?.theme?.id}`
        )
        .then(function (registration) {
          registration.pushManager
            .getSubscription()
            .then(function (subscription) {
              const data = GetLocalStorage("Notification") ?? {};
              if (check(data) && subscription) {
                resolve(true);
              } else {
                resolve(false);
              }
            })
            .catch(function (error) {
              reject(error);
            });
        })
        .catch(function (error) {
          reject(error);
        });
    } else {
      resolve(false);
    }
  });
};
