import { SHOPIFYGET, SHOPIFYPOST } from "../Services/ShopifyServices";
export const Shopify = {
  getProductData: async function (handle, t, dispatch, setDeletedProduct) {
    const response = await SHOPIFYGET(
      `/products/${handle}`,
      {},
      {},
      false
    );
    const body = await response.text();
    var tempDiv = document.createElement("div");
    tempDiv.innerHTML = body;

    const variantDataElements = tempDiv.querySelectorAll(
      ".flits-product-variant-data"
    );
    const productDataElement = tempDiv.querySelector("#flits-product-data");
    if(!productDataElement) {
      dispatch(setDeletedProduct({ handle: handle }))
      return;
    }
    const product = JSON.parse(productDataElement.textContent.trim());
    let productdata = {
      ...product,
    };
    const jsonDataArray = [];

    variantDataElements.forEach((element) => {
      try {
        const jsonData = JSON.parse(element.textContent.trim());
        jsonDataArray.push({
          ...jsonData,
          available:
            jsonData.variant_available,
            originalTitle: jsonData?.title,
          title:
          jsonData.variant_available
              ? jsonData.title
              : `${jsonData.title} - ${t("flits.buttons.sold_out","Sold Out")}`,
          value:
          jsonData.variant_available
              ? jsonData.value
              : `${jsonData.title} - ${t("flits.buttons.sold_out","Sold Out")}`,
        });
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    });
    productdata.variants = jsonDataArray;
    return productdata;
  },
  addToCart: async function (payload) {
    try {
      const endpoint = `/cart/add.js`;
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };
      const param = {};
      const formData = new URLSearchParams();
      for (const [key, value] of Object.entries(payload)) {
        formData.append(key, value);
      }
      const response = await SHOPIFYPOST(endpoint, formData, param, headers);
      return await response.json();
    } catch (error) {
      console.log("productpage-microfrontend", error);
    }
  },
  getCart: async function () {
    try {
      const endpoint = `/cart.json`;
      const headers = {};
      const param = {
        app: "flits",
      };
      const isCustom = false;

      const response = await SHOPIFYGET(endpoint, param, headers, isCustom);
      const cart = await response.json();
      return cart;
    } catch (error) {
      console.log("productpage-microfrontend", error);
    }
  },
};
