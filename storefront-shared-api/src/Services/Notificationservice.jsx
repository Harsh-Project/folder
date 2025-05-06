import {
    POST,
    makeQueryString,
    getFlitsURL,
    GET,
  } from "./Services";
  
  const initialParam = {
    customer_hash: window?.flitsThemeAppExtensionObjects?.customer?.customer_hash,
    token: window?.flitsThemeAppExtensionObjects?.customer?.shop_token,
  };
  
  export async function FLITS_POST_NOTIFICATION(
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
  export async function FLITS_GET_NOTIFICATION(
    endpoint,
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
  
    return GET(url, headers);
  }