import BASE_URL from "../constants";

const SHOPIFY_START_POINT = `https://${window?.location?.host}`;

let apiCallTrackingHeader = {
  "x-integration-app-name": encodeURIComponent(`flits_storefront_${window?.flitsThemeAppExtensionObjects?.shop_id}`),
};

export function makeQueryString(params) {
  const queryString = Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");

  return queryString;
}

export async function GET(url, headers, removeTrackingHeader) {
  return await fetch(url, {
    headers: removeTrackingHeader ? headers : { ...headers, ...apiCallTrackingHeader },
  });
}

export async function POST(url, headers, formData) {
  return await fetch(url, {
    method: "POST",
    headers: { ...headers, ...apiCallTrackingHeader },
    body: formData,
  });
}

export async function PUT(url, headers, formData) {
  return await fetch(url, {
    method: "PUT",
    headers: { ...headers, ...apiCallTrackingHeader },
    body: formData,
  });
}

export async function DELETE(url, headers, formData) {
  return await fetch(url, {
    method: "DELETE",
    headers: { ...headers, ...apiCallTrackingHeader },
    body: formData,
  });
}

export function getURL(endpoint) {
  return BASE_URL + endpoint;
}

export function getShopifyURL(endpoint) {
  return SHOPIFY_START_POINT + endpoint;
}

export function getFlitsURL(endpoint) {
  let BASE_URL_SHOPIFY =
    "https://{SHOP_NAME}" + window?.flitsThemeAppExtensionObjects?.base_url;
  BASE_URL_SHOPIFY = BASE_URL_SHOPIFY.replace(
    "{SHOP_NAME}",
    window?.flitsThemeAppExtensionObjects?.request?.host
  )
    .replace(
      "{APP_PROXY}",
      window?.flitsThemeAppExtensionObjects?.Metafields?.APP_PROXY
    )
    .replace(
      "{APP_ID}",
      window?.flitsThemeAppExtensionObjects?.Metafields?.APP_ID
    )
    .replace(
      "{SHOP_ID}",
      window?.flitsThemeAppExtensionObjects?.Metafields?.SHOP_ID
    );
  return BASE_URL_SHOPIFY + endpoint;
}
