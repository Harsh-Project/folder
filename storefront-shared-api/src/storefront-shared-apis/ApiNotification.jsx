import {
  FLITS_GET_NOTIFICATION,
  FLITS_POST_NOTIFICATION,
} from "../Services/Notificationservice";

const proxyNameMap = {
  FlitsDev1: "dev.",
  FlitsDev2: "dev.",
  FlitsDev3: "dev.",
  FlistDev4: "dev.",
  FlitsTesting: "testing.",
  flits: "",
};

export const ApiNotification = {
  getJwttoken: async function (data) {
    try {
      const proxyName = window?.flitsThemeAppExtensionObjects?.proxy_name;
      const endpoint = `https://${proxyNameMap[proxyName]}analytics.getflits.com/`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: window?.flitsThemeAppExtensionObjects.shop_token,
      };
      const isCustom = true;

      const response = await FLITS_POST_NOTIFICATION(
        endpoint,
        JSON.stringify(data),
        {},
        headers,
        isCustom
      );
      const token = await response.json();
      return token?.result?.token;
    } catch (error) {
      console.log("jwt", error);
    }
  },
  promptData: async function (token) {
    try {
      const proxyName = window?.flitsThemeAppExtensionObjects?.proxy_name;
      const endpoint = `https://${proxyNameMap[proxyName]}notifications.getflits.com/notification_prompts`;
      const headers = {
        Authorization: token,
      };
      const isCustom = true;

      const response = await FLITS_GET_NOTIFICATION(
        endpoint,
        {},
        headers,
        isCustom
      );
      const promptModalDetail = await response.json();
      return promptModalDetail?.data[0];
    } catch (error) {
      console.log("jwt", error);
    }
  },
  linkUser: async function (data, token) {
    try {
      const proxyName = window?.flitsThemeAppExtensionObjects?.proxy_name;
      const endpoint = `https://${proxyNameMap[proxyName]}analytics.getflits.com/`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: token,
      };
      const isCustom = true;

      const response = await FLITS_POST_NOTIFICATION(
        endpoint,
        JSON.stringify(data),
        {},
        headers,
        isCustom
      );
      const linkUser = await response.json();
      return linkUser;
    } catch (error) {
      console.log("link user", error);
    }
  },
  subscribeInfo: async function (data, token) {
    try {
      const proxyName = window?.flitsThemeAppExtensionObjects?.proxy_name;
      const endpoint = `https://${proxyNameMap[proxyName]}notifications.getflits.com/notification_users`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: token,
      };
      const isCustom = true;

      const response = await FLITS_POST_NOTIFICATION(
        endpoint,
        JSON.stringify(data),
        {},
        headers,
        isCustom
      );
      const subscribe = await response.json();
      return subscribe?.data;
    } catch (error) {
      console.log("jwt", error);
    }
  },
};
