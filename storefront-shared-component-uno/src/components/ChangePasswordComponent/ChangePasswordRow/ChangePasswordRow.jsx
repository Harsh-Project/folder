import styles from "./ChangePasswordRow.module.css";
import React from "react";

export const ChangePasswordRow = (props) => {
  return (
    <div className={styles.flits_row}>
      <div className={`${styles.flits_col_md_6} ${styles.flits_mb_15}`}>
        <div
          className={`${styles.flits_input_wrap}`}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
};
