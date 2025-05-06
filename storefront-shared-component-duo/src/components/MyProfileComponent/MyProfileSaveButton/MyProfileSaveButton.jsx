import styles from "./MyProfileSaveButtonModule.module.css"
import React from "react";

export const MyProfileSaveButton = (props) => {
  const handleSaveClick = () => {
    props?.onClickEvent()
  }
  return (
    <div className={styles.flits_edit_form_btn_grp}>
      <div className={`${styles.flits_row} ${styles.flits_text_center}`}>
        <div className={`${styles.flits_col_md_12} ${styles.flits_mt_30} ${styles.flits_pb_15} ${styles.flits_px_0}`}>
          <button
            name={props?.name}
            onClick={handleSaveClick}
            type={props?.type}
            className={`${styles.flits_button} ${styles.flits_primary_btn} ${styles.flits_profile_save_button}`}
          >
            {props?.label}
          </button>
        </div>
      </div>
    </div>
  );
};
