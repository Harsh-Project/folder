import { FLITSGETLOCAL, FLITSPOST } from "../Services/FlitsServices";
export const howtomanagecredit = {
  get: async function () {
    try {
      const endpoint = "/HowToManageCredit.json";
      const headers = {};
      const param = {};
      const isCustom = false;

      const response = await FLITSGETLOCAL(endpoint, param, headers, isCustom);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("how to manage get", error);
    }
  },
  general_subscription_save: async function (data) {
    try {
      const endpoint = `/${window?.flitsThemeAppExtensionObjects?.customer?.customer_id}/general_subscription_save`;
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded"
      };
      const param = {};

      const response = await FLITSPOST(endpoint, data, param, headers);
      const rule = await response.json();
      return rule;
    } catch (error) {
      console.log("general_subscription_save", error);
    }
  },
  getRuleData: async function (data) {
    try {
      const endpoint = `/${window?.flitsThemeAppExtensionObjects?.customer?.customer_id}/get_rule`;
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded"
      };
      const param = {};

      const response = await FLITSPOST(endpoint, data, param, headers);
      const rule = await response.json();
      return rule;
    } catch (error) {
      console.log("getRuleData", error);
    }
  },
};
