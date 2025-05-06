import React from "react";
import styles from "./NavigationRouteWraperModule.module.css";

export const NavigationRouteWraper = (props) => {
  return <div className={styles.flits_account_body}>{props?.children}</div>;
};
