const { Utility } = await import("./UtilityFunction").then((module) => module);
const { GetLocalStorage, SetLocalStorage } = await import("./LocalStorage").then((module) => module);
const doNotStoreLastURLof = [
    "customers/login",
    "customers/register",
    "customers/account",
    "captcha"
];
export const SetLastVisitedUrl = () => {
    let return_url = Utility.getURLParameter("return_url");
    let checkout_url = Utility.getURLParameter("checkout_url");
    let pageType = window?.flitsThemeAppExtensionObjects?.request?.page_type;
    if(doNotStoreLastURLof.indexOf(pageType) === -1){
        SetLocalStorage("flits_before_login_url",window.location.pathname);
    }
    if(return_url){
        SetLocalStorage("flits_before_login_url", return_url);
    }
    if(checkout_url){
        SetLocalStorage("flits_before_login_url", checkout_url);
    }
    return GetLocalStorage("flits_before_login_url");
}