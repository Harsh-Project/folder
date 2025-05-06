import styles from "./HowItWork.module.css";
import React from "react";

export const HowItWork = ({ img, message }) => {
  return (
    <div
      className={`${styles.flits_col_12} ${styles.flits_col_xs_12} ${styles.flits_col_md_4} ${styles.flits_col_lg_4} ${styles.flits_text_center} ${styles.flits_mb_5}`}
    >
      <img alt="img" className={styles.flits_icon_size_25} src={img} />
      <p>{message}</p>
    </div>
  );
};
