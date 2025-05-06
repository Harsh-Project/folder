import styles from "./TopOrderListWrapperModule.module.css";
import React from "react";

export const TopOrderListWrapper = (props) => {
  return (
    <>
      <div className={`${styles.flits_top_order_list_container} ${styles.flits_desktop}`}>
        <div className={`${styles.flits_top_order_list} ${styles.flits_list}`}>
          {props?.children}
        </div>
      </div>
      <div className={styles.flits_mobile_container_box}>
        <div className={styles.flits_top_order_list_container}>
          <div
            className={`${styles.flits_top_order_list} ${styles.flits_list}`}
          >
            {props?.children}
          </div>
        </div>
      </div>
    </>
  );
};
