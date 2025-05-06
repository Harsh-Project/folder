import { GlobalStore } from "redux-micro-frontend";
import styles from "./AddressButtonSection.module.css";
import React from "react";

export const AddressButtonSection = (props) => {
  const getStore = GlobalStore.Get();
  
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;

  const { t } = useTranslationLanguage();

  
  return (
    <div className={`${styles.flits_col_md_12} ${styles.flits_text_right}`}>
      <button
        type="button"
        onClick={props?.handleResetClick}
        className={`${styles.flits_button} ${styles.flits_secondary_btn} ${styles.flits_mt_15} ${styles.flits_address_cancel_btn}`}
      >
        {t("flits.address_page.cancel_button", "Cancel")}
      </button>
      <button
        onClick={props?.handleSaveClick}
        type="button"
        className={`${styles.flits_button} ${styles.flits_primary_btn} ${styles.flits_mt_15} ${styles.flits_address_add_save_button}`}
        data-add-text="Save"
        data-update-text="Save"
      >
        {t("flits.address_page.save_button", "Save")}
      </button>
    </div>
  );
};
