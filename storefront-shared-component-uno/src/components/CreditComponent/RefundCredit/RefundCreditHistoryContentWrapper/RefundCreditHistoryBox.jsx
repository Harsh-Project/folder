import React from "react";
import styles from "./ReufndCreditHistoryContentWrapper.module.css";

export const RefundCreditHistoryBox = (props) => {
  return (
    <div
      className={`${styles.flits_credit_box} ${styles.flits_history_credit_box}`}
    >
      {props?.children}
    </div>
  );
};
