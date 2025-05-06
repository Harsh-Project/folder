import { GlobalStore } from "redux-micro-frontend";

const removeAttributesFromCart = [
  "sku",
  "featured_image",
  "product_description",
  "title",
  "url",
  "handle",
  "product_type",
  "product_title",
  "discounts",
  "variant_options",
  "options_with_values",
  "variant_title",
  "vendor",
  "image"
];

export const encryptCartData = (cartData) => {
    return btoa(unescape(encodeURIComponent(JSON.stringify(cartData))))
}

export const removeUnusedKeysFromCartData = (cartData) => {
  const getStore = GlobalStore.Get();
  const Utility = getStore._globalActions.Helpers[0].Utility;
    let cart = { ...cartData };
    cart.cart_token = cart.token;
    delete cart.token;
    let items = [];
    for (var i = 0; i < cart.items.length; i++) {
      let item = { ...cart.items[i] };
      for (var j = 0; j < removeAttributesFromCart.length; j++) {
        if (!Utility.isNull(item[removeAttributesFromCart[j]])) {
          delete item[removeAttributesFromCart[j]];
        }
      }
      items.push(item);
    }
    cart.items = items;
    return cart;
}