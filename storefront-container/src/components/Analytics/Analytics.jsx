const { React, lazy } =await import('react').then((module) => ({React: module.default, lazy: module.lazy}))
const AnalyticApiCallTracking = lazy(() => import('./AnalyticApiCallTracking'))
const AnalyticDataPush = lazy(() => import('./AnalyticDataPush'))

const Analytics = () => {
  return (
    <>
        <AnalyticApiCallTracking />
        <AnalyticDataPush />
    </>
  )
}
export default Analytics;