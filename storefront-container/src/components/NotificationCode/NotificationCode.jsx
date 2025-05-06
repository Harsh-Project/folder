const WithoutIOS = await import("./CodePromptType/WithoutIOS").then((module) => module.WithoutIOS);
const IOSPrompt = await import("./CodePromptType/IOSPrompt").then((module) => module.IOSPrompt);
const GlobalStore = await import("redux-micro-frontend").then((module) => module.GlobalStore);
const useEffect = await import("react").then((module) => module.useEffect);
const RemoveLocalStorage = await import("components/UtilityFunction/LocalStorage").then((module) => module.RemoveLocalStorage);
const React = await import("react").then((module) => module.default);
const browserName = await import("react-device-detect").then((module) => module.browserName);

export const NotificationCode = () => {
  const browserListForOnClick = ["Firefox", "Safari"];
  const browserOnClick = browserListForOnClick.includes(browserName);
  const getStore = GlobalStore.Get();
  const IsIOSDevice = getStore._globalActions.Helpers[0].IsIOSDevice;
  useEffect(() => {
    if (
      "Notification" in window &&
      (Notification.permission === "default" ||
        Notification.permission === "denied")
    ) {
      RemoveLocalStorage("Notification");
    }
    RemoveLocalStorage("FlitsFirstClick")
  }, []);

  useEffect(() => {
    const isManifestLink = document.querySelectorAll("[rel='manifest']")[0];
    if (isManifestLink?.attributes?.href?.value?.length > 0) {
      return;
    }
    if (isManifestLink && !isManifestLink?.attributes?.href?.value) {
      isManifestLink.setAttribute(
        "href",
        `https://cdn.shopify.com/s/files/1/0030/7491/6461/files/flits_global_manifest.json?v=1728469353`
      );
      return;
    }
    const firstHeadElement = document.head.firstChild;
    let manifestLink = document.createElement("link");
    manifestLink.setAttribute("rel", "manifest");
    manifestLink.setAttribute(
      "href",
      `https://cdn.shopify.com/s/files/1/0030/7491/6461/files/flits_global_manifest.json?v=1728469353`
    );
    document.head.insertBefore(manifestLink, firstHeadElement);
  }, []);

  return IsIOSDevice ? (
    <IOSPrompt browserOnClick={browserOnClick} />
  ) : (
    <WithoutIOS browserOnClick={browserOnClick} />
  );
};
