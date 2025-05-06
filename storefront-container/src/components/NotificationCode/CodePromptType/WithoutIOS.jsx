const { useCallback, useEffect, useState } = await import("react").then(
  (module) => ({
    useEffect: module.useEffect,
    useCallback: module.useCallback,
    useState: module.useState,
  })
);
const checkUserSubscribed = await import(
  "components/NotificationCode/ServiceWorker/CheckUserSubscription"
).then((module) => module.checkUserSubscribed);
const requestNotificationPermission = await import(
  "components/NotificationCode/ServiceWorker/NotificationPermission"
).then((module) => module.requestNotificationPermission);
const useSelector = await import("react-redux").then(
  (module) => module.useSelector
);
const LinkUser = await import(
  "components/NotificationCode/ServiceWorker/LinkUser"
).then((module) => module.LinkUser);
const SubscribeandLink = await import(
  "components/NotificationCode/ServiceWorker/SubscribeandLink"
).then((module) => module.SubscribeandLink);
const React = await import("react").then((module) => module.default);
const { SetLocalStorage, GetLocalStorage } = await import(
  "components/UtilityFunction/LocalStorage"
).then((module) => ({
  SetLocalStorage: module.SetLocalStorage,
  GetLocalStorage: module.GetLocalStorage,
}));
const { API } = await import(
  "@getflits/storefront-shared-api/src/storefront-shared-apis/allAPI"
).then((module) => module);
const timeDifference = await import("../ServiceWorker/timeDifference").then(
  (module) => module.timeDifference
);

export const WithoutIOS = ({ browserOnClick }) => {
  const [isNeedToShowOnBrowser, setIsNeedToShowOnBrowser] = useState(false);
  const notificationJWTToken = useSelector(
    (state) => state.storeFrontContainer.notificationJWTToken
  );
  const [modal, setModal] = useState(null);
  const [promptDetail, setPromptDetail] = useState(null);
  const NotificationCustomPrompt = window.UnoDuoComponent(
    "NotificationCustomPrompt"
  );
  const closeModal = () => {
    setModal(false);
  };

  const requestNotificationPermissionFuction = useCallback(
    (timeout) => {
      setTimeout(() => {
        requestNotificationPermission(
          API,
          GetLocalStorage,
          SetLocalStorage,
          notificationJWTToken
        );
      }, [timeout ?? 0]);
    },
    [notificationJWTToken]
  );

  const subscribe = () => {
    closeModal();
    if (promptDetail?.prompt_type !== "custom")
      requestNotificationPermissionFuction(
        1000 *
          (window.matchMedia("(max-width: 767px)")?.matches
            ? promptDetail?.timing_gap_mobile ?? 0
            : promptDetail?.timing_gap_desktop ?? 0)
      );
    else requestNotificationPermissionFuction(0);
  };

  useEffect(() => {
    if (notificationJWTToken) {
      checkUserSubscribed(GetLocalStorage)
        .then((isSubscribed) => {
          if (
            !isSubscribed &&
            "Notification" in window &&
            Notification.permission !== "granted" &&
            Notification.permission !== "denied"
          ) {
            function showPrompt(responseData) {
              if (responseData?.is_push_enabled) {
                if (
                  responseData?.prompt_type === "default" &&
                  !isNeedToShowOnBrowser
                ) {
                  if (!promptDetail) {
                    setPromptDetail(responseData);
                  }
                  const showDefaultPrompt = () => {
                    const FlitsCodeLoadedTime =
                      GetLocalStorage("FlitsCodeLoadTime");
                    const getInterval =
                      1000 *
                        (window.matchMedia("(max-width: 767px)")?.matches
                          ? responseData?.timing_gap_mobile ?? 0
                          : responseData?.timing_gap_desktop ?? 0) -
                      1000 * timeDifference(FlitsCodeLoadedTime);
                    if (!GetLocalStorage("FlitsFirstClick")) {
                      requestNotificationPermissionFuction(
                        getInterval < 0 ? 0 : getInterval
                      );
                      SetLocalStorage("FlitsFirstClick", new Date().getTime());
                    }
                    setIsNeedToShowOnBrowser(true);
                  };
                  if (browserOnClick) {
                    window.addEventListener(
                      "FirstClickedOnBrowser",
                      !isNeedToShowOnBrowser ? showDefaultPrompt : null
                    );
                  } else {
                    showDefaultPrompt();
                  }
                }
                if (responseData?.prompt_type === "custom") {
                  if (!promptDetail) {
                    setPromptDetail(responseData);
                  }
                  setTimeout(() => {
                    setModal(true);
                    SetLocalStorage("NotificationPrompt", new Date().getTime());
                  }, [
                    1000 *
                      (window.matchMedia("(max-width: 767px)")?.matches
                        ? responseData?.timing_gap_mobile ?? 0
                        : responseData?.timing_gap_desktop ?? 0),
                  ]);
                }
              }
            }

            if (promptDetail) {
              showPrompt(promptDetail);
            } else if (
              window?.flitsThemeAppExtensionObjects?.Metafields
                ?.IS_PUSH_NOTIFICATION_ENABLE &&
              window?.flitsThemeAppExtensionObjects?.Metafields
                ?.is_store_credit_enable &&
              window?.flitsThemeAppExtensionObjects?.Metafields
                ?.IS_STORE_CREDIT_PAID
            ) {
              API.notification
                .promptData(notificationJWTToken)
                .then((responseData) => {
                  showPrompt(responseData);
                })
                .catch((error) => {});
            }
          } else {
            if (
              window?.flitsThemeAppExtensionObjects?.customer?.customer_id !==
                "" &&
              window?.flitsThemeAppExtensionObjects?.customer?.customer_id !==
                "-1"
            ) {
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
                  notificationJWTToken
                );
            }

            if (
              !isSubscribed &&
              "Notification" in window &&
              Notification.permission === "granted"
            ) {
              SubscribeandLink(
                GetLocalStorage,
                SetLocalStorage,
                API,
                notificationJWTToken
              );
            }
          }
        })
        .catch((error) => {});
    }
  }, [
    notificationJWTToken,
    browserOnClick,
    isNeedToShowOnBrowser,
    requestNotificationPermissionFuction,
    promptDetail,
  ]);

  if (!promptDetail) {
    return null;
  }

  if (promptDetail?.prompt_type === "ios_prompt") {
    return null;
  }

  return (
    modal && (
      <NotificationCustomPrompt
        openModal={modal}
        closeModal={closeModal}
        data={promptDetail}
        handleSubscribe={subscribe}
      />
    )
  );
};
