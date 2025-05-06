const API = await import("@getflits/storefront-shared-api/src/storefront-shared-apis/allAPI").then((module) => module.API);
export const GetShopifyCartData = async () => {

    let cartData = await API.Shopify.getCart();
    return cartData;
}