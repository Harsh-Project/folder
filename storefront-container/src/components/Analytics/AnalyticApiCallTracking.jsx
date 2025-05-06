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

const AnalyticApiCallTracking = () => {
  const isTimeFinishedOrNot = useCallback(() => {
    var lastAnalyticsCallGet = GetLocalStorage("analyticApiCallTime");
    let lastAnalyticsCallTimestamp = new Date(lastAnalyticsCallGet);
    let lastAnalyticsCallTime =
      (Date.now() / 1000 - lastAnalyticsCallTimestamp / 1000) / 60;
    if (lastAnalyticsCallTime >= 14 - 0.5 || isNaN(lastAnalyticsCallTime)) {
      return true;
    }

    return false;
  }, []);

  const makeApiCallIfNeeded = useCallback(async () => {
    const customerId = window?.flitsThemeAppExtensionObjects?.customer?.customer_id;

    if(customerId === undefined || customerId === null || customerId === -1 || customerId === "-1"){
      return;
    }
    const data = {
      action: "get_analytics_token",
      customer_id: window?.flitsThemeAppExtensionObjects?.customer?.customer_id,
      user_id: window?.flitsThemeAppExtensionObjects?.Metafields?.SHOP_ID,
      app_name: window?.flitsThemeAppExtensionObjects?.Metafields?.APP_PROXY,
      token: window?.flitsThemeAppExtensionObjects?.customer?.shop_token,
      customer_hash:
        window?.flitsThemeAppExtensionObjects?.customer?.customer_hash,
    };

    const analyticCall = await API.analytic.get_token(data);

    if (analyticCall?.status) {
      SetLocalStorage("analyticToken", analyticCall?.result?.token);
      SetLocalStorage("analyticApiCallTime", new Date());
    }
  }, []);

  useEffect(() => {
    let intervalForAnalyticToken;

    if (!GetLocalStorage("analyticToken")) {
      makeApiCallIfNeeded();
    }

    if (GetLocalStorage("analyticToken") && isTimeFinishedOrNot()) {
      makeApiCallIfNeeded();
    }

    intervalForAnalyticToken = setInterval(() => {
      if (isTimeFinishedOrNot()) {
        makeApiCallIfNeeded();
      }
    }, 60000);

    return () => {
      clearInterval(intervalForAnalyticToken);
    };
  }, [makeApiCallIfNeeded, isTimeFinishedOrNot]);

  return null;
};

export default AnalyticApiCallTracking;
