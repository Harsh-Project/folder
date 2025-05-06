import React from "react";
import styles from "./MyProfileLabel.module.css";

export const MyProfileLabel = (props) => {
  return (
    <label
      className={`${styles.flits_input_label} ${
        props?.edit ? styles.flits_input_label_edit : ""
      }`}
    >
      {props?.label ?? ""}
    </label>
  );
};
