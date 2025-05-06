import { FLITSPOST } from "../Services/FlitsServices";
import { SHOPIFYPOST } from "../Services/ShopifyServices";
export const sociallogin = {
  account_login: async function (data) {
    try {
      const endpoint = `/account/login`;
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };
      const param = {};

      const formData = new URLSearchParams();
      for (const [key, value] of Object.entries(data)) {
        formData.append(key, value);
      }

      const response = await SHOPIFYPOST(endpoint, formData, param, headers);
      console.log("social", response, response.json());
      return response;
    } catch (error) {
      console.log("sociallogin", error);
    }
  },
  reset_password: async function (formValues) {
    try {
      const endpoint = `/${formValues.customer_id}/reset-password/secure`;
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded"
      };
      const param = {};

      const response = await FLITSPOST(endpoint, formValues, param, headers);
      return await response.json();
    } catch (error) {
      console.log("reset_password", error);
    }
  },
};
