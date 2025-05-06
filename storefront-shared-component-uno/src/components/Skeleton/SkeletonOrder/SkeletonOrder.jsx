import styles from "./SkeletonOrder.module.css";
import React from "react";
/* eslint-disable jsx-a11y/anchor-is-valid */

export const SkeletonOrder = () => {
  const count = 3;
  return Array.from({ length: count }, (_, index) => (
    <div>
      <div
        className={`${styles.flits_order_card} ${styles.flits_skeleton_order_card} ${styles.class}`}
      >
        <div
          className={`${styles.flits_order_row} ${styles.flits_order_status_row}`}
        >
          <div className={styles.flits_order_row}>
            <div className={styles.flits_skeleton_order_box}></div>
          </div>
          <div className={styles.flits_order_row}>
            <div className={styles.flits_skeleton_order_box}></div>
          </div>
        </div>
        <div
          className={`${styles.flits_order_row} ${styles.flits_order_detail_row}`}
        >
          <div>
            <div className={styles.flits_order_row}>
              <div className={styles.flits_skeleton_order_box}></div>
            </div>
            <div className={styles.flits_order_row}>
              <div className={styles.flits_skeleton_order_box}></div>
            </div>
          </div>
          <div className={styles.flits_text_right}>
            <div className={styles.flits_order_row}>
              <div className={styles.flits_skeleton_order_box}></div>
            </div>
            <div className={styles.flits_order_row}>
              <div className={styles.flits_skeleton_order_box}></div>
            </div>
          </div>
        </div>
        <div
          className={`${styles.flits_order_row} ${styles.flits_line_items_row}`}
        >
          <div className={styles.flits_order_item_row}>
            <div className={styles.flits_order_item}>
              <div className={styles.flits_item_img}>
                <div className={styles.flits_skeleton_order_box}></div>
              </div>

              <div
                className={`${styles.flits_item_details} ${styles.flits_left}`}
              >
                <a
                  className={`${styles.flits_link} ${styles.flits_item_title}`}
                >
                  <div className={styles.flits_skeleton_order_box}></div>
                </a>
                <p className={styles.flits_item_price}>
                  <div className={styles.flits_skeleton_order_box}></div>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));
};
