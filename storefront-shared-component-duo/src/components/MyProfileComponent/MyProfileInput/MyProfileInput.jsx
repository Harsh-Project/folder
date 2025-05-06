import styles from "./MyProfileInputModule.module.css";
import React from "react";

export const MyProfileInput = (props) => {
  return (
    <input
      type={props?.type}
      className={`${styles.flits_input} ${props?.edit ? styles.flits_mobile_edit : ""}`}
      placeholder={props?.placeholder ?? ""}
      name={props?.name ?? ""}
      value={props?.value}
      onChange={(e) => {
        props.onValueChange(e.target.value);
      }}
      disabled={props?.disabled}
      readOnly={props?.readOnly ?? false}
    />
  );
};

