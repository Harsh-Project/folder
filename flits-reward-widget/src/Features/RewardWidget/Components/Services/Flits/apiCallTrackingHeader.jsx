export let apiCallTrackingHeader = {
  "x-integration-app-name": encodeURIComponent(
    `flits_storefront_${window?.flitsThemeAppExtensionObjects?.shop_id}`
  ),
};
