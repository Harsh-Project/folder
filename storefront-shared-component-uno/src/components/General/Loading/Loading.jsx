import styles from "./Loading.module.css"
import React from "react";

export const Loading = (props) => {
  return (
    <div
      className={`${styles.flits_loading_div} ${styles.flits_loader_template}`}
      style={{position: props?.position} ?? {}}
    >
      <div className={styles.flits_spinner}></div>
      <p className={styles.flits_loading_message}></p>
    </div>
  );
};
