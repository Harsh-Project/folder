import React from "react";
import styles from "./MyProfileLabelModule.module.css";

export const MyProfileLabel = (props) => {
  return (
    <label
      className={`${styles.flits_input_label} ${props?.wrapText ? styles.flits_wrap_text : ""} ${props?.edit ? styles.flits_mobile : ""}`}
    >
      {props?.label ?? ""}
    </label>
  );
};
