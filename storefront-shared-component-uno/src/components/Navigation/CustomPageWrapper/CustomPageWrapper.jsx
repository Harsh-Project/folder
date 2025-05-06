import styles from "./CustomPageWrapper.module.css";
import React from "react";

export const CustomPageWrapper = (props) => {
  return <div className={styles.flits_tab_box_body}>{props.children}</div>;
};
