const { API } = await import("@getflits/storefront-shared-api/src/storefront-shared-apis/allAPI").then((module) => module);
const { GetLocalStorage, RemoveLocalStorage, SetLocalStorage } = await import("./LocalStorage").then((module) => module);
const LOCAL_STORAGE_KEY = 'custom_fields_data';

export const SetCustomFieldValueAjax = () => {
    if(window?.flitsThemeAppExtensionObjects?.request?.page_type === "customers/register"){
        return;
    }
    let customFieldsData = GetLocalStorage(LOCAL_STORAGE_KEY);
    if(typeof customFieldsData === 'undefined' || customFieldsData === null){
        return;
    }
    let visitedPathHistory = customFieldsData['visited_path_history'];
    if(typeof visitedPathHistory === 'undefined' || !visitedPathHistory.includes('/account/register')){
        return;
    }
    if(window?.flitsThemeAppExtensionObjects?.request?.page_type === "captcha"){
        visitedPathHistory.push(window.location.pathname);
        customFieldsData['visited_path_history'] = visitedPathHistory;
        SetLocalStorage(LOCAL_STORAGE_KEY, customFieldsData);
        return true;
    }
    if(window?.flitsThemeAppExtensionObjects?.customer?.customer_id === -1 || window?.flitsThemeAppExtensionObjects?.customer?.customer_id === "-1"){
        return;
    }
    RemoveLocalStorage(LOCAL_STORAGE_KEY);
    API.myprofile.save_custom_fields_data({
        ...customFieldsData,
        from_page: 'register'
    }).then((resp) => {

    }).catch((error) => {
        console.error(error);
    });
    console.log("SetCustomFieldValueAjax");
    return;
}