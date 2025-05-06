import styles from "./RuleWrapperModule.module.css"
import React from "react";

export const RuleWrapper = (props) => {
  return (
    <div className={`${styles.flits_tab_content}`}>
      <div
        className={`${styles.flits_tab_pane} ${styles.flits_nav_tab_active}`}
      >
        {props?.children}
      </div>
    </div>
  );
};
