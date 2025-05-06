/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import styles from "./MyProfileCustomFileField.module.css";
import { Suspense } from "react";
import { GlobalStore } from "redux-micro-frontend";
import { RenderSvgString } from "../../General/RenderSvgString";
import { SaveSnackBar } from '../SaveSnackBar/SaveSnackBar';

export const MyProfileCustomFileField = (props) => {
  const [showLoader, setShowLoader] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [fileSizeExceedWarning, setFileSizeExceedWarning] = useState(false);
  const [fileSizeExceedWarningMsg, setFileSizeExceedWarningMsg] = useState("");
  const getStore = GlobalStore.Get();
  const API = getStore._globalActions.API[0].API;
  const IsFileTypeValidation =
    getStore._globalActions.Helpers[0].IsFileTypeValidation;
  const IsFileSizeValidationFailed =
    getStore._globalActions.Helpers[0].IsFileSizeValidationFailed;
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;
  const { t } = useTranslationLanguage();

  const handleChange = (e) => {
    let value = e.target.files[0];
    const fileType = IsFileTypeValidation(value, props?.extension);
    const isNotValidSize = IsFileSizeValidationFailed(
      value,
      props?.fileSizeLimit
    );

    if (!fileType) {
      setSelectedValue("");
      value = null;
      setFileSizeExceedWarning(true);
      setFileSizeExceedWarningMsg(
        t(
          "flits.custom_fields.file_type_invalid_error_message",
          "Please check file type and try again"
        )
      );
      setTimeout(function () {
        setFileSizeExceedWarning(false);
        setFileSizeExceedWarningMsg("");
      }, 2500);
    }
    if (fileType && isNotValidSize) {
      setSelectedValue("");
      value = null;
      setFileSizeExceedWarning(true);
      setFileSizeExceedWarningMsg(
        t(
          "flits.custom_fields.file_size_exceed_error_message",
          "File size exceeds 1MB, please resize and upload"
        )
      );
      setTimeout(function () {
        setFileSizeExceedWarning(false);
        setFileSizeExceedWarningMsg("");
      }, 2500);
    }
    console.log(
      "MyProfileCustomFileField: handleChange",
      value,
      isNotValidSize
    );
    props.onValueChange(value);
  };

  const handleDelete = () => {
    props.onValueDelete();
  };

  const handleUndo = () => {
    props.onValueUndo();
  };

  const handleClick = async () => {
    setShowLoader(true);
    try {
      const data = await API.myprofile.get_url(props?.path);
      window.open(data);
      setShowLoader(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div
        className={`${styles.custom_file_input} ${styles.disabled} ${
          props?.edit ? styles.flits_file_input_edit_mode : ""
        }`}
      >
        <input
          type={props?.type}
          className={`${styles.flits_input} ${styles.customer_custom_field_value_input}`}
          title=""
          accept={props?.extension}
          name={props?.name}
          onChange={handleChange}
          required={props?.required}
          readOnly={props?.readOnly}
          disabled={props?.disabled}
          value={selectedValue}
        ></input>
        {(((props?.path === "" ||
          !props?.path ||
          props?.fileStatus === "delete") &&
          props?.edit) ||
          (props?.path?.length > 0 && !props?.filename)) && (
          <span className={`${styles.file_upload_button}`}>{props?.title}</span>
        )}
        <span
          className={`${styles.file_name_label}`}
          data-file-label={props?.filename}
          data-file-name={props?.filename}
        >
          {(props?.path || props?.fileStatus === "uploaded") &&
          props?.fileStatus !== "delete" &&
          props?.filename
            ? props?.filename
            : props?.placeholder}
        </span>
      </div>
      <input
        type="hidden"
        className={`${styles.customer_custom_field_value_input}`}
        readOnly=""
        name="file_status"
        value=""
      ></input>
      {props?.path && props?.fileStatus !== "delete" && (
        <a
          className={
            showLoader
              ? styles.custom_fields_loading
              : styles.customer_custom_field_file_view
          }
          onClick={handleClick}
          data-file-path={props?.path}
        >
          {showLoader ? (
            <RenderSvgString svgString={window?.UnoIcon?.Wheel} />
          ) : (
            <RenderSvgString svgString={window?.UnoIcon?.ViewFile} />
          )}
        </a>
      )}
      {props?.path && props?.edit && props.fileStatus !== "delete" && (
        <a
          className={styles.customer_custom_field_file_delete}
          onClick={handleDelete}
        >
          <RenderSvgString svgString={window?.UnoIcon?.Delete} />
        </a>
      )}
      {props?.path && props?.edit && props.fileStatus === "delete" && (
        <a
          className={`${styles.customer_custom_field_file_undo}`}
          onClick={handleUndo}
        >
          <RenderSvgString svgString={window?.UnoIcon?.Undo} />
        </a>
      )}
      {props?.required_message && (
        <p
          className={`${styles.customer_custom_field_required_error_message} ${styles.text_danger}`}
        >
          {props?.error}
        </p>
      )}
      {props?.description && props?.description?.length > 0 && (
        <div className={styles.customer_custom_field_description}>
          <div className={`${styles.customer_custom_field_description_icon}`}>
            <RenderSvgString svgString={window?.UnoIcon?.Description} />
          </div>
          &nbsp;
          <span className={`${styles.customer_custom_field_description_text}`}>
            {props?.description}
          </span>
        </div>
      )}
      {fileSizeExceedWarning && (
        <Suspense fallback={<></>}>
          <SaveSnackBar
            message={fileSizeExceedWarningMsg}
            open={fileSizeExceedWarning}
            bg={"black"}
          />
        </Suspense>
      )}
    </>
  );
};
