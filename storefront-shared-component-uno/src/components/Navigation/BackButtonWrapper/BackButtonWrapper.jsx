import styles from "./BackButtonWrapper.module.css";
import React from "react";

export const BackButtonWrapper = (props) => {
  return <div className={styles.flits_tab_box_header}>{props?.children}</div>;
};
