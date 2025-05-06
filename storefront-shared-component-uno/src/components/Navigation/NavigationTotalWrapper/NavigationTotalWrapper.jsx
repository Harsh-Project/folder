import styles from "./NavigationTotalWrapper.module.css";
import React from "react";

export const NavigationTotalWrapper = (props) => {
  return <div className={`${styles.flits_tab_box} flits-tab-box flits-active`}>{props?.children}</div>;
};
