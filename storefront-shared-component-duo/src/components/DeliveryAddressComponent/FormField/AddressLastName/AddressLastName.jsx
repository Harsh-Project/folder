import styles from "./AddressLastNameModule.module.css";
import React from "react";

export const AddressLastName = (props) => {
  return (
    <>
      <div
      className={`${styles.flits_col_md_6} ${styles.flits_col_sm_6} ${styles.flits_mb_15} ${styles.flits_desktop}`}
    >
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
    <div
      className={`${styles.flits_col_xs_12} ${styles.flits_px_0} ${styles.flits_mobile}`}
    >
      <div className={styles.flits_input_wrap}>
        <input
          type={props?.type}
          className={styles.flits_input}
          placeholder={props?.placeholder}
          name="address[last_name]"
          value={props?.value}
          id="AddressLastNameNew"
          onChange={props?.handleChange}
          maxLength={255}
        ></input>
      </div>
    </div>
    </>
  );
};
