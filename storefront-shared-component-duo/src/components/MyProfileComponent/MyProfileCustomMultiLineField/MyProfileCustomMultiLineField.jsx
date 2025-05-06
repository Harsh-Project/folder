import React from "react";
import styles from "./MyProfileCustomMultiLineFieldModule.module.css";
import { RenderSvgString } from "../../General/RenderSvgString";

export const MyProfileCustomMultiLineField = (props) => {
  return (
    <div className={styles.flits_multiline_wrapper}>
      <textarea
        type={props?.type}
        className={`${styles.flits_textara} flits-input-height-selector ${styles.flits_input}  ${
          styles.customer_custom_field_value_input
        }`}
        data-unique-id={props?.name}
        placeholder={props?.placeholder ?? ""}
        name={props?.name ?? ""}
        value={props?.value}
        rows={3}
        onChange={(e) => {
          props.onValueChange(e.target.value);
        }}
        disabled={props?.disabled}
        readOnly={props?.readOnly ?? false}
      />
      {props?.required_message && (
        <p
          className={`${styles.customer_custom_field_required_error_message} ${styles.text_danger} flits-custom-field-error-message`}
          data-unique-id={props?.name}>
          {props?.error}
        </p>
      )}
      {props?.description && props?.description?.length > 0 && (
        <div className={styles.customer_custom_field_description}>
          <div className={`${styles.customer_custom_field_description_icon}`}>
          <RenderSvgString svgString={window?.DuoIcon?.Description} />
          </div>
          &nbsp;
          <span 
          data-unique-id={props?.name} className={`${styles.customer_custom_field_description_text} flits-custom-field-description `}>{props?.description}</span>
        </div>
      )}
    </div>
  );
};
