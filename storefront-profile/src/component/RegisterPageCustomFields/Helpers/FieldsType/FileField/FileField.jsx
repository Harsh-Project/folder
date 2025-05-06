
import { useEffect, useId, useState } from "react";
import { GlobalStore } from "redux-micro-frontend";
import React from "react";
import { FileFieldReset } from "./FileFieldReset";

export const FileField = (props) => {
    const id = useId();
    let domElement = props?.domElement;
    let customField = props?.customField;
    const submitButton = props?.submitButton;
    const [openSnackbar, setOpenSnackbar] = useState(null);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const getStore = GlobalStore.Get();
    const SnackBar = window.UnoDuoComponent("SnackBar");
    const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;
    const { t } = useTranslationLanguage();
    const IsFileSizeValidationFailed = getStore._globalActions.Helpers[0].IsFileSizeValidationFailed;
    const Utility = getStore._globalActions.Helpers[0].Utility;
    const API = getStore._globalActions.API[0].API;

    const element = domElement?.querySelector(".customer-custom-field-row");
    if(element?.querySelector('.customer-custom-field-value-input'))
    element?.querySelector('.customer-custom-field-value-input').setAttribute('data-flits-input-id', id);

    if (typeof customField?.file_extensions !== 'undefined') {
        if(element?.querySelector('.customer-custom-field-value-input[type="file"]'))
        element.querySelector('.customer-custom-field-value-input[type="file"]').setAttribute('accept', customField?.file_extensions?.toString());
    }
    if (typeof customField?.upload_button_text !== 'undefined') {
        if(element.querySelector('.file-upload-button'))
        element.querySelector('.file-upload-button').innerHTML = customField?.upload_button_text;
    }
    if (typeof customField?.placeholder !== 'undefined' && element.querySelector('.file-name-label')) {
        element.querySelector('.file-name-label').innerHTML = customField?.placeholder;
        element.querySelector('.file-name-label').setAttribute('data-file-label', customField?.placeholder);
    }

    let hiddenFileElements = element?.querySelectorAll('.customer-custom-field-value-input:not([type="hidden"])');
    hiddenFileElements?.forEach((item, index) => {
        item?.setAttribute('name', customField?.unique_id)
    });
    let fileStatusElements = element?.querySelectorAll('.customer-custom-field-value-input[type="hidden"]');
    fileStatusElements?.forEach((item, index) => {
        item?.setAttribute('name', customField?.unique_id + '_file_status')
    });

    useEffect(() => {
        const handleChangeEvent = (event) => {
            event.preventDefault();
            const selector = event?.target;
            var uploadedFile = selector?.files[0];
            if (typeof uploadedFile == 'undefined') {
                return false;
            }
            if(submitButton)
            submitButton.disabled = true;
            let customerCustomFieldRow = selector?.closest('.customer-custom-field-row');
            if(customerCustomFieldRow?.querySelector('.file-upload-spinner'))
            customerCustomFieldRow?.querySelector('.file-upload-spinner').classList.remove('flits-hide');
        if(customerCustomFieldRow?.querySelector('.file-uploaded'))
            customerCustomFieldRow?.querySelector('.file-uploaded').classList.add('flits-hide');

            if (uploadedFile?.name === '') {
                setSnackbarMessage(t('flits.custom_fields.file_type_invalid_error_message', 'Please check file type and try again'));
                setOpenSnackbar("error");
                setTimeout(() => {
                  setOpenSnackbar(null);
                  setSnackbarMessage("");
                }, 2500);
                FileFieldReset(selector);
                // Flits.fileFieldReset(selector, Flits.customFields.settings.fileTypeInvalidErrorMessage);
                return false;
            }
            else {
                var validFileTypes = selector?.getAttribute('accept').split(',');
                if (!validFileTypes?.includes(uploadedFile?.type)) {
                    setSnackbarMessage(t('flits.custom_fields.file_type_invalid_error_message', 'Please check file type and try again'));
                    setOpenSnackbar("error");
                    setTimeout(() => {
                      setOpenSnackbar(null);
                      setSnackbarMessage("");
                    }, 2500);
                    FileFieldReset(selector);
                    return false;
                }
                if (IsFileSizeValidationFailed(uploadedFile, props?.fileSizeLimit)) {
                submitButton.disabled = false;
                    setSnackbarMessage(t('flits.custom_fields.file_size_exceed_error_message', 'File size exceeds 1MB, please resize and upload'));
                    setOpenSnackbar("error");
                    setTimeout(() => {
                      setOpenSnackbar(null);
                      setSnackbarMessage("");
                    }, 2500);
                    FileFieldReset(selector);
                    return false;
                }
                var fileName = uploadedFile?.name;
                if (fileName?.length > 30) {
                    fileName = fileName?.substring(0, 15) + '..' + fileName?.substr((fileName.lastIndexOf('.') - 3));
                }
                if(selector?.closest('.customer-custom-field-row'))
                {
                    if(selector.closest('.customer-custom-field-row').querySelector('.file-name-label')) 
                    selector.closest('.customer-custom-field-row').querySelector('.file-name-label').innerHTML = fileName ?? ""
                }
            }
            var fileInputName = selector?.getAttribute('name');
            let params = {
                request_id: Utility.generateUUIDv4(),
                field_unique_id: fileInputName,
            };
            params[fileInputName] = uploadedFile;
            if (selector?.getAttribute('data-value')) {
                params['field_prev_temp_file_name'] = JSON.parse(selector?.getAttribute('data-value'))?.new_value;
            }
            API.myprofile.upload_temp_file_custom_field(params).then((resp) => {
                if(submitButton)
                submitButton.disabled = false;
                if (resp.status) {
                    var fileHistory = selector.getAttribute('name') + '_history';
                    var fileData = JSON.stringify(resp[fileHistory]);
                    selector?.setAttribute('data-value', fileData);
                    if(customerCustomFieldRow?.querySelector('.file-upload-spinner'))
                    customerCustomFieldRow?.querySelector('.file-upload-spinner').classList.add('flits-hide');
                if(customerCustomFieldRow?.querySelector('.file-uploaded'))
                    customerCustomFieldRow?.querySelector('.file-uploaded').classList.remove('flits-hide');
                } else {
                    setSnackbarMessage(resp.error);
                    setOpenSnackbar("error");
                    setTimeout(() => {
                      setOpenSnackbar(null);
                      setSnackbarMessage("");
                    }, 2500);
                    FileFieldReset(selector);
                    return false;
                }
            }).catch((error) => {
                setSnackbarMessage(error.message);
                console.error(error);
                setOpenSnackbar("error");
                setTimeout(() => {
                  setOpenSnackbar(null);
                  setSnackbarMessage("");
                }, 2500);
                FileFieldReset(selector);
            });
        }
        window.document?.querySelector('[data-flits-input-id="'+id+'"]').addEventListener('change', handleChangeEvent);
        return () => {
            window.document?.querySelector('[data-flits-input-id="'+id+'"]').removeEventListener('change', handleChangeEvent);
        }
    });

    return (
        <>
            <div dangerouslySetInnerHTML={{__html: domElement.innerHTML}} />
            <SnackBar mode={openSnackbar} message={snackbarMessage} />
        </>
    );
}