import { FLITSGET, FLITSGETLOCAL, FLITSPOST } from "../Services/FlitsServices";
export const credit = {
  get: async function () {
    try {
      const endpoint = "/Credit.json";
      const headers = {};
      const param = {};
      const isCustom = false;

      const response = await FLITSGETLOCAL(endpoint, param, headers, isCustom);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("credit-get", error);
    }
  },
  get_data: async function () {
    try {
      const endpoint = `/${window.flitsThemeAppExtensionObjects.customer.customer_id}/credit/get_credit`;
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };
      const param = {
        token: window?.flitsThemeAppExtensionObjects?.customer?.shop_token,
        customer_hash:
          window?.flitsThemeAppExtensionObjects?.customer?.customer_hash,
      };
      const isCustom = false;

      const response = await FLITSGET(endpoint, param, headers, isCustom);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("data for credit", error);
    }
  },
  get_available_rules: async function (formDataValue) {
    try {
      const endpoint = `/${window?.flitsThemeAppExtensionObjects?.customer?.customer_id}/get_credit`;
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };
      const param = {};

      const response = await FLITSPOST(endpoint, formDataValue, param, headers);
      const creditResp = await response.json();
      return creditResp;
    } catch (error) {
      console.log("get_available_rules", error);
    }
  },
  apply_credit: async function (formValue) {
    try {
      const endpoint = `/${window?.flitsThemeAppExtensionObjects?.customer?.customer_id}/credit/apply_credit`;
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };
      const param = {};

      const response = await FLITSPOST(endpoint, formValue, param, headers);
      return await response.json();
    } catch (error) {
      console.log("apply_credit", error);
    }
  },
  delete_discounts: async function (formValue) {
    try {
      const endpoint = `/${window?.flitsThemeAppExtensionObjects?.customer?.customer_id}/delete-discounts`;
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };
      const param = {};

      const response = await FLITSPOST(endpoint, formValue, param, headers);
      return response;
    } catch (error) {
      console.log("delete_discounts", error);
    }
  },
  refund_credit: async function (page, per_page) {
    try {
      const endpoint = `/${window.flitsThemeAppExtensionObjects.customer.customer_id}/refund_credit/get_credit`;
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };
      const param = {
        token: window?.flitsThemeAppExtensionObjects?.customer?.shop_token,
        customer_hash:
          window?.flitsThemeAppExtensionObjects?.customer?.customer_hash,
        page: page,
        per_page: per_page,
      };
      const isCustom = false;

      const response = await FLITSGET(endpoint, param, headers, isCustom);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("data for credit", error);
    }
  },
};
