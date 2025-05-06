import styles from "./MyProfileCustomTimeFieldModule.module.css";
import React from "react";
import { RenderSvgString } from "../../General/RenderSvgString";

export const MyProfileCustomTimeField = (props) => {

  
  const handleHourChange = (e) => {
    const cleanedValue = e.target.value;
    props.onValueChange({ hour: cleanedValue, minute: props?.value?.minute });
  };

  const handleMinuteChange = (e) => {
    const cleanedValue = e.target.value;
    props.onValueChange({ hour: props?.value?.hour, minute: cleanedValue });
  };

  function generateHourOptions(startMonth, endMonth) {
    const options = [];
    for (let month = startMonth; month <= endMonth; month++) {
      month = month < 10 ? '0' + month : month;
      options.push(
        <option key={month} value={month}>
          {month}
        </option>
      );
    }
    return options;
  }

  function generateMinuteOptions(startDay, endDay) {
    const options = [];
    for (let day = startDay; day <= endDay; day++) {
      day = day < 10 ? '0' + day : day;
      options.push(
        <option key={day} value={day}>
          {day}
        </option>
      );
    }
    return options;
  }

  return (
    <div className={styles.flits_timewrap}>
      <div className={styles.flits_dob_wrap}>
        <div
          className={`${styles.flits_select_row} ${styles.flits_dd_select} ${props.edit ? styles.flits_select_edit : ""}`}
        >
          <select
            disabled={props?.disabled}
            value={props.value.hour}
        data-unique-id={props?.name}
            name={`${props?.name}[hour]`}
            required="required"
            className={`${styles.flits_input} flits-input-height-selector ${styles.hour}  ${
              styles.customer_custom_field_value_input
            }`}
            onChange={handleHourChange}
          >
            <option value="HH" disabled={true}>
              HH
            </option>
            {generateHourOptions(0, 23)}
          </select>
          {props?.edit && (
            <div className={styles.flits_select_arrow}><RenderSvgString svgString={window?.DuoIcon?.Select} /></div>
          )}
        </div>
        <div className={`${styles.flits_select_row} ${styles.flits_mm_select} ${styles.flits_mx_10}`}>
          <select
            disabled={props?.disabled}
            name={`${props?.name}[minute]`}
            value={props.value.minute}
            required="required"
            className={`${styles.flits_input} ${styles.minute} ${
              styles.customer_custom_field_value_input
            }`}
            onChange={handleMinuteChange}
          >
            <option value="MM" disabled={true}>
              MM
            </option>
            {generateMinuteOptions(0, 59)}
          </select>
          {props?.edit && (
            <div className={styles.flits_select_arrow}><RenderSvgString svgString={window?.DuoIcon?.Select} /></div>
          )}
        </div>
      </div>
      {props?.required_message && (
        <p
         data-unique-id={props?.name} className={`${styles.customer_custom_field_required_error_message} ${styles.text_danger} flits-custom-field-error-message`}
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
          <span data-unique-id={props?.name} className={`${styles.customer_custom_field_description_text} flits-custom-field-description `}>
            {props?.description}
          </span>
        </div>
      )}
    </div>
  );
};
