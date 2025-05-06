import styles from "./CustomerPageWrapperModule.module.css";
import React from "react";

export const CustomerPageWrapper = (props) => {
  return (
    <div className={`${styles.flits_account_container} flits_duo_template`}>
        <div className={`${styles.flits_account_section} ${styles.flits_desktop_view}`}>
          {props?.children}
          <div className={styles.flits_clearfix}></div>
        </div>
    </div>
  );
};
