import styles from "./MyProfileRowWrapperModule.module.css"
import React from "react";

export const MyProfileRowWrapper = (props) => {
  return <div className={styles.flits_row}>{props?.children}</div>;
};
