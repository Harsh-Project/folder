import { FLITSGET, FLITSGETLOCAL } from "../Services/FlitsServices";
export const referfriend = {
  get: async function () {
    try {
      const endpoint = "/Credit.json";
      const headers = {};
      const param = {};
      const isCustom = false

      const response = await FLITSGETLOCAL(endpoint, param, headers, isCustom);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("refer friend data", error);
    }
  },
  get_data: async function () {
    try {
      const endpoint = `/${window.flitsThemeAppExtensionObjects.customer.customer_id}/refer_friend/get_referral_data`;
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };
      const param = {
        token: window?.flitsThemeAppExtensionObjects?.customer?.shop_token,
        customer_hash: window?.flitsThemeAppExtensionObjects?.customer?.customer_hash
      };
      const isCustom = false

      const response = await FLITSGET(endpoint, param, headers, isCustom)
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("referfriend get data", error);
    }
  }
};
