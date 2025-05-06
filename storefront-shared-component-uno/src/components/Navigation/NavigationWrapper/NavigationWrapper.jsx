import React from "react";
import styles from "./NavigationWrapper.module.css";

export const NavigationWrapper = (props) => {
  return (
    <div className={`${styles.flits_account_page_nav} flits-account-page-nav`}>
      <div className={`${styles.flits_nav_tabs} flits-nav-tabs`}>{props.children}</div>
    </div>
  );
};
