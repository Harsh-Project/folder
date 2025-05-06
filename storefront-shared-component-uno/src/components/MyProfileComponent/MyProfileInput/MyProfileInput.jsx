import styles from "./MyProfileInput.module.css";
import React from "react";

export const MyProfileInput = (props) => {
  return (
    <input
      type={props?.type}
      className={`${styles.flits_input} ${
        props?.edit ? styles.flits_input_edit_mode : ""
      }`}
      placeholder={props?.placeholder ?? ""}
      name={props?.name ?? ""}
      value={props?.value}
      onChange={(e) => {
        props.onValueChange(e.target.value);
      }}
      readOnly={props?.readOnly ?? false}
    />
  );
};

