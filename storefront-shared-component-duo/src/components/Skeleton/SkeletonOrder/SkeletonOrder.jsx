import styles from "./SkeletonOrderModule.module.css";
import React from "react";

export const SkeletonOrder = () => {
  const count = 1;
  return Array.from({ length: count }, (_, index) => (
    <div
      key={index}
      className={`${styles.flits_order_card} ${styles.flits_skeleton_order_card}`}
    >
      <div className={styles.flits_order_details}>
        <div className={styles.flits_order_information}>
          <div className={styles.flits_order_information_row}>
            <div className={styles.flits_skeleton_order_box}></div>
            <div className={styles.flits_skeleton_order_box}></div>
            <div className={styles.flits_skeleton_order_box}></div>
          </div>
        </div>
        <div className={styles.flits_order_actions}>
          <div className={styles.flits_order_button_grp}>
            <div className={styles.flits_skeleton_order_box}></div>
            <div className={styles.flits_skeleton_order_box}></div>
          </div>
        </div>
      </div>
      <div className={styles.flits_grand_total}>
        <div className={styles.flits_skeleton_order_box}></div>
        <div className={styles.flits_skeleton_order_box}></div>
      </div>
    </div>
  ));
};
