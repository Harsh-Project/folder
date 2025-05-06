import styles from "./RecentViewContentWrapperModule.module.css";
import React from "react";

export const RecentViewChildContentWrapper = (props) => {
  return (
    <div
      className={`${styles.flits_box_card} ${styles.flits_wishlist_product_list} ${styles.flits_list}`}
    >
      {props?.children}
    </div>
  );
};
