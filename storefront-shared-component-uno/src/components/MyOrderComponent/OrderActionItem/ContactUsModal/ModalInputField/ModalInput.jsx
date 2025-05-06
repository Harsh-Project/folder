import styles from "./ModalInputField.module.css";
import React, { useState } from "react";
export const ModalInput = (props) => {
  const [value, setValue] = useState(props?.value);

  const handleValue = (e) => {
    setValue(e.target.value);
    props?.onClickEvent(e.target.value);
  };
  return (
    <div className={styles.flits_input_icon_group}>
      <div className={styles.flits_input_icon}>{props?.svg}</div>
      <input
        type={props?.type}
        className={`${styles.flits_input} ${styles.flits_form_first_name}`}
        id={props?.id}
        placeholder={props?.placeholder}
        name={props?.name}
        onChange={handleValue}
        value={value}
      ></input>
    </div>
  );
};
