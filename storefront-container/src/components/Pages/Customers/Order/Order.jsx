const { React, Suspense, lazy } = await import("react").then((module) => ({
    lazy: module.lazy,
    Suspense: module.Suspense,
    React: module.default,
  }))
const PageType = lazy(() => import('../../../UtilityFunction/PageType'));

export const Order = (props) => {
    return <Suspense fallback={<div>loading</div>}><PageType pageType={props.pageType} /></Suspense>;
}