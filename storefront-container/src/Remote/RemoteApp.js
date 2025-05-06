const { React, Suspense, useEffect } = await import("react").then((module) => ({
  Suspense: module.Suspense,
  React: module.default,
  useEffect: module.useEffect,
}));
const useFederatedComponent = await import("mf-cra").then(
  (module) => module.default
);
const { useSelector } = await import("react-redux").then((module) => ({ useSelector: module.useSelector}));
const { InitialLoader } = await import("./InitialLoader").then(
  (module) => module
);
const { NameSlice, Slice } = await import(
  "components/SettingUpStore/StoreSliceManage"
).then((module) => module);
const StoreFrontContainer = await import(
  "StoreFrontContainer/StoreFrontContainer"
).then((module) => module.default);
const { CheckRequireField } = await import(
  "components/UtilityFunction/CheckRequireField"
).then((module) => module);

export function RemoteApp(props) {
  let microfrontendApp = props?.app
    ? JSON.parse(JSON.stringify(props.app))
    : null;
  if (microfrontendApp?.remoteUrl === "defaultURL") {
    microfrontendApp.remoteUrl =
      window.flitsThemeAppExtensionObjects.flitsGetStoreMicrofrontendUrl(
        microfrontendApp?.remoteName
      );
  }
  const { Component: RemoteComponent } =
    useFederatedComponent(microfrontendApp);

  const Skeleton = window.UnoDuoComponent[microfrontendApp?.skeletonToLoad];

  

  useEffect(() => {
    if (Slice[microfrontendApp?.remoteName]) {
      StoreFrontContainer.reducerManager.add(
        NameSlice[microfrontendApp?.remoteName],
        Slice[microfrontendApp?.remoteName]
      );
      StoreFrontContainer.reducerManager.add(
        NameSlice["StoreFrontShopifyData"],
        Slice["StoreFrontShopifyData"]
      );
    }
  });

  if (!CheckRequireField(microfrontendApp?.requiredArray ?? microfrontendApp?.required ?? [])) {
    return null;
  }

  return (
    <Suspense
      fallback={
        microfrontendApp?.skeletonToLoad !== "Loading" &&
        microfrontendApp?.skeletonToLoad !== "LoadingWithOutShadow" &&
        Skeleton !== null &&
        Skeleton !== undefined ? (
          <Skeleton />
        ) : (
          <div></div>
        )
      }
    >
      {RemoteComponent && <RemoteComponent {...props} />}
    </Suspense>
  );
}

export default function RemoteAppHandler(props) {
  const microFrontEndData = useSelector(
    (state) => state.storeFrontContainer.microFrontEndData
  );
  const routesApp = microFrontEndData.microfront_remotes.remotes;
  const appToLoad = routesApp[props.remoteApp];
  if (!appToLoad) return <div>App not found</div>;

  return (
    <>
      {(appToLoad?.skeletonToLoad === "Loading" ||
        appToLoad?.skeletonToLoad === "LoadingWithOutShadow") &&
        appToLoad?.skeletonToLoad !== undefined &&
        appToLoad?.skeletonToLoad !== null &&
        props?.remoteApp !== "storeFrontNavigation" && (
          <InitialLoader loader={appToLoad?.skeletonToLoad} />
        )}
      <RemoteApp app={appToLoad} {...props} />
    </>
  );
}
