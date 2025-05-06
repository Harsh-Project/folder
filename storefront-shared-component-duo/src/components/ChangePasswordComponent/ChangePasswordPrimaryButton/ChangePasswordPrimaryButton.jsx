import React from "react";
import styles from "./ChangePasswordPrimaryButtonModule.module.css";

export const ChangePasswordPrimaryButton = (props) => {
  return (
    <div className={styles.flits_row}>
      <div
        className={`${styles.flits_col_xs_12} ${styles.flits_mb_15} ${styles.flits_text_center} ${styles.flits_col_xs_10} ${styles.flits_col_xs_pffset_1}`}
      >
        <button
          className={`${styles.flits_button} ${styles.flits_primary_btn} ${styles.flits_change_pass_button} ${styles.flits_ml_0}`}
          type={props?.type}
          onClick={props?.onClickEvent}
          name={props?.name ?? ""}
        >
          {props?.label}
        </button>
      </div>
    </div>
  );
};
