export let apiCallTrackingHeader = {
  "x-integration-app-name": encodeURIComponent(
    `flits_storefront_${window?.flitsRewardPageObjects?.shop_id}`
  ),
};
