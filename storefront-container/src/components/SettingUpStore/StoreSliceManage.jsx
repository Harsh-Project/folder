const StoreFrontChangePasswordReduxSlice = await import(
  "StoreFrontContainerReduxSlice/StoreFrontChangePasswordReduxSlice"
).then((module) => module.default);
const StoreFrontCreditReduxSlice = await import(
  "StoreFrontContainerReduxSlice/StoreFrontCreditReduxSlice"
).then((module) => module.default);
const StoreFrontDeliveryAddressReduxSlice = await import(
  "StoreFrontContainerReduxSlice/StoreFrontDeliveryAddressReduxSlice"
).then((module) => module.default);
const StoreFrontHowToManageCreditReduxSlice = await import(
  "StoreFrontContainerReduxSlice/StoreFrontHowToManageCreditReduxSlice"
).then((module) => module.default);
const StoreFrontMyProfileReduxSlice = await import(
  "StoreFrontContainerReduxSlice/StoreFrontMyProfileReduxSlice"
).then((module) => module.default);
const StoreFrontOrderReduxSlice = await import(
  "StoreFrontContainerReduxSlice/StoreFrontOrderReduxSlice"
).then((module) => module.default);
const StoreFrontRecentlyViewedProductsReduxSlice = await import(
  "StoreFrontContainerReduxSlice/StoreFrontRecentlyViewedProductsReduxSlice"
).then((module) => module.default);
const StoreFrontReferFriendReduxSlice = await import(
  "StoreFrontContainerReduxSlice/StoreFrontReferFriendReduxSlice"
).then((module) => module.default);
const StoreFrontShopifyDataReduxSlice = await import(
  "StoreFrontContainerReduxSlice/StoreFrontShopifyDataReduxSlice"
).then((module) => module.default);
const StoreFrontTopOrderProductReduxSlice = await import(
  "StoreFrontContainerReduxSlice/StoreFrontTopOrderProductReduxSlice"
).then((module) => module.default);
const StoreFrontWishListReduxSlice = await import(
  "StoreFrontContainerReduxSlice/StoreFrontWishListReduxSlice"
).then((module) => module.default);

export const Slice = {
  storeFrontChangePassword: StoreFrontChangePasswordReduxSlice,
  storeFrontMyProfile: StoreFrontMyProfileReduxSlice,
  storeFrontTopOrderedProducts: StoreFrontTopOrderProductReduxSlice,
  storeFrontReferFriend: StoreFrontReferFriendReduxSlice,
  storeFrontHowToManageCredit: StoreFrontHowToManageCreditReduxSlice,
  storeFrontWishList: StoreFrontWishListReduxSlice,
  storeFrontDeliveryAddress: StoreFrontDeliveryAddressReduxSlice,
  storeFrontCredit: StoreFrontCreditReduxSlice,
  storeFrontOrder: StoreFrontOrderReduxSlice,
  storeFrontRecentlyViewedProducts: StoreFrontRecentlyViewedProductsReduxSlice,
  StoreFrontShopifyData: StoreFrontShopifyDataReduxSlice,
};

export const NameSlice = {
  storeFrontMyProfile: "storeFrontMyProfile",
  storeFrontTopOrderedProducts: "storeFrontTopOrderProduct",
  storeFrontReferFriend: "storeFrontReferFriend",
  storeFrontHowToManageCredit: "storeFrontHowToManageCredit",
  storeFrontWishList: "storeFrontWishList",
  storeFrontDeliveryAddress: "storeFrontDeliveryAddress",
  storeFrontCredit: "storeFrontCredit",
  storeFrontOrder: "storeFrontOrder",
  storeFrontRecentlyViewedProducts: "storeFrontRecentlyViewedProducts",
  storeFrontChangePassword: "storeFrontChangePassword",
  StoreFrontShopifyData: "StoreFrontShopifyData",
};

export const SlicePage = {
  404: ["storeFrontCredit"],
  article: ["storeFrontCredit"],
  blog: ["storeFrontCredit"],
  captcha: ["storeFrontCredit"],
  cart: ["storeFrontCredit"],
  collection: [
    "StoreFrontShopifyData",
    "storeFrontWishList",
    "storeFrontCredit",
  ],
  "list-collections": ["storeFrontCredit"],
  "customers/account": [
    "storeFrontChangePassword",
    "storeFrontMyProfile",
    "storeFrontTopOrderedProducts",
    "storeFrontReferFriend",
    "storeFrontHowToManageCredit",
    "storeFrontWishList",
    "storeFrontDeliveryAddress",
    "StoreFrontShopifyData",
    "storeFrontCredit",
    "storeFrontOrder",
    "storeFrontRecentlyViewedProducts",
  ],
  "customers/activate_account": ["storeFrontCredit"],
  "customers/addresses": ["storeFrontCredit"],
  "customers/login": ["storeFrontCredit"],
  "customers/order": ["storeFrontCredit"],
  "customers/register": [
    "storeFrontReferFriend",
    "storeFrontCredit",
    "storeFrontMyProfile",
  ],
  "customers/reset_password": ["storeFrontCredit"],
  gift_card: ["storeFrontCredit"],
  index: ["storeFrontCredit"],
  metaobject: ["storeFrontCredit"],
  page: ["storeFrontCredit"],
  password: ["storeFrontCredit"],
  policy: ["storeFrontCredit"],
  product: ["StoreFrontShopifyData", "storeFrontWishList", "storeFrontCredit"],
  search: ["storeFrontCredit"],
};
