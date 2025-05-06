import React from "react";
import styles from "./FlitsInputField.module.css";
import { useState } from "react";

export const FlitsInputField = (props) => {
  const [inputField, setInputField] = useState(props?.value);
  return (
    <input
      name={props?.name}
      className={styles.flits_input_field}
      type={props?.type}
      id={props?.id}
      placeholder={props?.placeholder ?? ""}
      value={inputField}
      disabled={props?.disabled}
      onChange={(e) => {
        props.onValueChange(e.target.value);
        setInputField(e.target.value);
      }}
    />
  );
};
