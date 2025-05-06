import React from "react";
import styles from "./FlitsLabel.module.css";

export const FlitsLabel = (props) => {
  return (
    <label className={styles.flits_input_label}>
      {props?.label ?? "label"} {props?.mandatory && <span className={styles.flits_require_sign}>*</span>}
    </label>
  );
};
