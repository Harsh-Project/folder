import styles from "./TopOrderAction.module.css";
import React from "react";

export const TopOrderAction = (props) => {
  return (
    <div className={styles.flits_product_action}>
      {props?.children}
    </div>
  );
};
