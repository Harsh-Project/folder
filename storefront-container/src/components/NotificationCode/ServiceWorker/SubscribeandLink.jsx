const { LinkUser } = await import("./LinkUser").then((module) => ({LinkUser:module.LinkUser}));
const {
  sendSubscriptionToServer,
  urlBase64ToUint8Array,
} = await import("./NotificationPermission").then((module) => ({sendSubscriptionToServer:module.sendSubscriptionToServer,urlBase64ToUint8Array:module.urlBase64ToUint8Array}));

export const SubscribeandLink = (
  GetLocalStorage,
  SetLocalStorage,
  API,
  token
) => {
  navigator.serviceWorker
    .register(
      `/apps/${window?.flitsThemeAppExtensionObjects?.proxy_name}/api/1/${window?.flitsThemeAppExtensionObjects?.shop_id}/notifications/web_push/service_worker.js?token=${window?.flitsThemeAppExtensionObjects?.shop_token}&theme_id=${window?.flitsThemeAppExtensionObjects?.theme?.id}`
    )
    .then(function (registration) {
      registration.pushManager
        .getSubscription()
        .then(async function (existingSubscription) {
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
                const getDataLocalStorageNotification =
                  GetLocalStorage("Notification");
                const userData = getDataLocalStorageNotification
                  ? getDataLocalStorageNotification[""] ??
                    getDataLocalStorageNotification["-1"]
                  : null;
                if (userData)
                  LinkUser(
                    SetLocalStorage,
                    getDataLocalStorageNotification,
                    API,
                    userData,
                    token
                  );
                // x.innerHTML = JSON.stringify(subscription)
              })
              .catch(function (error) {
              });
        });
    });
};
