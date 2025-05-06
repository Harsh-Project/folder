import { encryptCartData, removeUnusedKeysFromCartData } from "./CartDataUtility";

export const GetShopifyCartdata = (cartData) => {
    let cart = { ...cartData };
    cart = removeUnusedKeysFromCartData(cart);
    cart = encryptCartData(cart);
    return cart;
}