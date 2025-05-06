import React from "react";
import styles from "./CustomerAccountPageWrapper.module.css";

export const CustomerAccountPageWrapper = ({ children }) => {
  return (
    <div className={styles.flits_customer_account_page_router_wrapper}>
      {children}
    </div>
  );
};
