import styles from "./MyProfileRowModule.module.css";
import React from "react";

export const MyProfileRow = (props) => {
  return (
    <div className={`${styles.flits_col_md_6} ${styles.flits_col_sm_6} ${!props?.notNeedMB ? styles.flits_mb_15 : ""} ${props?.needmt ? styles.flits_mt_15 : ""}`}>
      <div
        className={styles.flits_input_wrap}
      >
        {props.children}
      </div>
    </div>
  );
};
