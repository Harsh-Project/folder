import styles from "./AddressCity.module.css";
import React from "react";

export const AddressCity = (props) => {
  return (
    <div className={`${styles.flits_col_md_4} ${styles.flits_mb_15}`}>
      <div className={styles.flits_input_wrap}>
      {props?.children}
        <input
          type="text"
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
