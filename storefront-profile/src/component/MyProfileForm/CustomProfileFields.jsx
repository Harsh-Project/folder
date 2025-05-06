import { useSelector } from "react-redux";
import React from "react";
import { CustomTextField } from "../CustomTextField/CustomTextField";
import { CustomNumberField } from "../CustomNumberField/CustomNumberField";
import { CustomAlphaNumericField } from "../CustomAlphaNumericField/CustomAlphaNumericField";
import { CustomMultiLineField } from "../CustomMultiLineField/CustomMultiLineField";
import { CustomDateField } from "../CustomDateField/CustomDateField";
import { CustomTimeField } from '../CustomTimeField/CustomTimeField';
import { CustomFileField } from '../CustomFileField/CustomFIleField';

const componentMap = {
    CustomTextField,
    CustomNumberField,
    CustomAlphaNumericField,
    CustomMultiLineField,
    CustomDateField,
    CustomTimeField,
    CustomFileField
};
export const CustomProfileFields = () => {
    const customFieldsData = useSelector((state) => state.storeFrontContainer.customFieldsData);

    if(customFieldsData === -1){
        return null;
    }

    return (<>
    {customFieldsData.map((item1, index) => {
        const DynamicComponent = componentMap[item1.component];
        if (!DynamicComponent) {
            return null
        }
        return <DynamicComponent item={item1} key={index} />;
    })}
    </>);
}