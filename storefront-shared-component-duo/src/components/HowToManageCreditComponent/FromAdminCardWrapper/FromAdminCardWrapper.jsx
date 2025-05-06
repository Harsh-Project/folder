import styles from "./FromAdminCardWrapperModule.module.css";
import React from "react";

export const FromAdminCardWrapper = (props) => {
  return (
    <>
      <div className={styles.flits_container_box}>
        <div
          className={`${styles.flits_box_card} ${styles.flits_rules_card_list} ${styles.flits_p_0}`}
        >
          <div
            className={`${styles.flits_rules_card} ${styles.flits_d_flex} ${styles.flits_flex_wrap} ${styles.flits_p_20} ${styles.flits_pr_10} ${styles.flits_pb_10}`}
          >
            {props?.children}
          </div>
        </div>
      </div>
      <div className={`${styles.flits_mobile_container_box} ${styles.flits_mt_25}`}>
        <div
          className={styles.flits_rules_card_list}
        >
          <div
            className={`${styles.flits_rules_card} ${styles.flits_align_items_stretch} ${styles.flits_d_flex} ${styles.flits_flex_wrap} ${styles.flits_p_20} ${styles.flits_pr_10} ${styles.flits_pb_10}`}
          >
            {props?.children}
          </div>
        </div>
      </div>
    </>
  );
};
