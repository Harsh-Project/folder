import styles from "./CreditContentWrapperModule.module.css"
import React from "react";

export const CreditContentWrapper = (props) => {
  return <div className={styles.flits_store_credit_container}>{props?.children}</div>;
};
