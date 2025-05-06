import styles from "./MyProfileContentWrapperModule.module.css";
import React from "react";

export const MyProfileContentWrapper = (props) => {
  return (
      <form
        action="/profile_save"
        autoComplete="off"
        id="flits_form_profile"
        className={styles.flits_read_input}
      >
        {props.children}
      </form>
  );
};
