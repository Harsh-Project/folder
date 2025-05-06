import { useEffect, useState } from "react";
import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useSelector } from "react-redux";
import { LoaderElement } from "./LoaderElement/LoaderElement";
import { InsertBeforePortal } from "./Helpers/InsertBeforePortal";
import { AppendCustomField } from "./Helpers/AppendCustomField";

const LOCAL_STORAGE_KEY = 'custom_fields_data';

 const RegisterPageCustomFields = () => {
    const [isNeedToCallAPI, setIsNeedToCallAPI] = useState(true);
    const [isLoadingDisplay, setIsLoadingDisplay] = useState(false);
    const [customFieldAssetUrl, setCustomFieldAssetUrl] = useState(false);
    const [customFieldAssetData, setCustomFieldAssetData] = useState(null);
    const [customFields, setCustomFields] = useState(null);
    const getStore = GlobalStore.Get();
    const  API = getStore._globalActions.API[0].API;
    const  SetLocalStorage = getStore._globalActions.Helpers[0].SetLocalStorage;
    const  GetLocalStorage = getStore._globalActions.Helpers[0].GetLocalStorage;
    const microFrontEndData = useSelector((state) => state.storeFrontContainer.microFrontEndData);

    useEffect(() => {
        if(!isNeedToCallAPI){
            return;
        }
        setIsNeedToCallAPI(false);
        API.myprofile.get_custom_fields_assets({
            from_page: "register",
            theme_store_id: window.Shopify.theme.theme_store_id,
            account_page_template: microFrontEndData.accountSettings.template
        }).then((assetData) => {
            if(!assetData.status){
                return;
            }
            setCustomFieldAssetUrl(assetData);
            API.myprofile.get_asset_data(assetData.asset_for_theme_app_extension).then((data)=> {
                setCustomFieldAssetData(data);
                let div = window.document.createElement('div');
                div.innerHTML = data.customFieldsTemplate.cssStyle.trim();
                window.document.head.appendChild(div.firstChild);
                setIsLoadingDisplay(true);
                API.myprofile.user_custom_field({
                    currentPage:"register"
                }).then((fields) => {
                    setIsLoadingDisplay(false);
                    if(!fields.status){
                        setCustomFields([]);
                        return;
                    }
                    setCustomFields(fields.userCustomFields);
                });
            });
        });
    },[isNeedToCallAPI, customFieldAssetUrl, API.myprofile, microFrontEndData.accountSettings]);

    useEffect(() => {
        const handleClickEvent = (event) => {
            let custom_fields_data = {};
            if (GetLocalStorage(LOCAL_STORAGE_KEY) == null || GetLocalStorage(LOCAL_STORAGE_KEY) === undefined) {
                SetLocalStorage(LOCAL_STORAGE_KEY, {});
                custom_fields_data = GetLocalStorage(LOCAL_STORAGE_KEY);
            } else {
                custom_fields_data = GetLocalStorage(LOCAL_STORAGE_KEY);
            }
            custom_fields_data['visited_path_history'] = [window.location.pathname];
            let userCustomFields = customFields;
            userCustomFields.forEach((customField, customFieldIndex) => {
                let fieldValue = '';
                let parentDiv = window.document.querySelectorAll('[data-field-unique-id="' + customField.unique_id + '"]')[0];
                let fieldType = parentDiv?.getAttribute('data-field-type');
                let selector, selectorName;
                switch (fieldType) {
                    case 'file':
                        selector = parentDiv.querySelector('.customer-custom-field-value-input');
                        selectorName = selector?.getAttribute('name');
                        fieldValue = selector?.getAttribute('data-value');
                        if(selectorName)
                        custom_fields_data[selectorName] = fieldValue;
                        break;
                    case 'date':
                    case 'time':
                        parentDiv?.querySelectorAll('.customer-custom-field-value-input').forEach((inputItem, inputItemIndex) => {
                            selector = inputItem;
                            selectorName = inputItem?.getAttribute('name');
                            fieldValue = (selector?.value != null) ? selector?.value : '';
                            if(selectorName)
                            custom_fields_data[selectorName] = fieldValue;
                        });
                        break;
                    default:
                        selector = parentDiv?.querySelector('.customer-custom-field-value-input');
                        selectorName = selector?.getAttribute('name');
                        fieldValue = selector?.value;
                        if(selectorName)
                        custom_fields_data[selectorName] = fieldValue;
                        break;
                }
            });
            SetLocalStorage(LOCAL_STORAGE_KEY, custom_fields_data);
        }
        if(customFieldAssetData?.customFieldsTemplate?.buttonElement){
            let submitButton = window.document.querySelector(customFieldAssetData?.customFieldsTemplate?.buttonElement);
            submitButton.addEventListener("click", handleClickEvent);
        }
        return () => {
            if(customFieldAssetData?.customFieldsTemplate?.buttonElement){
                let submitButton = window.document.querySelector(customFieldAssetData?.customFieldsTemplate?.buttonElement);
                submitButton.removeEventListener("click", handleClickEvent);
            }
        }
    });
    if(isNeedToCallAPI){
        return null;
    }
    if(isLoadingDisplay){
        return <InsertBeforePortal insertBefore={customFieldAssetData.customFieldsTemplate.buttonElement}>
            <LoaderElement />
        </InsertBeforePortal>;
    }
    return (<>
        {customFields && customFields.map((customField, index) => {
            return <AppendCustomField
            customField={customField}
            htmlStructure={customFieldAssetData?.customFieldsTemplate?.htmlStructure?.[customField.type]?.fieldHTML}
            submitButton={customFieldAssetData.customFieldsTemplate.buttonElement}
            insertBefore={customFieldAssetData.customFieldsTemplate.buttonElement}
            index={index}
            key={index}/>
        })}
    </>);
}

export default RegisterPageCustomFields;