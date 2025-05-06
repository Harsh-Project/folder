import React from "react"
import { GenerateDateTimeOption } from "../GenerateDateTimeOption";
import { InsertBeforePortal } from "../InsertBeforePortal";
import { useId } from "react";

export const DateField = (props) => {
    const id = useId();
    let domElement = props?.domElement;
    let customField = props?.customField;
    const element = domElement?.querySelector(".customer-custom-field-row");
    if(element?.querySelector('.customer-custom-field-value-input'))
    element?.querySelector('.customer-custom-field-value-input').setAttribute('data-flits-input-id', id);

    let daySelector = element?.querySelector('.customer-custom-field-value-input.day');
    daySelector?.setAttribute('name', customField.unique_id + "[day]");
    GenerateDateTimeOption(1, 31, daySelector);
    if(daySelector) {
    daySelector.value = '';
    daySelector.querySelector("option[value='']").selected = true;
    daySelector.querySelector("option[value='']").setAttribute('selected', true);}

    let monthSelector = element?.querySelector('.customer-custom-field-value-input.month');
    monthSelector?.setAttribute('name', customField.unique_id + "[month]");
    GenerateDateTimeOption(1, 12, monthSelector);
    if(monthSelector) {
    monthSelector.value = '';
    monthSelector.querySelector("option[value='']").selected = true;
    monthSelector.querySelector("option[value='']").setAttribute('selected', true);}

    let yearSelector = element?.querySelector('.customer-custom-field-value-input.year');
    yearSelector?.setAttribute('name', customField.unique_id + "[year]");
    GenerateDateTimeOption(1920, new Date().getFullYear(), yearSelector);
    if(yearSelector) {
    yearSelector.value = '';
    yearSelector.querySelector("option[value='']").selected = true;
    yearSelector.querySelector("option[value='']").setAttribute('selected', true);}
    
    return (
            <InsertBeforePortal insertBefore={props.insertBefore}>
                <div dangerouslySetInnerHTML={{__html: domElement.innerHTML}} />
            </InsertBeforePortal>
    );
}