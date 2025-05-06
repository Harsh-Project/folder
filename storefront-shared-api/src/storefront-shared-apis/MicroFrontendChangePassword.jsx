import { FLITSGETLOCAL, FLITSPOST } from "../Services/FlitsServices";
export const changepassword = {
  get: async function () {
    try {
      const endpoint = "/ChangePassword.json";
      const headers = {};
      const param = {};
      const isCustom = false;

      const response = await FLITSGETLOCAL(endpoint, param, headers, isCustom);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("container-microfrontend", error);
    }
  },
  update_password: async function (data) {
    try {
      const endpoint = `/${window?.flitsThemeAppExtensionObjects?.customer?.customer_id}/update_password`;
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };
      const param = {};

      const response = await FLITSPOST(endpoint, data, param, headers);
      const update_password = await response.json();
      return update_password;
    } catch (error) {
      console.log("update_password", error);
    }
  },
};
