import React from "react";
import styles from "./NavigationRouteWraper.module.css";

export const NavigationRouteWraper = (props) => {
  return (
    <div className={styles.flits_page_tabs}>
      <div className={`${styles.flits_tabs_box} flits-tabs-box`}>{props?.children}</div>
    </div>
  );
};
