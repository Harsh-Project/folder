import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";

export const CustomNumberField = ({ item }) => {
  const getStore = GlobalStore.Get();
  const dispatch = useDispatch();

  const edit = useSelector((state) => state.storeFrontMyProfile.edit);

  const customFieldsDirectValue = useSelector(
    (state) => state.storeFrontMyProfile.customFields[item.unique_id]
  );
  const microFrontEndData = useSelector(
    (state) => state.storeFrontContainer.microFrontEndData
  );
  const MyProfileCustomNumberField = window.UnoDuoComponent(
    "MyProfileCustomNumberField"
  );
  const MyProfileCustomRow = window.UnoDuoComponent("MyProfileCustomRow");
  const MyProfileLabel = window.UnoDuoComponent("MyProfileLabel");

  const setCustomFields = window.profileState("setCustomFields");

  const IsRequiredValidationFailed =
    getStore._globalActions.Helpers[0].IsRequiredValidationFailed;

  const validateField = useCallback(
    (value) => {
      let isErrorInField = false;
      let failedValidationRule = null;
      if (item?.is_required && IsRequiredValidationFailed(value)) {
        isErrorInField = true;
        failedValidationRule = "required";
      }
      return {
        isErrorInField: isErrorInField,
        failedValidationRule: failedValidationRule,
      };
    },
    [IsRequiredValidationFailed, item]
  );

  const updateCustomFieldState = useCallback(
    (updatedValue) => {
      const key = item?.unique_id;
      dispatch(
        setCustomFields({
          key: key,
          value: {
            ...customFieldsDirectValue.value,
            ...updatedValue,
          },
        })
      );
    },
    [dispatch, setCustomFields, customFieldsDirectValue, item]
  );

  const handleChange = (value) => {
    const key = item?.unique_id;

    const errorKey = key + "Error";
    const isErrorInFieldKey = key + "IsErrorInField";
    const failedValidationRuleKey = key + "ErrorInValidationRule";
    const { isErrorInField, failedValidationRule } = validateField(value);

    updateCustomFieldState({
      [`${key}`]: value,
      [`${errorKey}`]: null,
      [`${isErrorInFieldKey}`]: isErrorInField,
      [`${failedValidationRuleKey}`]: failedValidationRule,
    });
  };

  if (!MyProfileLabel || !MyProfileCustomNumberField) return null;

  return (
    <MyProfileCustomRow edit={edit} index={item?.unique_id}>
      <MyProfileLabel
        label={
          microFrontEndData?.accountSettings?.template === 2
            ? `${item?.title}`
            : `${item?.title} : `
        }
        edit={edit}
        wrapText={true}
        />
      <MyProfileCustomNumberField
        readOnly={!edit}
        onValueChange={handleChange}
        value={customFieldsDirectValue?.value?.[`${item?.unique_id}`] ?? ""}
        type={"text"}
        name={item?.unique_id}
        required={item?.is_required}
        required_message={
          customFieldsDirectValue?.value?.[`${item?.unique_id}Error`]
        }
        error={item?.required_error_message}
        disabled={!edit}
        description={edit && item?.description}
        placeholder={item?.placeholder ? item?.placeholder : ""}
        edit={edit}
      />
    </MyProfileCustomRow>
  );
};
