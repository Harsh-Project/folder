import styles from "./AddressLine2.module.css";
import React from "react";

export const AddressLine2 = (props) => {
  return (
    <div className={`${styles.flits_col_md_12} ${styles.flits_mb_15}`}>
      <div className={styles.flits_input_wrap}>
        {props?.children}
        <input
          type={props?.type}
          className={styles.flits_input}
          name={props?.name}
          value={props?.value}
          id={props?.id}
          onChange={props?.handleChange}
          maxLength={255}
        ></input>
      </div>
    </div>
  );
};
