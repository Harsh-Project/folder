import styles from "./MarkDefaultModule.module.css";
import React from "react";

export const MarkDefault = (props) => {
  return (
    <>
      <div
      className={`${styles.flits_col_md_8} ${styles.flits_col_sm_8} ${styles.flits_address_default_checkbox_row} ${styles.flits_desktop}`}
    >
      <div
        className={`${styles.flits_input_row} ${!props?.needMark ? styles.flits_none : ""}`}
      >
        <input
          onChange={props?.handleChange}
          type={props?.type}
          className={styles.flits_input}
          name={props?.name}
          value={props?.value}
          checked={props?.value}
          id={props?.id}
        ></input>
        <label
          className={styles.flits_input_label}
          for={props?.id}
        >
          {props?.label}
        </label>
      </div>
    </div>
    <div
      className={`${styles.flits_col_xs_12} ${styles.flits_mt_15} ${styles.flits_address_default_checkbox_row} ${styles.flits_mobile}`}
    >
      <div
        className={`${styles.flits_input_row} ${!props?.needMark ? styles.flits_none : ""}`}
      >
        <input
          onChange={props?.handleChange}
          type={props?.type}
          className={styles.flits_input}
          name={props?.name}
          value={props?.value}
          checked={props?.value}
          id={props?.id}
        ></input>
        <label
          className={styles.flits_input_label}
          for={props?.id}
        >
          {props?.label}
        </label>
      </div>
    </div>
    </>
  );
};
