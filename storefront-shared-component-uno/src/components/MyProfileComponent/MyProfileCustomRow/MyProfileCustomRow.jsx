import styles from "./MyProfileCustomRow.module.css";
import React from "react";

export const MyProfileCustomRow = (props) => {
  return (
    <div className={styles.flits_row}>
      <div className={`${styles.flits_col_md_6} ${styles.flits_col_sm_6} ${styles.flits_mb_15}`}>
        <div
          className={`${styles.flits_input_wrap} ${
            !props?.edit ? styles.flits_read_input : ""
          }`}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
};
