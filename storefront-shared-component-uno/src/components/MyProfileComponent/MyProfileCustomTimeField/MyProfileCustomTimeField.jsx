import { RenderSvgString } from "../../General/RenderSvgString";
import styles from "./MyProfileCustomTimeField.module.css";
import React from "react";

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
    <>
      <div className={styles.flits_dob_wrap}>
        <div
          className={`${styles.flits_select_row} ${styles.flits_hh_select}`}
        >
          <select
            disabled={props?.disabled}
            value={props.value.hour}
            name={`${props?.name}[hour]`}
            required="required"
            className={`${styles.flits_input} ${styles.hour} ${
              styles.customer_custom_field_value_input
            } ${props?.edit ? styles.flits_input_edit_mode : ""}`}
            onChange={handleHourChange}
          >
            <option value="HH" disabled={true}>
              HH
            </option>
            {generateHourOptions(0, 23)}
          </select>
          {props?.edit && (
            <div className={styles.flits_select_arrow}><RenderSvgString svgString={window?.UnoIcon?.Select}/></div>
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
            } ${props?.edit ? styles.flits_input_edit_mode : ""}`}
            onChange={handleMinuteChange}
          >
            <option value="MM" disabled={true}>
              MM
            </option>
            {generateMinuteOptions(0, 59)}
          </select>
          {props?.edit && (
            <div className={styles.flits_select_arrow}><RenderSvgString svgString={window?.UnoIcon?.Select}/></div>
          )}
        </div>
      </div>
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
