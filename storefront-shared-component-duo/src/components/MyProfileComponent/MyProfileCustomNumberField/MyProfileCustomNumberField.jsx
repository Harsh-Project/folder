import React from "react";
import styles from "./MyProfileCustomNumberFieldModule.module.css";
import { RenderSvgString } from "../../General/RenderSvgString";

export const MyProfileCustomNumberField = (props) => {
  const handleValueChange = (e) => {
    const cleanedValue = e.target.value.replace(/[^0-9]/g, "");
    props.onValueChange(cleanedValue);
  };

  return (
    <div className={styles.flits_number_wrapper}>
      <input
        type={props?.type}
        data-unique-id={props?.name}
        className={`${styles.flits_input} flits-input-height-selector ${styles.customer_custom_field_value_input}`}
        placeholder={props?.placeholder ?? ""}
        name={props?.name ?? ""}
        value={props?.value}
        onChange={handleValueChange}
        disabled={props?.disabled}
        readOnly={props?.readOnly ?? false}
      />
      {props?.required_message && (
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
