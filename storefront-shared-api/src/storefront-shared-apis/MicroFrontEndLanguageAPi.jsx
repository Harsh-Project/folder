import { FLITSGETLOCAL } from "../Services/FlitsServices";
export const language = {
  get: async function (url) {
    try {
      const headers = {};
      const param = {};
      const isCustom = true;

      let languageUsingExtension =
        await window?.flitsThemeAppExtensionObjects?.languageData(url);

      if (languageUsingExtension?.status && languageUsingExtension?.data) {
        return languageUsingExtension?.data;
      }

      const response = await FLITSGETLOCAL(
        languageUsingExtension?.endpoint,
        param,
        headers,
        isCustom
      );
      const languageData = await response.json();
      return languageData;
    } catch (error) {
      console.log("container-microfrontend", error);
    }
  },
};
