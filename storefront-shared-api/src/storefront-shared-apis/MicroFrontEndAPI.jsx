import { FLITSGET, FLITSGETLOCAL } from "../Services/FlitsServices";

export const container = {
  get: async function () {
    try {
      const mode = process.env.REACT_APP_MODE;
      const endpoint =
        mode === "local"
          ? "/microFrontEndData.json"
          : `/theme/${window?.Shopify?.theme?.id}`;
      const headers = {};
      const languageFromDocument = document
        .getElementsByTagName("html")[0]
        .getAttribute("lang");
      const themeSetting =
        window.flitsThemeAppExtensionObjects?.Metafields?.[`FINAL_SETTINGS`]?.themeSettingMetafield ??
        window.flitsThemeAppExtensionObjects?.Metafields[
          `CUSTOM_THEME_SETTINGS_${window?.flitsThemeAppExtensionObjects?.theme?.id}`
        ] ??
        window?.flitsThemeAppExtensionObjects?.Metafields?.[
          `THEME_SETTINGS_1`
        ] ??
        window.flitsThemeAppExtensionObjects?.Metafields[
          `THEME_SETTINGS_${window?.flitsThemeAppExtensionObjects?.theme?.id}`
        ];

      if (themeSetting) {
        return themeSetting;
      }

      const param = {
        lang: languageFromDocument?.split("-")[0],
        APP_SETTINGS_UPDATED:
          window?.flitsThemeAppExtensionObjects?.Metafields
            ?.APP_SETTINGS_UPDATED,
      };
      const isCustom = false;

      const response =
        mode === "local"
          ? await FLITSGETLOCAL(endpoint, param, headers, isCustom)
          : await FLITSGET(endpoint, param, headers, isCustom);
      const frontEndData = await response.json();
      return frontEndData;
    } catch (error) {
      console.log("container-microfrontend", error);
    }
  },
};
