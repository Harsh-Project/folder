import styles from "./CustomerPageGreeting.module.css";
import React from "react";

export const CustomerPageGreeting = (props) => {
  return (
    <div className={`${styles.flits_account_page_header} flits_account_page_header`}>
      <div className={`${styles.flits_header_title} flits_greeting_header_title`}>
        <p className={`${styles.flits_h1} flits_customer_greeting_name`}>{props?.children}</p>
      </div>
    </div>
  );
};
