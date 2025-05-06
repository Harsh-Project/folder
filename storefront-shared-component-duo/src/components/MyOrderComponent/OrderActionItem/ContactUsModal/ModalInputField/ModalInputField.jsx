import React, { Suspense } from "react";
import styles from "./ModalInputFieldModule.module.css";
import { FlitsLabel } from "../../../../Form/FlitsLabel/FlitsLabel";
import { ModalInput } from "./ModalInput"

export const ModalInputField = (props) => {
  return (
    <div
      className={`${styles.flits_col_sm_6} ${styles.flits_col_md_6} ${
        styles.flits_popup_mb_15
      } ${props?.valueId === "email" ? styles.flits_col_sm_12 : ""} ${
        props?.valueId === "link" ? styles.flits_adjust_width : ""
      }`}
    >
      <div
        className={`${styles.flits_input_wrap} ${styles.flits_input_icon_wrap}`}
      >
        <Suspense fallback={<></>}>
          <FlitsLabel {...props} />
          <ModalInput {...props} />
        </Suspense>
      </div>
      {props?.error && props?.error?.length > 0 && (
        <small className={styles.flits_form_alert}>
          <span className={styles.flits_error_icon}></span>
          {props?.error}
        </small>
      )}
    </div>
  );
};
