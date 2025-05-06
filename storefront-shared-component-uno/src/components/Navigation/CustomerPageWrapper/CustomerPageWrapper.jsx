import styles from "./CustomerPageWrapper.module.css";
import React from "react";

export const CustomerPageWrapper = (props) => {
  return (
    <div className={`${styles.flits_account_page_content} flits_uno_template`}>
      <div className={styles.flits_account_page_container}>
        <div className={styles.flits_account_section}>
          {props?.children}
          <div className={styles.flits_clearfix}></div>
        </div>
      </div>
    </div>
  );
};
