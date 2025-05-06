import styles from "./HowToManageCreditContentWrapperModule.module.css";
import React from "react";

export const HowToManageCreditContentWrapper = (props) => {
  return (
    <div className={styles.flits_tab_box_body}>
      <div className={styles.flits_how_to_manage_container}>
        {props?.children}
      </div>
    </div>
  );
};
