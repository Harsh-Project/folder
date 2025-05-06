import React, { Suspense } from "react";
import styles from "./ModalMessageModule.module.css";
import { FlitsLabel } from "../../../../../Form/FlitsLabel/FlitsLabel"

export const ModalMessage = (props) => {
  const handleChange = (e) => {
    props?.onClickEvent(e);
  };
  return (
    <div className={`${styles.flits_col_md_12} ${styles.flits_popup_mb_15}`}>
      <div className={styles.flits_input_wrap}>
        <Suspense fallback={<></>}>
          <FlitsLabel {...props} />
        </Suspense>
        <textarea
          rows="5"
          maxLength="250"
          value={props?.messageForm}
          onChange={handleChange}
          className={`${styles.flits_form_message} ${
            props?.messageError && props?.messageError?.length > 0
              ? styles.flits_input_error
              : ""
          }`}
          id={props?.id}
          placeholder={props?.placeholder}
          name={props?.name}
        ></textarea>
        <span id="flits-msg-count" className={styles.flits_text_count}>
          {`${props?.messageForm?.length} / 250`}
        </span>
      </div>
      {props?.messageError && props?.messageError?.length > 0 && (
        <small className={styles.flits_form_alert}>
          <span className={styles.flits_error_icon}></span>
          {props?.messageError}
        </small>
      )}
    </div>
  );
};
