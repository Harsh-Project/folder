import React from "react";
import styles from "./ChangePasswordLabel.module.css";

export const ChangePasswordLabel = (props) => {
  return (
    <label
      className={`${styles.flits_input_label}`}
    >
      {props?.label ?? ""}
    </label>
  );
};
