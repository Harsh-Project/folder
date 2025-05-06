import React from "react";
import styles from "./CreditTotalBoxWrapperModule.module.css";

export const CreditTotalBoxWrapper = (props) => {
  return (
    <div
      className={`${styles.flits_col_xs_12} ${styles.flits_col_sm_4} ${styles.flits_col_md_4} ${styles.flits_col_lg_4} ${styles.flits_mb_10} ${styles.flits_text_center}`}
    >
      <div
        className={`${styles.flits_credit_box} ${styles.flits_earn_credit_box}`}
      >
        {props.children}
      </div>
    </div>
  );
};
