import styles from "./ChangePasswordContentWrapper.module.css";
import React from "react";

export const ChangePasswordContentWrapper = (props) => {
  return (
    <div className={styles.flits_tab_box_body}>
      <form
        autoComplete="off"
        action="/update_password"
        method="post"
        id="flits-form-change-password"
        className={styles.flits_read_input}
      >
        {props.children}
      </form>
    </div>
  );
};
