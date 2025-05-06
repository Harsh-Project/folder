import styles from "./TopOrderProductContentWrapper.module.css";
import React from "react";

export const TopOrderProductContentWrapper = (props) => {
  return (
    <div className={styles.flits_tab_box_body}>
      <div className={`${styles.flits_top_order_list_div}`}>
        {props.children}
        <div className={styles.flits_clearfix}></div>
      </div>
    </div>
  );
};
