import styles from "./CreditTotalWrapper.module.css";
import React from "react";

export const CreditTotalWrapper = (props) => {
  return (
    <div className={styles.flits_store_credit_balance}>
      <div className={styles.flits_row}>{props?.children}</div>
    </div>
  );
};
