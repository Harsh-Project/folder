import { useEffect, useId } from "react";
import React from "react";
import { InsertBeforePortal } from "../InsertBeforePortal";

export const Default = (props) => {
    const id = useId();
    let domElement = props?.domElement;
    let customField = props?.customField;
    const element = domElement?.querySelector(".customer-custom-field-row");
    if (typeof customField?.placeholder !== 'undefined' && customField?.placeholder !== null && customField?.placeholder !== '') {
        if(element?.querySelector('.customer-custom-field-value-input'))
        element?.querySelector('.customer-custom-field-value-input').setAttribute('placeholder', customField?.placeholder);
    } else {
        if(element?.querySelector('.customer-custom-field-value-input'))
        element?.querySelector('.customer-custom-field-value-input')?.setAttribute('placeholder', customField?.title);
    }
    element?.querySelector('.customer-custom-field-value-input').setAttribute('name', customField?.unique_id);
    element?.querySelector('.customer-custom-field-value-input').setAttribute('data-flits-input-id', id);

    useEffect(() => {
        const handleInputEvent = (event) => {
            let target = event?.target;
            var value = target?.value;
            if (typeof target?.getAttribute('data-type') !== 'undefined') {
                switch (target?.getAttribute('data-type')) {
                    case 'letters':
                        var letters = value?.replace(/[^a-zA-Z ]/g, ""); // allow a-z,A-Z and space
                        target.value = letters;
                        break;
                    case 'numbers':
                        var numbers = value?.replace(/[^0-9 ]/g, ""); // allow 0-9 and space
                        target.value = numbers;
                        break;
                    default:
                        break;
                }
            }
        }
        window.document?.querySelector('[data-flits-input-id="'+id+'"]').addEventListener("input", handleInputEvent);
        return () => {
            window.document?.querySelector('[data-flits-input-id="'+id+'"]').removeEventListener('input', handleInputEvent);
        }
    });
    return (
    <InsertBeforePortal insertBefore={props.insertBefore}>
        <div dangerouslySetInnerHTML={{__html: domElement.innerHTML}} />
    </InsertBeforePortal>
    );
}