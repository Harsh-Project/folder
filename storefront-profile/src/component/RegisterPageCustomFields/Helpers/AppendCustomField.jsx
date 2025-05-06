import { Default } from "./FieldsType/Default";
import { FileField } from "./FieldsType/FileField/FileField";
import { Time } from "./FieldsType/Time";
import { DateField } from "./FieldsType/DateField";
import React from "react";
import { ReturnDOMElement } from "./ReturnDOMElement";
import { InsertBeforePortal } from "./InsertBeforePortal";

export const AppendCustomField = (props) => {
    const customField = props?.customField;
    const htmlStructure = props?.htmlStructure;
    const domElement = ReturnDOMElement(htmlStructure);
    const submitElement = window.document.querySelector(props.submitButton);

    if (window.document.querySelector('.customer-custom-field-row[data-field-unique-id="' + customField.unique_id + '"]')) {
        return null;
    }
    if (!htmlStructure) {
        return null;
    }
    const element = domElement?.querySelector(".customer-custom-field-row-clone");
    element?.classList?.remove("customer-custom-field-row-clone");
    element?.setAttribute('data-field-unique-id', customField?.unique_id);
    element?.setAttribute('data-field-type', customField?.type);
    let inputElements = element?.querySelectorAll("input, textarea, select");
    if(inputElements){
        inputElements.forEach((item, index) => {
            item?.classList?.add('customer-custom-field-value-input');
        });
    }
    if(element?.querySelector(".customer-custom-field-title"))
    element.querySelector(".customer-custom-field-title").innerHTML = customField?.title;
    if (typeof customField?.description !== 'undefined' && customField?.description != null) {
        if(element?.querySelector('.customer-custom-field-description-text'))
        element.querySelector('.customer-custom-field-description-text').innerHTML = customField?.description;
    } else {
        if(element?.querySelector('.customer-custom-field-description'))
        element.querySelector('.customer-custom-field-description').classList.add('flits-hide');
    }
    if (typeof customField?.is_required !== 'undefined' && customField?.is_required) {
        window.document.querySelector("form[action*='/account']")?.removeAttribute('novalidate');
        let tempElements = element?.querySelectorAll('input:not([type="hidden"]),textarea, select');
        tempElements?.forEach((item, index)=>{
            item?.setAttribute('required', 'required');
        });
        element?.setAttribute('data-field-required', 'required');
        if (typeof customField?.required_error_message !== 'undefined') {
            if(element?.querySelector('.customer-custom-field-required-error-message')){
                element.querySelector('.customer-custom-field-required-error-message').innerHTML = customField?.required_error_message;
            }
        }
    } else {
        if(element?.querySelector('.customer-custom-field-required-error-message')){
            element.querySelector('.customer-custom-field-required-error-message').classList.add('flits-hide');
        }

    }

    if(customField?.type === "date"){
        return <DateField submitButton={submitElement} insertBefore={props.insertBefore} domElement={domElement} customField={customField} />;
    }
    if(customField?.type === "time"){
        return <Time submitButton={submitElement} insertBefore={props.insertBefore} domElement={domElement} customField={customField} />;
    }
    if(customField?.type === "file"){
        return (
            <InsertBeforePortal insertBefore={props.insertBefore}>
                <FileField fileSizeLimit={1000000} submitButton={submitElement} insertBefore={props.insertBefore} domElement={domElement} customField={customField} />
            </InsertBeforePortal>
        );
    }
    return <Default submitButton={submitElement} insertBefore={props.insertBefore} domElement={domElement} customField={customField}/>;
}