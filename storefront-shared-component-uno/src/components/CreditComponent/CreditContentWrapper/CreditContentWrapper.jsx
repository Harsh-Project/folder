import styles from "./CreditContentWrapper.module.css"
import React from "react";

export const CreditContentWrapper = (props) => {
  return <div className={styles.flits_tab_box_body}>{props?.children}</div>;
};
