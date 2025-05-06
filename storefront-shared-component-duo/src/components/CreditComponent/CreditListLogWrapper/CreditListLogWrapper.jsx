import styles from "./CreditListLogWrapperModule.module.css";
import React from "react";

export const CreditListLogWrapper = (props) => {
  return (
    <div className={`${styles.flits_credit_table_body} ${styles.list}`}>
      {props?.children}
    </div>
  );
};
