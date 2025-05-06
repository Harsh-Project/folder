import styles from "./LoadingModule.module.css"
import React from "react";

export const Loading = () => {
  return (
    <div
      className={`${styles.flits_loading_div} ${styles.flits_loader_template}`}
    >
      <div className={styles.flits_spinner}></div>
      <p className={styles.flits_loading_text}></p>
    </div>
  );
};
