import React from "react";
import styles from "./MyProfileCustomAlphaNumericFieldModule.module.css";
import { RenderSvgString } from "../../General/RenderSvgString";

export const MyProfileCustomAlphaNumericField = (props) => {
  return (
    <div className={styles.flits_alphaNumberic_wrapper}>
      <input
        type={props?.type}
        data-unique-id={props?.name}
        className={`${styles.flits_input} ${styles.customer_custom_field_value_input} flits-input-height-selector`}
        placeholder={props?.placeholder ?? ""}
        name={props?.name ?? ""}
        value={props?.value}
        onChange={(e) => {
          props.onValueChange(e.target.value);
        }}
        disabled={props?.disabled}
        readOnly={props?.readOnly ?? false}
      />
      {props?.required_message && props?.required_message !== undefined && (
        <p
          data-unique-id={props?.name}
          className={`${styles.customer_custom_field_required_error_message} ${styles.text_danger} flits-custom-field-error-message`}
        >
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
            data-unique-id={props?.name}
            className={`${styles.customer_custom_field_description_text} flits-custom-field-description `}
          >
            {props?.description}
          </span>
        </div>
      )}
    </div>
  );
};
