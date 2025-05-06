import React from "react";
import styles from "./MyProfileCustomMultiLineField.module.css";
import { RenderSvgString } from "../../General/RenderSvgString";

export const MyProfileCustomMultiLineField = (props) => {
  return (
    <>
      <textarea
        type={props?.type}
        className={`${styles.flits_textara} ${styles.flits_input} ${
          styles.customer_custom_field_value_input
        } ${props?.edit ? styles.flits_textarea_edit_mode : ""}`}
        name={props?.name ?? ""}
        value={props?.value}
        rows={3}
        onChange={(e) => {
          props.onValueChange(e.target.value);
        }}
        readOnly={props?.readOnly ?? false}
      />
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
          <RenderSvgString svgString={window?.UnoIcon?.Description}/>
          </div>
          &nbsp;
          <span className={`${styles.customer_custom_field_description_text}`}>{props?.description}</span>
        </div>
      )}
    </>
  );
};
