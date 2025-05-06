import { FLITSGETLOCAL } from "../Services/FlitsServices";
export const cartpage = {
  get: async function () {
    try {
      const endpoint = "/storeFrontCartPageRemoteData.json";
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
