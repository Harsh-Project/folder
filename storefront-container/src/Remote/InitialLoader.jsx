const React = await import("react").then((module) => module.default);

export const InitialLoader = ({ loader }) => {
  const Loading = window.UnoDuoComponent("Loading");
  const LoadingWithOutShadow = window.UnoDuoComponent("LoadingWithOutShadow");
  return (
    <div className="flits_initial_loader">
      {loader === "Loading" ? <Loading /> : <LoadingWithOutShadow />}
    </div>
  );
};
