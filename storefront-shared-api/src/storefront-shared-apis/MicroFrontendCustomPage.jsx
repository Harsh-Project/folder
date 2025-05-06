import DOMPurify from "dompurify";
import { SHOPIFYGET } from "../Services/ShopifyServices";
export const custompage = {
  get: async function (url, template) {
    try {
      const endpoint = url;
      const headers = {};
      const param = {};
      const isCustom = true;

      const response = await SHOPIFYGET(endpoint, param, headers, isCustom);
      if (!template || template?.length === 0) {
        const dataPage = await response.json();
        const sanitizedData = DOMPurify.sanitize(dataPage?.page?.body_html, {
          ADD_TAGS: ["iframe", "script"],
        });
        return sanitizedData;
      } else {
        const dataPage = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(dataPage, "text/html");

        const specificElement = doc.getElementById("MainContent");

        if (specificElement) {
          return specificElement.innerHTML;
        }
        return "";
      }
    } catch (error) {
      console.log("container-microfrontend", error);
    }
  },
};
