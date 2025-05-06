import styles from "./AddressButtonSectionModule.module.css";
import React from "react";

export const AddressButtonSection = (props) => {
  return (
    <>
      <div
      className={`${styles.flits_col_md_4} ${styles.flits_col_sm_4} ${styles.flits_text_center} ${styles.flits_desktop}`}
    >
      <button
        onClick={props?.handleClick}
        type={props?.type}
        className={`${styles.flits_button} ${styles.flits_primary_btn} ${styles.flits_address_add_save_button}`}
        data-add-text="Save"
        data-update-text="Save"
      >
      {props?.label}
      </button>
    </div>
    <div
      className={`${styles.flits_col_md_12} ${styles.flits_text_center} ${styles.flits_mobile}`}
    >
      <button
        onClick={props?.handleClick}
        type={props?.type}
        className={`${styles.flits_button} ${styles.flits_primary_btn} ${styles.flits_mt_15} ${styles.flits_address_add_save_button}`}
        data-add-text="Save"
        data-update-text="Save"
      >
      {props?.label}
      </button>
    </div>
    </>
  );
};
