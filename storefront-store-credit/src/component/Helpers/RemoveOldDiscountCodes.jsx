import { GlobalStore } from "redux-micro-frontend";

export const RemoveOldDiscountCodes = () => {
    const getStore = GlobalStore.Get();
    const API = getStore._globalActions.API[0].API;
    API.credit.delete_discounts({
        customer_hash: window?.flitsThemeAppExtensionObjects?.customer?.customer_hash,
        token: window?.flitsThemeAppExtensionObjects?.customer?.shop_token,
    });
}