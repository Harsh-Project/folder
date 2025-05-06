import styles from "./MyProfileButtonWrapper.module.css";
import React from "react";

export const MyProfileButtonWrapper = (props) => {
  return (
    <div className={styles.flits_button_grp}>
      <div className={`${styles.flits_row} ${styles.flits_text_left}`}>
        <div className={styles.flits_col_md_12}>{props?.children}</div>
      </div>
    </div>
  );
};

export default MyProfileButtonWrapper;
