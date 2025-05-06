import styles from "./MyProfileCustomRowModule.module.css";
import React from "react";

export const MyProfileCustomRow = (props) => {
  const { index } = props;
  return (
    <div className={`${styles.flits_row} ${styles.customer_custom_field_row}`}>
      <div
        className={`${styles.flits_col_md_6} ${styles.flits_col_sm_6} `}
      >
        <div id={index} data-unique-id={index} set-height-mobile={index} className={`${styles.flits_input_wrap} flits-input-wrap`}>
          {props.children}
        </div>
      </div>
    </div>
  );
};
