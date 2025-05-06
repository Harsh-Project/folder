import {
    POST,
    makeQueryString,
    getFlitsURL,
  } from "./Services";
  
  const initialParam = {
    customer_hash: window?.flitsThemeAppExtensionObjects?.customer?.customer_hash,
    token: window?.flitsThemeAppExtensionObjects?.customer?.shop_token,
  };
  
  export const getBaseURLAnalytic = () => {

    const proxyNameMap = {
      FlitsDev1: "dev.",
      FlitsDev2: "dev.",
      FlitsDev3: "dev.",
      FlistDev4: "dev.",
      FlitsTesting: "testing.",
      flits: "",
    };
    const proxyName = window?.flitsThemeAppExtensionObjects?.proxy_name;
    return `https://${proxyNameMap[proxyName]}analytics.getflits.com`;
  }
  
  export async function FLITS_POST_ANALYTIC(
    endpoint,
    formData = {},
    param = {},
    headers = {},
    isCustom
  ) {
    let url;
  
    let updateParam = {
      ...param,
      ...initialParam,
    };
  
    if (isCustom) {
      url = endpoint;
    } else {
      url = Object.keys(updateParam).length
        ? `${getFlitsURL(endpoint)}?${makeQueryString(updateParam)}`
        : getFlitsURL(endpoint);
    }
  
    return POST(url, headers, formData);
  }