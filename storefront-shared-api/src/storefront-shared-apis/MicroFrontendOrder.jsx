import { findOrderDetailsFromHTML } from "../Extractor/findOrderDetailFromHTML";
import { SHOPIFYGET, SHOPIFYPOST } from "../Services/ShopifyServices";
export const order = {
  get_data: async function (pageNumber) {
    try {
      const endpoint = `/account`;
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };
      const param = {
        page: pageNumber,
        type: "order"
      };
      const isCustom = false;

      const response = await SHOPIFYGET(endpoint, param, headers, isCustom);
      const data = await response.text();

      const extractor = findOrderDetailsFromHTML(data);
      return extractor;
    } catch (error) {
      console.log("order data", error);
    }
  },
  reorder: async function (data) {
    try {
      const endpoint = `/cart/add.js`;
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };
      const param = {};

      const formData = new URLSearchParams();
      for (const [key, value] of Object.entries(data)) {
        formData.append(key, value);
      }

      const response = await SHOPIFYPOST(endpoint, formData, param, headers);
      return await response.json();
    } catch (error) {
      console.log("reorder data", error);
    }
  },
};
