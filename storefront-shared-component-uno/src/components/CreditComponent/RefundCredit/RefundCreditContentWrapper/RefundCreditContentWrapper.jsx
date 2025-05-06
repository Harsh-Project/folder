import styles from "./RefundCreditContentWrapper.module.css";
import React from "react";

export const RefundCreditContentWrapper = (props) => {
  return <div className={styles.flits_tab_box_body}>{props?.children}</div>;
};
