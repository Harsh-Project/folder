import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";

export const CustomFileField = ({ item }) => {
  const getStore = GlobalStore.Get();
  const dispatch = useDispatch();

  const edit = useSelector((state) => state.storeFrontMyProfile.edit);
  const microFrontEndData = useSelector(
    (state) => state.storeFrontContainer.microFrontEndData
  );
  const customFieldsDirectValue = useSelector(
    (state) => state.storeFrontMyProfile.customFields[item.unique_id]
  );

  const MyProfileCustomFileField =
    window.UnoDuoComponent("MyProfileCustomFileField");
  const MyProfileCustomRow =
    window.UnoDuoComponent("MyProfileCustomRow");
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

    const fileValueKey = key + "FileValue";
    const fileNameKey = key + "FileName";
    const errorKey = key + "Error";
    const isErrorInFieldKey = key + "IsErrorInField";
    const failedValidationRuleKey = key + "ErrorInValidationRule";
    const fileStatusKey = key + "_file_status";

    const { isErrorInField, failedValidationRule } = validateField(value);

    updateCustomFieldState({
      [`${key}`]: value,
      [`${fileValueKey}`]: value,
      [`${fileNameKey}`]: value?.name,
      [`${errorKey}`]: null,
      [`${isErrorInFieldKey}`]: isErrorInField,
      [`${failedValidationRuleKey}`]: failedValidationRule,
      [`${fileStatusKey}`]: isErrorInField ? "" : "uploaded",
    });
  };

  const handleDelete = () => {
    const key = item?.unique_id;
    const deleteFileNameKey = key + "DeleteFileName";
    const deleteFileValueKey = key + "DeleteFileValue";
    const fileValueKey = key + "FileValue";
    const fileNameKey = key + "FileName";
    const errorKey = key + "Error";
    const isErrorInFieldKey = key + "IsErrorInField";
    const failedValidationRuleKey = key + "ErrorInValidationRule";
    const fileStatusKey = key + "_file_status";

    const { isErrorInField, failedValidationRule } = validateField(null);

    const fileName =
      customFieldsDirectValue?.value?.[`${item?.unique_id}FileName`];
    const fileValue =
      customFieldsDirectValue?.value?.[`${item?.unique_id}FileValue`];

    updateCustomFieldState({
      [`${key}`]: null,
      [`${fileValueKey}`]: null,
      [`${fileNameKey}`]: null,
      [`${deleteFileNameKey}`]: fileName,
      [`${deleteFileValueKey}`]: fileValue,
      [`${errorKey}`]: null,
      [`${isErrorInFieldKey}`]: isErrorInField,
      [`${failedValidationRuleKey}`]: failedValidationRule,
      [`${fileStatusKey}`]: "delete",
    });
  };

  const handleUndo = () => {
    const key = item?.unique_id;
    const deleteFileNameKey = key + "DeleteFileName";
    const deleteFileValueKey = key + "DeleteFileValue";
    const fileValueKey = key + "FileValue";
    const fileNameKey = key + "FileName";
    const errorKey = key + "Error";
    const isErrorInFieldKey = key + "IsErrorInField";
    const failedValidationRuleKey = key + "ErrorInValidationRule";
    const fileStatusKey = key + "_file_status";

    const deleteFileName =
      customFieldsDirectValue?.value?.[`${item?.unique_id}DeleteFileName`];
    const deleteFileValue =
      customFieldsDirectValue?.value?.[`${item?.unique_id}DeleteFileValue`];

    const { isErrorInField, failedValidationRule } =
      validateField(deleteFileName);

    updateCustomFieldState({
      [`${key}`]: deleteFileValue,
      [`${fileValueKey}`]: deleteFileValue,
      [`${fileNameKey}`]: deleteFileName,
      [`${deleteFileNameKey}`]: null,
      [`${deleteFileValueKey}`]: null,
      [`${errorKey}`]: null,
      [`${isErrorInFieldKey}`]: isErrorInField,
      [`${failedValidationRuleKey}`]: failedValidationRule,
      [`${fileStatusKey}`]: "uploaded",
    });
  };

  if (!MyProfileLabel || !MyProfileCustomFileField) return null;

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
      <MyProfileCustomFileField
        readOnly={!edit}
        onValueChange={handleChange}
        onValueDelete={handleDelete}
        onValueUndo={handleUndo}
        value={customFieldsDirectValue?.value?.[`${item?.unique_id}`] ?? ""}
        type={"file"}
        title={item?.upload_button_text}
        filename={
          customFieldsDirectValue?.value?.[`${item?.unique_id}FileName`]
        }
        path={customFieldsDirectValue?.value?.[`${item?.unique_id}UrlPath`]}
        extension={item?.file_extensions.join(",")}
        unique_id={item?.unique_id}
        name={item?.unique_id}
        required={item?.is_required}
        required_message={
          customFieldsDirectValue?.value?.[item?.unique_id + "Error"] ?? null
        }
        error={item?.required_error_message}
        disabled={!edit}
        description={edit && item?.description}
        placeholder={item?.placeholder}
        edit={edit}
        fileStatus={
          customFieldsDirectValue?.value?.[`${item?.unique_id}_file_status`]
        }
        fileSizeLimit={1000000}
      />
    </MyProfileCustomRow>
  );
};
