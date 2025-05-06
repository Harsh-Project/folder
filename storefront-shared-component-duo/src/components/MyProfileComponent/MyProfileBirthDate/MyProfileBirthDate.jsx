import styles from "./MyProfileBirthDateModule.module.css";
import React from "react";
import { RenderSvgString } from '../../General/RenderSvgString';

export const MyProfileBirthDate = (props) => {
  function generateYearOptions(startYear, endYear) {
    const options = [];
    for (let year = startYear; year <= endYear; year++) {
      year = year < 10 ? "0" + year : year;
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
      month = month < 10 ? "0" + month : month;
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
      day = day < 10 ? "0" + day : day;
      options.push(
        <option key={day} value={day}>
          {day}
        </option>
      );
    }
    return options;
  }

  const handleYearChange = (e) => {
    const cleanedValue = e.target.value;
    props.onValueChange({
      ...props?.value,
      year: cleanedValue,
      // month: new Date(props?.value).getMonth() + 1 || props?.value?.month || "",
      // day: new Date(props?.value).getDate() || props?.value?.day || "",
    });
  };

  const handleMonthChange = (e) => {
    const cleanedValue = e.target.value;
    props.onValueChange({
      ...props?.value,
      month: cleanedValue,
      // day: new Date(props?.value).getDate() || props?.value?.day || "",
      // year: new Date(props?.value).getFullYear() || props?.value?.year || "",
    });
  };

  const handleDayChange = (e) => {
    const cleanedValue = e.target.value;
    props.onValueChange({
      ...props?.value,
      // year: new Date(props?.value).getFullYear() || props?.value?.year || "",
      // month: new Date(props?.value).getMonth() + 1 || props?.value?.month || "",
      day: cleanedValue,
    });
  };
  return (
    <div className={styles.flits_dob_wrap}>
      <div className={`${styles.flits_select_row} ${styles.flits_dd_select} ${props?.edit ? styles.flits_select_edit : ""}`}>
        <select
          className={styles.flits_input}
          disabled={props?.disabled}
          defaultValue={props?.value?.day}
          onChange={handleDayChange}
          value={(props?.value?.length > 0 && new Date(props?.value).getDate()) || props?.value?.day}
          name={props?.name}
        >
          <option value="DD" disabled={true}>
            DD
          </option>
          {generateDayOptions(1, 31)}
        </select>
        {props?.edit && (
          <div className={styles.flits_select_arrow}><RenderSvgString svgString={window?.DuoIcon?.Select} /></div>
        )}
      </div>
      <div className={`${styles.flits_select_row} ${styles.flits_mm_select} ${styles.flits_mx_10} ${props?.edit ? styles.flits_select_edit : ""}`}>
        <select
          value={
            (props?.value?.length > 0 && new Date(props?.value).getMonth() + 1) || props?.value?.month
          }
          onChange={handleMonthChange}
          className={styles.flits_input}
          disabled={props?.disabled}
          name={props?.name}
          defaultValue={props?.value?.month}
        >
          <option value="MM" disabled={true}>
            MM
          </option>
          {generateMonthOptions(1, 12)}
        </select>
        {props?.edit && (
          <div className={styles.flits_select_arrow}><RenderSvgString svgString={window?.DuoIcon?.Select} /></div>
        )}
      </div>
      <div className={`${styles.flits_select_row} ${styles.flits_yy_select}`}>
        <select
          className={styles.flits_input}
          disabled={props?.disabled}
          defaultValue={props?.value?.year}
          onChange={handleYearChange}
          value={
            (props?.value?.length > 0 && new Date(props?.value).getFullYear()) || props?.value?.year
          }
          name={props?.name}
        >
          <option value="YYYY" disabled={true}>
            YYYY
          </option>
          {generateYearOptions(1920, new Date().getFullYear())}
        </select>
        {props?.edit && (
          <div className={styles.flits_select_arrow}><RenderSvgString svgString={window?.DuoIcon?.Select} /></div>
        )}
      </div>
    </div>
  );
};
