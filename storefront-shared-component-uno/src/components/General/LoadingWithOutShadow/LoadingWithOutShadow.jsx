import styles from "./LoadingWithOutShadow.module.css"
import React from "react";

export const LoadingWithOutShadow = () => {
  return (
    <div
      className={`${styles.flits_loading_div} ${styles.flits_loader_template}`}
    >
      <div className={styles.flits_spinner}></div>
      <p className={styles.flits_loading_message}></p>
    </div>
  );
};
