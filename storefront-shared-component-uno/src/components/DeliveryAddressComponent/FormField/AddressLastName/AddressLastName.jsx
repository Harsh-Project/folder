import styles from "./AddressLastName.module.css";
import React from "react";

export const AddressLastName = (props) => {
  return (
    <div className={`${styles.flits_col_md_6} ${styles.flits_mb_15}`}>
      <div className={styles.flits_input_wrap}>
      {props?.children}
        <input
          type={props?.type}
          className={styles.flits_input}
          name="address[last_name]"
          value={props?.value}
          id="AddressLastNameNew"
          onChange={props?.handleChange}
          maxLength={255}
        ></input>
      </div>
    </div>
  );
};
