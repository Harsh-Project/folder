const { React, Suspense, lazy } = await import("react").then((module) => ({
  React: module.default,
  lazy: module.lazy,
  Suspense: module.Suspense,
}));
const PageType = lazy(() => import("../../UtilityFunction/PageType"));

export const FourZeroFour = (props) => {
  return (
    <Suspense fallback={<div>loading</div>}>
      <PageType pageType={props.pageType} />
    </Suspense>
  );
};
