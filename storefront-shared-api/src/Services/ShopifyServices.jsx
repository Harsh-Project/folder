import {
  DELETE,
  GET,
  POST,
  PUT,
  getShopifyURL,
  makeQueryString,
} from "./Services";

export async function SHOPIFYGET(endpoint, param = {}, headers = {}, isCustom) {
  let url;

  if (isCustom) {
    url = endpoint;
  } else {
    url = Object.keys(param).length
      ? `${getShopifyURL(endpoint)}?${makeQueryString(param)}`
      : getShopifyURL(endpoint);
  }
  return GET(url, headers);
}

export async function SHOPIFYPOST(
  endpoint,
  formData = {},
  param = {},
  headers = {},
  isCustom
) {
  let url;

  if (isCustom) {
    url = endpoint;
  } else {
    url = Object.keys(param).length
      ? `${getShopifyURL(endpoint)}?${makeQueryString(param)}`
      : getShopifyURL(endpoint);
  }

  return POST(url, headers, formData);
}

export async function SHOPIFYPUT(
  endpoint,
  formData = {},
  param = {},
  headers = {},
  isCustom
) {
  let url;

  if (isCustom) {
    url = endpoint;
  } else {
    url = Object.keys(param).length
      ? `${getShopifyURL(endpoint)}?${makeQueryString(param)}`
      : getShopifyURL(endpoint);
  }

  return PUT(url, headers, formData);
}

export async function SHOPIFYDELETE(
  endpoint,
  formData = {},
  param = {},
  headers = {},
  isCustom
) {
  let url;

  if (isCustom) {
    url = endpoint;
  } else {
    url = Object.keys(param).length
      ? `${getShopifyURL(endpoint)}?${makeQueryString(param)}`
      : getShopifyURL(endpoint);
  }

  return DELETE(url, headers, formData);
}
