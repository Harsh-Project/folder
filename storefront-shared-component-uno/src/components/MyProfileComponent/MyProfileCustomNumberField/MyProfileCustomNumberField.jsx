import React from "react";
import styles from "./MyProfileCustomNumberField.module.css";
import { RenderSvgString } from "../../General/RenderSvgString";

export const MyProfileCustomNumberField = (props) => {
  const handleValueChange = (e) => {
    const cleanedValue = e.target.value.replace(/[^0-9]/g, "");
    props.onValueChange(cleanedValue);
  };

  return (
    <>
      <input
        type={props?.type}
        className={`${styles.flits_input} ${
          styles.customer_custom_field_value_input
        } ${props?.edit ? styles.flits_input_edit_mode : ""}`}
        name={props?.name ?? ""}
        value={props?.value}
        onChange={handleValueChange}
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
          <span className={`${styles.customer_custom_field_description_text}`}>
            {props?.description}
          </span>
        </div>
      )}
    </>
  );
};
