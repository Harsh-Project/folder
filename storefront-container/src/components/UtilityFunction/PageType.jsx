const { Suspense, React } = await import("react").then((module) => ({
  Suspense: module.Suspense,
  React: module.default,
}));
const useSelector = await import("react-redux").then(
  (module) => module.useSelector
);
const RemoteAppHandler = await import("Remote/RemoteApp").then(
  (module) => module.default
);
const PageType = (props) => {
  const microFrontEndData = useSelector(
    (state) => state.storeFrontContainer.microFrontEndData
  );
  const templatetoLoad =
    microFrontEndData.microfront_remotes.pages_template[props.pageType];
  return (
    <>
      <Suspense fallback={""}>
        {templatetoLoad.map((item, index) => {
          if (item.renderType === "local") {
            const Component = item.component;
            return <Component key={index} />;
          }
          return <RemoteAppHandler key={index} remoteApp={item.component} />;
        })}
      </Suspense>
    </>
  );
};

export default PageType;
