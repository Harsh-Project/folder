import { FLITSGET,FLITSGETLOCAL,FLITSPOSTFORMDATA } from "../Services/FlitsServices";
export const myprofile = {
  get: async function () {
    try {
      const endpoint = "/MyProfile.json";
      const headers = {};
      const param = {};
      const isCustom = false;

      const response = await FLITSGETLOCAL(endpoint, param, headers, isCustom);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("profile-get", error);
    }
  },

  profile_save: async function (data) {
    try {
      const endpoint = `/${window?.flitsThemeAppExtensionObjects?.customer?.customer_id}/profile_save`;
      const headers = {
      };
      const param = {};

      const response = await FLITSPOSTFORMDATA(endpoint, data, param, headers);
      const profile_save = await response.json();
      return profile_save;
    } catch (error) {
      console.log("profile save", error);
    }
  },

  user_custom_field: async function (params) {
    try {
      const endpoint = (parseInt(
        window?.flitsThemeAppExtensionObjects?.customer?.customer_id
      ) === -1 || window?.flitsThemeAppExtensionObjects?.customer?.customer_id === "")
        ? `/custom-fields/get` : 
        `/${window?.flitsThemeAppExtensionObjects?.customer?.customer_id}/custom-fields/get`;
      const headers = {
        "Content-Type": "application/json",
      };
      const isCustom = false;

      const response = await FLITSGET(endpoint, params, headers, isCustom);
      const user_custom_field_data = await response.json();
      return user_custom_field_data;
    } catch (error) {
      console.log("user_custom_field", error);
    }
  },

  get_url: async function (path) {
    try {
      const endpoint = `/custom-fields/generate-file-url`;
      const headers = {
        "Content-Type": "application/json",
      };
      const param = {
        filePath: path,
        token: window?.flitsThemeAppExtensionObjects?.customer?.shop_token,
      };
      const isCustom = false;

      const response = await FLITSGET(endpoint, param, headers, isCustom);
      const res = await response.json();
      return res?.fileUrl;
    } catch (error) {
      console.log(error);
    }
  },

  get_custom_fields_assets: async function (params) {
    try {
      const endpoint =
        (parseInt(
          window?.flitsThemeAppExtensionObjects?.customer?.customer_id
        ) === -1 || window?.flitsThemeAppExtensionObjects?.customer?.customer_id === "")
          ? `/custom-fields/get-asset`
          : `/${window?.flitsThemeAppExtensionObjects?.customer?.customer_id}/custom-fields/get-asset`;
      const headers = {
        "Content-Type": "application/json",
      };
      const isCustom = false;
      const response = await FLITSGET(endpoint, params, headers, isCustom);
      const responseJson = await response.json();

      return responseJson;
    } catch (error) {
      console.log("get_custom_fields_assets", error);
    }
  },

  get_asset_data: async function (url) {
    const isCustom = true;
    const removeTrackingHeader = true;
    const response = await FLITSGET(url, {}, {}, isCustom, removeTrackingHeader);
    const responseJson = await response.json();
    return responseJson;
  },

  upload_temp_file_custom_field: async function (params) {
    const endpoint = "/custom-fields/upload-file";

    var formData = {...params,
    token: window?.flitsThemeAppExtensionObjects?.Metafields?.SHOP_TOKEN}
    const response = await FLITSPOSTFORMDATA(endpoint, formData);
    const user_custom_field_data = await response.json();
    return user_custom_field_data;
  },

  save_custom_fields_data: async function (params) {
    const endpoint = `/${window?.flitsThemeAppExtensionObjects?.customer?.customer_id}/custom-fields/save`;

    params = {
      ...params,
      token: window?.flitsThemeAppExtensionObjects?.Metafields?.SHOP_TOKEN,
      customer_hash: window?.flitsThemeAppExtensionObjects?.customerHash,
    };
    const response = await FLITSPOSTFORMDATA(endpoint, params);
    const user_custom_field_data = await response.json();
    return user_custom_field_data;
  },
};
