import styles from "./RefundCreditDetailedSectionModule.module.css";
import React from "react";

export const RefundCreditDetailed = (props) => {
  return (
    <div className={styles.flits_credit_dropdown_contain}>
      {props?.children}
    </div>
  );
};
