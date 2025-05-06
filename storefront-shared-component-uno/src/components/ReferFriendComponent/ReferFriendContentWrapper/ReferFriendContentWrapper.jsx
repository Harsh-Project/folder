import styles from "./ReferFriendContentWrapper.module.css"
import React from "react";

export const ReferFriendContentWrapper = (props) => {
  return (
    <div className={styles.flits_tab_box_body}>
      <div className={styles.flits_refer_friend_content}>{props?.children}</div>
    </div>
  );
};
