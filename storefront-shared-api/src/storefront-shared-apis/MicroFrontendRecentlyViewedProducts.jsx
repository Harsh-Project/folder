import { SHOPIFYGET } from "../Services/ShopifyServices";
export const recentlyviewedproducts = {
  get: async function (endpoint) {
    try {
      const headers = {};
      const param = {};
      const isCustom = true;

      const response = await SHOPIFYGET(endpoint, param, headers, isCustom);
      const data = response.text();
      return data;
    } catch (error) {
      console.log("recentlyviewedproducts data", error);
    }
  },
  get_data: async function () {
    try {
      const data = localStorage.getItem("RecentViewed") && JSON.parse(localStorage.getItem("RecentViewed"))
      const data1 = data;

      const dataWithVariant = [];

      for (let i = 0; i < data1?.length; i++) {
        const response = await this.get(
          `https://${window.location.host}/products/${data1[i]?.product_handle}`
        );

        var tempDiv = document.createElement("div");
        tempDiv.innerHTML = response;

        const variantDataElements = tempDiv.querySelectorAll(
          ".flits-product-variant-data"
        );

        const jsonDataArray = [];

        variantDataElements.forEach((element) => {
          try {
            const jsonData = JSON.parse(element.textContent.trim());
            jsonDataArray.push({
              ...jsonData,
              available:
                jsonData.inventory_policy === "deny" &&
                jsonData.inventory_quantity > 0,
            originalTitle: jsonData?.title,
              title:
                jsonData.inventory_policy === "deny" &&
                jsonData.inventory_quantity > 0
                  ? jsonData.title
                  : `${jsonData.title} - Sold Out`,
              value:
                jsonData.inventory_policy === "deny" &&
                jsonData.inventory_quantity > 0
                  ? jsonData.value
                  : `${jsonData.title} - Sold Out`,
            });
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
        });

        dataWithVariant.push({ ...data1[i], product_variant: jsonDataArray });
      }
      return dataWithVariant;
    } catch (error) {
      console.log("recentlyviewedproducts get data", error);
    }
  },
};
