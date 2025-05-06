import React, { useEffect, useState } from "react";
import styles from "./ReferMessageModal.module.css";
import { GlobalStore } from "redux-micro-frontend";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
export const ReferMessageModal = ({ name, closeEvent }) => {
  const [isModelOpen, setIsModelOpen] = useState(true);
  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const { t } = useTranslationLanguage();
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClose = () => {
    setIsModelOpen(false);
    closeEvent();
  };

  const isSmallScreen = screenWidth <= 536;

  return (
    <Modal
      open={isModelOpen}
      onClose={handleClose}
      center={!isSmallScreen}
      classNames={{
        modal: isSmallScreen
          ? styles.flits_modal_responsive
          : styles.flits_modal,
        closeButton: isSmallScreen
          ? styles.flits_close_responsive
          : styles.flits_close_button,
      }}
    >
      {isSmallScreen && (
        <button className={styles.flits_close_div} onClick={handleClose}>
          <span className={styles.flits_close_icon}>×</span>
          <span className={styles.flits_text}>Close</span>
        </button>
      )}
      <div className={styles.flits_modal_form}>
        <div className={styles.flits_refer_modal}>
          <h1
            className={`${styles.flits_h1} ${styles.flits_refer_header_title} ${styles.flits_text_center}`}
          >
            {t("flits.refer_friend_page.popup_greetings","Welcome Newcomer")}
          </h1>
          <div
            className={`${styles.flits_refer_content} ${styles.flits_text_center}`}
          >
            {t("flits.refer_friend_page.popup_message", "You were referred by {{ inviter_name }}. Please help us in giving you credit by signing up here.", {inviter_name: name})}
          </div>
        </div>
      </div>
    </Modal>
  );
};