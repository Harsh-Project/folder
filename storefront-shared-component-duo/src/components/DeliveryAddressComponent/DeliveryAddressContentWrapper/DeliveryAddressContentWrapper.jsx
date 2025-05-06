import styles from "./DeliveryAddressContentWrapperModule.module.css";
import React from "react";

export const DeliveryAddressContentWrapper = (props) => {
  return (
    <div className={styles.flits_address_list_container}>
      {props.children}
      <div className={styles.flits_clearfix}></div>
    </div>
  );
};
