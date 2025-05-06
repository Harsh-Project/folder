import styles from "./HowToSpentContainerWrapperModule.module.css";
import React from "react";

export const HowToSpentContainerWrapper = (props) => {
  return (
    <div className={`${styles.flits_container_box} ${styles.flits_mt_25}`}>
      <div
        className={`${styles.flits_container_box} ${styles.flits_how_to_spend_inner_container}`}
      >
        {props?.children}
      </div>
    </div>
  );
};
