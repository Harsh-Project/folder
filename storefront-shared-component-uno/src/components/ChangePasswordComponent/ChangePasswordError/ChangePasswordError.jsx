import styles from "./ChangePasswordErrorModule.module.css"
import React from "react";

export const ChangePasswordError = ({ errorMessage }) => {
  return (
    <p
      className={`${styles.flits_change_password_error} ${styles.flits_error}`}
    >
      {errorMessage}
    </p>
  );
};
