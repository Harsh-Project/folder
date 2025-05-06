import styles from "./RefundCreditContentWrapperModule.module.css";
import React from "react";

export const RefundCreditContentWrapper = (props) => {
  return (
    <div className={styles.flits_store_credit_container}>{props?.children}</div>
  );
};
