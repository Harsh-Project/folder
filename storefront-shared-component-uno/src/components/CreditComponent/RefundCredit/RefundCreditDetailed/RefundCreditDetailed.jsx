import styles from "./RefundCreditDetailed.module.css";
import React from "react";

export const RefundCreditDetailed = (props) => {
  return <div className={styles.flits_credit_details}>{props?.children}</div>;
};
