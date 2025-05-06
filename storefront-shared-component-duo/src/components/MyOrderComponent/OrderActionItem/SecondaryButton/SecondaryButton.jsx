import styles from "./SecondaryButtonModule.module.css"
import React from "react";

export const SecondaryButton = (props) => {
  return (
    <button
      type="button"
      className={`${styles.flits_button} ${styles.flits_secondary_btn} ${styles.flits_mt_10} ${styles.flits_order_details_btn}`}
      onClick={props?.handleShowOrderClick}
    >
      {props?.label}
    </button>
  );
};
