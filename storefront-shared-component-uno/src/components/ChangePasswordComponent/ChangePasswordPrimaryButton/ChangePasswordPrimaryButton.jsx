import React from "react";
import styles from "./ChangePasswordPrimaryButton.module.css";

export const ChangePasswordPrimaryButton = (props) => {
  return (
    <button
      className={styles.flits_primary_button}
      type={props?.type}
      onClick={props?.onClickEvent}
      name={props?.name ?? ""}
    >
      {props?.label}
    </button>
  );
};
