import { GlobalStore } from "redux-micro-frontend";

export const SocialLoginButtonClick = (buttonName, {referalRegisterPage}) => {
    const getStore = GlobalStore.Get();
    const Utility = getStore._globalActions.Helpers[0].Utility;

    // const urlParam = new URLSearchParams(window.location.search);

    let url = `/apps/{APP_PROXY}/api/{APP_ID}/{SHOP_ID}/{BUTTON_NAME}/auth/login`;
    url = url.replace("{APP_PROXY}",window?.flitsThemeAppExtensionObjects?.Metafields?.APP_PROXY)
    .replace("{APP_ID}",window?.flitsThemeAppExtensionObjects?.Metafields?.APP_ID)
    .replace("{SHOP_ID}",window?.flitsThemeAppExtensionObjects?.Metafields?.SHOP_ID)
    .replace("{BUTTON_NAME}",buttonName);

    let params = {
        token: window?.flitsThemeAppExtensionObjects?.Metafields?.SHOP_TOKEN
    };
    if(referalRegisterPage.referralCode){
        params.flits_refer_code = referalRegisterPage.referralCode;
    }
    const uuid4 = Utility.setRequestId();
    params.request_id = uuid4;
    url = url + "?"+encodeURI(new URLSearchParams(params).toString())
    window.location.href = url;
}