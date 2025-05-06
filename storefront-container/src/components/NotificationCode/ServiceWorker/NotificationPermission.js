const LinkUser = await import("./LinkUser").then((module) => module.LinkUser);

export function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
const checkLocalStorageAndId = (localData) => {
  const isId =
    window?.flitsThemeAppExtensionObjects?.customer?.customer_id !== "-1" &&
    window?.flitsThemeAppExtensionObjects?.customer?.customer_id !== "";
  if ((!isId && Object.keys(localData).length <= 0) || (isId && (Object.keys(localData).length <= 0 || !localData[window?.flitsThemeAppExtensionObjects?.customer?.customer_id]))) {
    return true;
  }
  return false;
};
export async function sendSubscriptionToServer(
  subscription,
  GetLocalStorage,
  SetLocalStorage,
  API,
  token
) {
  if (!checkLocalStorageAndId(GetLocalStorage("Notification") ?? {})) {
    return;
  }
  let body = {
    event: "notification_registration",
    permission: "granted",
    subscription_info: subscription,
  };

  if (
    window?.flitsThemeAppExtensionObjects?.customer?.customer_id !== "-1" &&
    window?.flitsThemeAppExtensionObjects?.customer?.customer_id !== ""
  ) {
    body["customer_id"] =
      window?.flitsThemeAppExtensionObjects?.customer?.customer_id;
  }
  const data = await API.notification.subscribeInfo(body, token);
  let local = GetLocalStorage("Notification") ?? {};
  if(data) {
    local = {
      ...local,
      [window?.flitsThemeAppExtensionObjects?.customer?.customer_id]: {
        userId: data,
        shopDomain: window?.location?.host,
        subscription: subscription,
        customerId: window?.flitsThemeAppExtensionObjects?.customer?.customer_id,
      },
    };
    SetLocalStorage("Notification", local);
  }

  if (
    window?.flitsThemeAppExtensionObjects?.customer?.customer_id !== "-1" &&
    window?.flitsThemeAppExtensionObjects?.customer?.customer_id !== ""
  ) {
    LinkUser(
      SetLocalStorage,
      local,
      API,
      local[window?.flitsThemeAppExtensionObjects?.customer?.customer_id],
      token
    );
  }
}

export const requestNotificationPermission = async (
  API,
  GetLocalStorage,
  SetLocalStorage,
  token
) => {
  try {
    SetLocalStorage("NotificationPrompt", new Date().getTime())
    Notification.requestPermission().then(async function (permission) {
      if (permission !== "granted") {
        return;
      }
      if(window?.navigator?.standalone){
        SetLocalStorage("isCustomPromptAlreadyAllowd", "true")
      }
      navigator.serviceWorker
        .register(
          `/apps/${window?.flitsThemeAppExtensionObjects?.proxy_name}/api/1/${window?.flitsThemeAppExtensionObjects?.shop_id}/notifications/web_push/service_worker.js?token=${window?.flitsThemeAppExtensionObjects?.shop_token}&theme_id=${window?.flitsThemeAppExtensionObjects?.theme?.id}`
        )
        .then(function (registration) {
          registration.pushManager
            .getSubscription()
            .then(async function (existingSubscription) {
              if (existingSubscription) {
                sendSubscriptionToServer(
                  existingSubscription,
                  GetLocalStorage,
                  SetLocalStorage,
                  API,
                  token
                );
              } else {
                registration.pushManager
                  .subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(
                      "BMrMbGJXWgHltXsPCtghebExtKhu1FsjJ5DFORr_yWqw6dyx7Aseno0DO_2atslR4rBbLiKo7qqzCvVuyj9qO6Q"
                    ),
                  })
                  .then(async function (subscription) {
                    sendSubscriptionToServer(
                      subscription,
                      GetLocalStorage,
                      SetLocalStorage,
                      API,
                      token
                    );
                    // x.innerHTML = JSON.stringify(subscription)
                  })
                  .catch(function (error) {
                  });
              }
            });
        });
    });
  } catch (error) {
  }
};
