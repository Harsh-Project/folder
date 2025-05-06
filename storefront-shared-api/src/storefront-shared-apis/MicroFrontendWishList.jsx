import { FLITSDELETE, FLITSGET, FLITSPOST } from "../Services/FlitsServices";
export const wishlist = {
  get: async function (endpoint) {
    try {
      const headers = {};
      const param = {};
      const isCustom = true;

      const response = await FLITSGET(endpoint, param, headers, isCustom);
      const data = response.text();
      return data;
    } catch (error) {
      console.log("container-microfrontend", error);
    }
  },
  get_data: async function () {
    try {
      const endpoint = `/wishlist`;
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };
      const param = {
        customer_hash: window.flitsThemeAppExtensionObjects.customerHash,
        customer_id: window.flitsThemeAppExtensionObjects.customer.customer_id,
        token: window.flitsThemeAppExtensionObjects.shop_token,
      };
      const isCustom = false;

      const response = await FLITSGET(endpoint, param, headers, isCustom);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("wishlist data", error);
      return null;
    }
  },
  add_to_wishlist: async function (data) {
    try {
      const endpoint = `/wishlist/add_to_wishlist`;
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded"
      };
      const param = {};
      

      const response = await FLITSPOST(endpoint, data, param, headers)
      const addToWishList = await response.json();
      return addToWishList;
    } catch (error) {
      console.log("add_to_wishlist", error);
    }
  },
  remove_from_wishlist: async function (data) {
    try {
      const endpoint = `/wishlist/remove_from_wishlist`;
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded"
      };
      const param = {};
      


      const response = await FLITSDELETE(endpoint, data, param, headers)
      const removeFromWishList = await response.json();
      return removeFromWishList;
    } catch (error) {
      console.log("remove_from_wishlist", error);
    }
  }
};
