import React, { useCallback, useEffect } from "react";
import { Modal } from "react-responsive-modal";
import styles from "./UpdatedModule.module.css";
import "react-responsive-modal/styles.css";
import { GlobalStore } from "redux-micro-frontend";
import { useDispatch } from "react-redux";
import { RenderSvgString } from "../../General/RenderSvgString";

export const Updated = () => {
  const getStore = GlobalStore.Get();
  const dispatch = useDispatch();
  const setSnackBarMode =
    window.updatePasswordState("setSnackBarMode");
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;

  const handleClose = useCallback(() => {
    dispatch(setSnackBarMode(null));
  }, [dispatch, setSnackBarMode]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleClose();
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [handleClose]);

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
        className={`${styles.flits_snackbar_popup_box} ${styles.flits_change_password_popup} ${styles.flits_template}`}
      >
        <div className={styles.flits_snackbar_header}>
        <RenderSvgString svgString={window?.DuoIcon?.ChangePasswordSuccessSvg}/>
        </div>
        <div className={styles.flits_snackbar_body}>
          {t("flits.update_password_page.password_updated_successfully", "Your password for account {{ email }} has been successfully updated", {
            email: window?.customer_data?.email,
          })}
        </div>
      </div>
    </Modal>
  );
};
