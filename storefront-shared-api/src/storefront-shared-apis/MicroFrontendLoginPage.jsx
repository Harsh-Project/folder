import { FLITSGETLOCAL } from "../Services/FlitsServices";
export const loginPage = {
  get: async function () {
    try {
      const endpoint = "/storeFrontLoginPageRemoteData.json";
      const headers = {};
      const param = {};
      const isCustom = false;

      const response = await FLITSGETLOCAL(endpoint, param, headers, isCustom);
      const productPageRemote = await response.json();
      return productPageRemote;
    } catch (error) {
      console.log("productpage-microfrontend", error);
    }
  },
};
