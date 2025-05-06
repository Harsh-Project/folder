const { useEffect, useCallback } = await import("react").then((module) => ({
  useEffect: module.useEffect,
  useCallback: module.useCallback,
}));
const { GetLocalStorage, SetLocalStorage } = await import(
  "components/UtilityFunction/LocalStorage"
).then((module) => ({
  GetLocalStorage: module.GetLocalStorage,
  SetLocalStorage: module.SetLocalStorage,
}));
const API = await import("@getflits/storefront-shared-api/src/storefront-shared-apis/allAPI").then(
  (module) => module.API
);

const AnalyticDataPush = () => {
  const analyticDataUpdate = useCallback(async () => {
    let analyticData = GetLocalStorage("analyticCartAndContactData");
    const customerId = window?.flitsThemeAppExtensionObjects?.customer?.customer_id;
    if (analyticData && Array.isArray(analyticData) && customerId !== undefined && customerId !== null && customerId !== -1 && customerId !== "-1") {
      for (let i = 0; i < analyticData?.length; i++) {
        if (analyticData[i]?.status === "pending") {
          analyticData[i]["status"] = "processing";
          SetLocalStorage("analyticCartAndContactData", analyticData);
          let data = analyticData[i]?.data;
          const apiCall = await API.analytic.analytic_push_data(
            data,
            GetLocalStorage("analyticToken")
          );
          if (apiCall?.status) {
            analyticData?.splice(i, 1);
            SetLocalStorage("analyticCartAndContactData", analyticData);
          }
        }
      }
    }
  }, []);

  const CheckStatus = useCallback(() => {
    let analyticData = GetLocalStorage("analyticCartAndContactData");
    if (analyticData && Array.isArray(analyticData)) {
      for (let i = 0; i < analyticData?.length; i++) {
        if (analyticData[i]?.status === "processing") {
          analyticData[i]["status"] = "pending";
        }
      }
    }
    SetLocalStorage("analyticCartAndContactData", analyticData);
  }, []);

  useEffect(() => {
    const analyticDataInterval = setInterval(() => {
      analyticDataUpdate();
    }, 5000);

    const statusCheckInterval = setInterval(() => {
      CheckStatus();
    }, 5000);

    return () => {
      clearInterval(analyticDataInterval);
      clearInterval(statusCheckInterval);
    };
  }, [CheckStatus, analyticDataUpdate]);

  useEffect(() => {
    analyticDataUpdate();
    CheckStatus();
  }, [CheckStatus, analyticDataUpdate]);

  return null;
};

export default AnalyticDataPush;
