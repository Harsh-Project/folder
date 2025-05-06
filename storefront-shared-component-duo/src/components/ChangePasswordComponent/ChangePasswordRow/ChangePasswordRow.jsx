import styles from "./ChangePasswordRowModule.module.css";
import React from "react";

export const ChangePasswordRow = (props) => {
  return (
    <div className={styles.flits_row}>
      <div
        className={`${styles.flits_col_md_6} ${styles.flits_col_sm_8} ${styles.flits_col_md_offser_3} ${styles.flits_col_sm_offser_2} ${styles.flits_mb_15} ${styles.flits_col_xs_10} ${styles.flits_col_xs_pffset_1}`}
      >
        <div className={`${styles.flits_input_wrap}`}>{props.children}</div>
      </div>
    </div>
  );
};
