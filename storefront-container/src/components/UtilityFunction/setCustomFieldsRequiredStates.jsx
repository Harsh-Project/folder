export const setCustomFieldsRequiredStates = (customFields, dispatch, setCustomFieldsInitial, setCustomFields, Helpers) => {
    for (let i = 0; i < customFields?.length; i++) {
        // MyProfileFields.push();
        let temp = {
          key: customFields[i]?.unique_id,
          value: {}
        };
        if (customFields[i]?.component === "CustomTimeField") {
          const extractor = customFields[i]?.new_value?.split(":");
          let hour = "HH";
          let minute = "MM";
          if(extractor){
            hour = parseInt(extractor[0]) < 10 ? '0' + parseInt(extractor[0]) : extractor[0];
            minute = parseInt(extractor[1]) < 10 ? '0' + parseInt(extractor[1]) : extractor[1];
          }
          if(customFields[i]?.is_required && Helpers.IsRequiredTimeValidationFailed({hour,minute})){
            temp.value[`${customFields[i]?.unique_id}IsErrorInField`] = true;
            temp.value[`${customFields[i]?.unique_id}ErrorInValidationRule`] = "required";
          }
          temp.value.component = customFields[i]?.component;
          temp.value[`${customFields[i]?.unique_id}`] = { hour: hour, minute: minute };
        }
        else if (customFields[i]?.component === "CustomDateField") {
          const extractor = customFields[i]?.new_value?.split("-");
          let year = "YYYY";
          let month = "MM";
          let day = "DD";
          if(extractor){
            year = parseInt(extractor[0]);
            day = parseInt(extractor[2]) < 10 ? '0' + parseInt(extractor[2]) : extractor[2];
            month = parseInt(extractor[1]) < 10 ? '0' + parseInt(extractor[1]) : extractor[1];
          }
          if(customFields[i]?.is_required && Helpers.IsRequiredDateValidationFailed({year,month,day})){
            temp.value[`${customFields[i]?.unique_id}IsErrorInField`] = true;
            temp.value[`${customFields[i]?.unique_id}ErrorInValidationRule`] = "required";
          }
          temp.value.component = customFields[i]?.component;
          temp.value[`${customFields[i]?.unique_id}`] = { year: year, month: month, day: day };
        }
        else if (customFields[i]?.component === "CustomFileField") {
          temp.value.component = customFields[i]?.component;
          temp.value[`${customFields[i]?.unique_id}`] = null;
          temp.value[`${customFields[i]?.unique_id}_file_status`] = "";
          temp.value[`${customFields[i]?.unique_id}FileName`] = customFields[i]?.original_file_name ?? null;
          temp.value[`${customFields[i]?.unique_id}FileValue`] = null;
          temp.value[`${customFields[i]?.unique_id}UrlPath`] = customFields[i]?.new_value;
          temp.value[`${customFields[i]?.unique_id}DeleteFileName`] = null;
          temp.value[`${customFields[i]?.unique_id}DeleteFileValue`] = null;
          if(customFields[i]?.is_required){
            if(Helpers.IsRequiredValidationFailed(customFields[i]?.new_value)){
              temp.value[`${customFields[i]?.unique_id}IsErrorInField`] = true;
              temp.value[`${customFields[i]?.unique_id}ErrorInValidationRule`] = "required";
            }else{
              temp.value[`${customFields[i]?.unique_id}_file_status`] = "uploaded";
            }
          }
        }
        else {
          temp.value[`${customFields[i]?.unique_id}`] = customFields[i]?.new_value;
          temp.value.component = customFields[i]?.component;
          if(customFields[i]?.is_required && Helpers.IsRequiredValidationFailed(customFields[i]?.new_value)){
            temp.value[`${customFields[i]?.unique_id}IsErrorInField`] = true;
            temp.value[`${customFields[i]?.unique_id}ErrorInValidationRule`] = "required";
          }
        }
        temp.value[`${customFields[i]?.unique_id}Error`] = null;
        temp.value[`${customFields[i]?.unique_id}IsRequiredField`] = customFields[i]?.is_required;
        temp.value[`${customFields[i]?.unique_id}FieldData`] = customFields[i];
        dispatch(setCustomFieldsInitial(temp))
        dispatch(setCustomFields(temp));
      }
};