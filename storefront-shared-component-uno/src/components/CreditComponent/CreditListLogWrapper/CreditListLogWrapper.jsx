import styles from "./CreditListLogWrapper.module.css"
import React from "react";

export const CreditListLogWrapper = (props) => {
  return (
    <ul
      className={`${styles.flits_credit_log_list} ${styles.flits_store_credit_log_list}`}
    >
        {props?.children}
    </ul>
  );
};
