import { RenderSvgString } from "../../General/RenderSvgString";
import styles from "./MyProfileCustomDateField.module.css";
import React from "react";

export const MyProfileCustomDateField = (props) => {
  const handleYearChange = (e) => {
    const cleanedValue = e.target.value;
    props.onValueChange({ year: cleanedValue, month: props?.value?.month, day:props?.value?.day  });
  };

  const handleMonthChange = (e) => {
    const cleanedValue = e.target.value;
    props.onValueChange({ year:props?.value?.year, month: cleanedValue, day:props?.value?.day });
  };

  const handleDayChange = (e) => {
    const cleanedValue = e.target.value;
    props.onValueChange({ year: props?.value?.year,month: props?.value?.month, day: cleanedValue });
  };
  function generateYearOptions(startYear, endYear) {
    const options = [];
    for (let year = startYear; year <= endYear; year++) {
      year = year < 10 ? '0' + year : year;
      options.push(
        <option key={year} value={year}>
          {year}
        </option>
      );
    }
    return options;
  }

  function generateMonthOptions(startMonth, endMonth) {
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

  function generateDayOptions(startDay, endDay) {
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
        <div className={`${styles.flits_select_row} ${styles.flits_yy_select}`}>
          <select
            disabled={props?.disabled}
            name={`${props?.name}[year]`}
            required="required"
            value={props?.value?.year ?? null}
            className={`${styles.flits_input} ${styles.year} ${
              styles.customer_custom_field_value_input
            } ${props?.edit ? styles.flits_input_edit_mode : ""}`}
            onChange={handleYearChange}
          >
            <option value="YYYY" disabled={true}>
              YYYY
            </option>
            {generateYearOptions(1920, new Date().getFullYear())}
          </select>
          {props?.edit && (
            <div className={styles.flits_select_arrow}><RenderSvgString svgString={window?.UnoIcon?.Select} 
/></div>
          )}
        </div>
        <div
          className={`${styles.flits_select_row} ${styles.flits_mm_select} ${styles.flits_mx_10}`}
        >
          <select
            disabled={props?.disabled}
            name={`${props?.name}[month]`}
            value={props?.value?.month ?? null}
            required="required"
            className={`${styles.flits_input} ${styles.month} ${
              styles.customer_custom_field_value_input
            } ${props?.edit ? styles.flits_input_edit_mode : ""}`}
            onChange={handleMonthChange}
          >
            <option value="MM" disabled={true}>
              MM
            </option>
            {generateMonthOptions(1, 12)}
          </select>
          {props?.edit && (
            <div className={styles.flits_select_arrow}><RenderSvgString svgString={window?.UnoIcon?.Select} 
/></div>
          )}
        </div>
        <div className={`${styles.flits_select_row} ${styles.flits_dd_select}`}>
          <select
            disabled={props?.disabled}
            name={`${props?.name}[day]`}
            value={props?.value?.day ?? null}
            required="required"
            className={`${styles.flits_input} ${styles.day} ${
              styles.customer_custom_field_value_input
            } ${props?.edit ? styles.flits_input_edit_mode : ""}`}
            onChange={handleDayChange}
          >
            <option value="DD" disabled={true}>
              DD
            </option>
            {generateDayOptions(1, 31)}
          </select>
          {props?.edit && (
            <div className={styles.flits_select_arrow}><RenderSvgString svgString={window?.UnoIcon?.Select} 
/></div>
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
            <RenderSvgString svgString={window?.UnoIcon?.Description} 
/>
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
