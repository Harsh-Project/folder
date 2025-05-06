import styles from "./CreditDetailedSectionModule.module.css";
import React from "react";

export const CreditDetailed = (props) => {
  return (
    <div className={styles.flits_credit_dropdown_contain}>
      {props?.children}
    </div>
  );
};
