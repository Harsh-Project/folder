import styles from "./MyProfileContentWrapper.module.css";
import React from "react";

export const MyProfileContentWrapper = (props) => {
  return (
    <div className={styles.flits_tab_box_body}>
      <form
        action="/profile_save"
        autoComplete="off"
        id="flits_form_profile"
        className={styles.flits_read_input}
      >
        {props.children}
      </form>
    </div>
  );
};
