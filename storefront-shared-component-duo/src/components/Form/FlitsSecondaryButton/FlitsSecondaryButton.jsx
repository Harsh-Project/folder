import React from "react";
import styles from "./FlitsSecondaryButtonModule.module.css";

export const FlitsSecondaryButton = (props) => {
  return (
    <button
      className={styles.flits_secondary_button}
      type={props?.type}
      onClick={props?.onClickEvent}
      name={props?.name ?? ""}
    >
      {props?.label}
    </button>
  );
};
