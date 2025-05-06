import React, { useCallback } from "react";
import { Modal } from "react-responsive-modal";
import styles from "./ModalDeleteModule.module.css";
import "react-responsive-modal/styles.css";
import { GlobalStore } from "redux-micro-frontend";

export const ModalDelete = ({ onNo, onYes }) => {
  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;

  const handleClose = useCallback(() => {
    onNo()
  }, [onNo]);

  const handleYesClick = () => {
    onYes()
  };

  const handleNoClick = () => {
    onNo()
  };
  const { t } = useTranslationLanguage();

  return (
    <Modal
      open={true}
      onClose={handleClose}
      center
      classNames={{
        modal: styles.flits_modal,
        closeButton: styles.flits_close_button,
      }}
    >
      <div
        className={`${styles.flits_snackbar_popup_box} ${styles.flits_address_popup_confirm}`}
      >
        <div className={styles.flits_snackbar_body}>
          {t("flits.address_page.delete_confirmation_message","Are you sure you want to delete this address?")}
        </div>
        <div className={styles.flits_snackbar_footer}>
          <button
            onClick={handleYesClick}
            type="button"
            className={`${styles.flits_button} ${styles.flits_primary_btn} ${styles.flits_address_confirm} ${styles.flits_mr_5}`}
          >
            {t("flits.address_page.yes","Yes")}
          </button>
          <button
            type="button"
            onClick={handleNoClick}
            className={`${styles.flits_button} ${styles.flits_primary_btn} ${styles.flits_address_confirm} ${styles.flits_ml_5}`}
          >
            {t("flits.address_page.no","No")}
          </button>
        </div>
      </div>
    </Modal>
  );
};
