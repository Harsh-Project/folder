import { GetShopifyCartdata } from "./GetShopifyCartData";
import { GlobalStore } from "redux-micro-frontend";

export const GetAvailableSpentRules = async (cartData) => {
  try {
    if(cartData.total_price <= 0){
      return;
    }
    const getStore = GlobalStore.Get();
    const API = getStore._globalActions.API[0].API;
    const SetLocalStorage = getStore._globalActions.Helpers[0].SetLocalStorage;
    const GetLocalStorage = getStore._globalActions.Helpers[0].GetLocalStorage;

    const encryptedCartData = GetShopifyCartdata(cartData);
    let lastLoadedCart = GetLocalStorage("lastLoadedCart");
    if(lastLoadedCart === encryptedCartData){
      return GetLocalStorage('lastLoadedSpentRules');
    }
    SetLocalStorage("lastLoadedCart", encryptedCartData);
    const formValue = {
      customer_hash: window?.flitsThemeAppExtensionObjects?.customerHash,
      token: window?.flitsThemeAppExtensionObjects?.shop_token,
      cart: encryptedCartData,
    };
    const spentRules = await API.credit.get_available_rules(formValue);
    SetLocalStorage("lastLoadedSpentRules", spentRules);
    return spentRules;
  } catch (ex) {
    console.error("Unable to get the Spent Rules ", ex);
  }
}