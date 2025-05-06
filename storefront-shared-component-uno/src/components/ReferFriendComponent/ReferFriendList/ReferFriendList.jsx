import styles from "./ReferFriendList.module.css";
import React from "react";

export const ReferFriendList = (props) => {

  return (
    <ul
      className={`${styles.flits_credit_log_list} ${styles.flits_credit_log_header}`}
    >
      {props?.children}
    </ul>
  );
};
