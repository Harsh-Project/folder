import styles from "./DefaultSection.module.css"
import React from "react";

export const DefaultSection = (props) => {
  return (
    <div
      className={`${styles.flits_address_list} ${styles.flits_address_list_static_row}`}
    >{props?.children}</div>
  );
};
