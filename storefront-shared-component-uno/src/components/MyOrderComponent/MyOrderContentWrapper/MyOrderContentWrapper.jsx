import styles from "./MyOrderContentWrapper.module.css";
import React from "react";

export const MyOrderContentWrapper = (props) => {
  return (
    <div className={styles.flits_tab_box_body}>
      <div className={styles.flits_order_list_container}>
        {props?.children}
      </div>
    </div>
  );
};
