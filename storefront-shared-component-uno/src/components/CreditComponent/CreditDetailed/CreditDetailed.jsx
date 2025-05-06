import styles from "./CreditDetailed.module.css";
import React from "react";

export const CreditDetailed = (props) => {
  return (
    <div className={styles.flits_credit_details}>
      {props?.children}
    </div>
  );
};
