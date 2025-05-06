import styles from "./DeliveryAddressContentWrapper.module.css";
import React from "react";

export const DeliveryAddressContentWrapper = (props) => {
  return (
    <div className={styles.flits_tab_box_body}>
      <div className={styles.flits_address_display_container}>
        {props.children}
        <div className={styles.flits_clearfix}></div>
      </div>
    </div>
  );
};
