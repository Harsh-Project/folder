import styles from "./MyProfileRow.module.css";
import React from "react";

export const MyProfileRow = (props) => {
  return (
    <div className={styles.flits_row}>
      <div className={`${styles.flits_col_md_6} ${styles.flits_mb_15}`}>
        <div
          className={`${styles.flits_input_wrap} ${
            !props?.edit ? styles.flits_read_input : ""
          } ${props?.edit ? styles.flits_width : ""}`}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
};
