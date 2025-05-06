const { React, Suspense, lazy } = await import("react").then((module) => ({
  Suspense: module.Suspense,
  lazy: module.lazy,
  React: module.default,
}));
const PageType = lazy(() => import("../../UtilityFunction/PageType"));

export const Cart = (props) => {
  return (
    <Suspense fallback={<div>loading</div>}>
      <PageType pageType={props.pageType} />
    </Suspense>
  );
};
