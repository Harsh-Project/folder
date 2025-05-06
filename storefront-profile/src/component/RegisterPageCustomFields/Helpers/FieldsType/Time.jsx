import { GenerateDateTimeOption } from "../GenerateDateTimeOption";
import React from "react";
import { InsertBeforePortal } from "../InsertBeforePortal";
import { useId } from "react";

export const Time = (props) => {
    const id = useId();
    let domElement = props?.domElement;
    let customField = props?.customField;
    const element = domElement?.querySelector(".customer-custom-field-row");
    if(element?.querySelector('.customer-custom-field-value-input'))
    element.querySelector('.customer-custom-field-value-input').setAttribute('data-flits-input-id', id);

    var hourSelector = element?.querySelector('.customer-custom-field-value-input.hour');
    hourSelector?.setAttribute('name', customField.unique_id + "[hour]");
    GenerateDateTimeOption(0, 23, hourSelector);
    if(hourSelector){hourSelector.value = '';
    hourSelector.querySelector("option[value='']").selected = true;
    hourSelector.querySelector("option[value='']").setAttribute('selected', true);}

    var minuteSelector = element?.querySelector('.customer-custom-field-value-input.minute');
    minuteSelector?.setAttribute('name', customField.unique_id + "[minute]");
    GenerateDateTimeOption(0, 59, minuteSelector);
    if(minuteSelector){minuteSelector.value = '';
    minuteSelector.querySelector("option[value='']").selected = true;
    minuteSelector.querySelector("option[value='']").setAttribute('selected', true);}

    return (
        <InsertBeforePortal insertBefore={props.insertBefore}>
            <div dangerouslySetInnerHTML={{__html: domElement.innerHTML}} />
        </InsertBeforePortal>
    );
}