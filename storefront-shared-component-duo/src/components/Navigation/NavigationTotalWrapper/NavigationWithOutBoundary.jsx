import styles from "./NavigationTotalWrapperModule.module.css";
import React from "react";

export const NavigationWithOutBoundary = (props) => {
  return (
    <div
      className={`${styles.flits_account_box} ${styles.flits_account_box_active} ${props?.boundary ? styles.flits_get : ""}`}
    >
      {props?.children}
    </div>
  );
};
