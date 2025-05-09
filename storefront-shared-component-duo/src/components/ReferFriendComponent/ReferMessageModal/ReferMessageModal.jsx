import React, { Suspense, useEffect, useState } from "react";
import styles from "./ReferMessageModalModule.module.css";
import { GlobalStore } from "redux-micro-frontend";
import { ModalBackground } from "./ModalBackground"
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

  const isSmallScreen = screenWidth <= 540;

  return (
    <Modal
      open={isModelOpen}
      onClose={handleClose}
      center={!isSmallScreen}
      classNames={{
        modal: isSmallScreen
          ? styles.flits_modal_responsive
          : styles.flits_tingle_modal_box,
        closeButton: isSmallScreen
          ? styles.flits_close_responsive
          : styles.flits_close_button,
      }}
    >
      {isSmallScreen && (
        <button
          className={styles.flits_tingle_modal_close}
          onClick={handleClose}
        >
          <span className={styles.flits_tingle_modal_closeIcon}>×</span>
          <span className={styles.flits_tingle_modal_closeLabel}>Close</span>
        </button>
      )}
      <div className={styles.flits_tingle_modal_box_content}>
        <div className={styles.flits_wishlist_guest_modal}>
          <Suspense fallback={<></>}>
            <ModalBackground />
          </Suspense>
          <div className={styles.flits_tingle_modal_popup_header}>
            <div className={styles.flits_tingle_modal_popup_header_image}>
              <svg id="Layer_1" data-name="Layer 1" viewBox="0 0 42.27 41.97">
                <path
                  d="M45.39,34.28a.7.7,0,1,1-.7.7A.7.7,0,0,1,45.39,34.28ZM7,43.39a.7.7,0,1,1-.7.7A.7.7,0,0,1,7,43.39ZM38.67,4a.7.7,0,1,1-.7.7A.7.7,0,0,1,38.67,4Zm-12,4.33a.7.7,0,1,1-.7.7A.7.7,0,0,1,26.63,8.34ZM16.57,4.74a.7.7,0,1,1-.7.7A.7.7,0,0,1,16.57,4.74Zm-12,16.57a.7.7,0,1,1-.7.7A.7.7,0,0,1,4.56,21.31Z"
                  transform="translate(-3.87 -4.02)"
                  style={{ fill: "#5cc1ee" }}
                ></path>
                <path
                  d="M43.72,9.94a1.92,1.92,0,1,1-1.92,1.92A1.92,1.92,0,0,1,43.72,9.94Zm0,4.33a2.4,2.4,0,1,1,2.42-2.4,2.4,2.4,0,0,1-2.42,2.4Zm0-3.84a1.44,1.44,0,1,0,1.43,1.45h0A1.44,1.44,0,0,0,43.72,10.42ZM9.37,9a2.65,2.65,0,1,1-2.65,2.65h0A2.65,2.65,0,0,1,9.37,9Zm0,5.77a3.13,3.13,0,1,1,3.12-3.13h0a3.12,3.12,0,0,1-3.11,3.13Zm0-5.29a2.17,2.17,0,1,0,2.16,2.17h0A2.17,2.17,0,0,0,9.37,9.46Z"
                  transform="translate(-3.87 -4.02)"
                  style={{ fill: "#2d6db5" }}
                ></path>
                <path
                  d="M40.94,21a17.58,17.58,0,1,1-23.36-8.53A17.58,17.58,0,0,1,40.94,21h0"
                  transform="translate(-3.87 -4.02)"
                  style={{ fill: "#4577bb" }}
                ></path>
                <path
                  d="M21.77,25.95a.57.57,0,1,0,.57.57A.57.57,0,0,0,21.77,25.95Zm4.75,0a.57.57,0,1,0,.57.57A.57.57,0,0,0,26.52,25.95Zm-2.13.45h0V26a.75.75,0,0,1,.31.12l.14-.2a.93.93,0,0,0-.45-.16v-.11h-.14v.11a.57.57,0,0,0-.34.13.4.4,0,0,0-.13.31.36.36,0,0,0,.11.28.83.83,0,0,0,.36.15V27a.67.67,0,0,1-.37-.19l-.16.19a.9.9,0,0,0,.53.24v.15h.14v-.15a.57.57,0,0,0,.36-.13.37.37,0,0,0,.13-.31.35.35,0,0,0-.11-.29.86.86,0,0,0-.37-.16Zm-.14,0a.34.34,0,0,1-.16-.08.16.16,0,0,1,0-.11A.18.18,0,0,1,24.1,26a.29.29,0,0,1,.15-.06Zm.3.63a.24.24,0,0,1-.16.06v-.38a.52.52,0,0,1,.18.08.18.18,0,0,1,0,.12A.16.16,0,0,1,24.55,27Zm4.52-9.89a12.44,12.44,0,0,1,4.52,3.11.2.2,0,0,0,.28,0h0a.2.2,0,0,0,0-.28,13,13,0,0,0-4.64-3.2.2.2,0,1,0-.15.37h0ZM13,24.34a.2.2,0,0,0,.25-.11,12.44,12.44,0,0,1,6.35-6.86.2.2,0,0,0,.1-.26.2.2,0,0,0-.27-.1,12.75,12.75,0,0,0-6.55,7.08.19.19,0,0,0,.1.24Zm8.41-7.65h.05a14.29,14.29,0,0,1,1.61-.33.2.2,0,0,0,.15-.24A.2.2,0,0,0,23,16h0a13.26,13.26,0,0,0-1.7.34.21.21,0,0,0-.15.24.2.2,0,0,0,.2.15ZM36.46,31.54a.2.2,0,0,0-.24.12h0c-.09.31-.19.62-.31.93a.2.2,0,0,0,.11.23.19.19,0,0,0,.25-.11h0c.12-.32.23-.63.32-.95A.2.2,0,0,0,36.46,31.54Zm-1.09,2.72a.21.21,0,0,0-.27.07h0a12.27,12.27,0,0,1-5.87,5.18.2.2,0,1,0,.11.38h0a12.61,12.61,0,0,0,6.07-5.38A.19.19,0,0,0,35.38,34.26ZM24.49,40.44c-3.06,0-3.88-1-4-.53a.2.2,0,0,0,.12.25,12.47,12.47,0,0,0,3.91.67h0a.2.2,0,0,0,.23-.16h0a.21.21,0,0,0-.16-.23ZM37.6,21.33H35.33a.2.2,0,0,0-.2.2v.15h-.77c-.75-.5-1.09-.87-1.76-.87h-.1a10.91,10.91,0,0,0-7.79-3.39h-.12a11,11,0,0,0-10.91,10.8A10.66,10.66,0,0,0,13.81,30H12.4a.2.2,0,0,0-.2.2v6.47a.2.2,0,0,0,.2.2h2.74a.19.19,0,0,0,.2-.19h0v-.49a4,4,0,0,1,1.8.72c1,.61,1.6,1.52,3.07,1.45A10.88,10.88,0,0,0,35.48,27.09H37.6a.19.19,0,0,0,.2-.19h0V21.51A.2.2,0,0,0,37.6,21.33Zm-3.45.7a.21.21,0,0,0,.11,0h.83v4H33.52a.19.19,0,0,0-.09.06,8.76,8.76,0,0,1-3.06,2v-3l.52-.19A4.9,4.9,0,0,0,34,24.84a.2.2,0,0,0,.1-.25h0a.19.19,0,0,0-.25-.09h0a4.7,4.7,0,0,1-2.92.12.23.23,0,0,0-.12,0l-2.26.83a.58.58,0,1,1-.41-1.07h0L30,23.6a.19.19,0,0,0,.12-.24h0a.19.19,0,0,0-.19-.12.67.67,0,0,0-.33-.08h-2c.8-.67,1.42-1.93,3-1.93h1.94a1.33,1.33,0,0,1,.47.09,8.28,8.28,0,0,1,1.13.74Zm-5,1.49L28,24a1,1,0,0,0-.53.54H20.35a.19.19,0,0,0-.2.19h0a.65.65,0,0,1-.65.64.2.2,0,0,0-.2.2v1.93a.2.2,0,0,0,.2.2.66.66,0,0,1,.65.65.2.2,0,0,0,.2.2h7.57a.19.19,0,0,0,.2-.19h0a.66.66,0,0,1,.65-.65.19.19,0,0,0,.2-.19h0V25.7l1-.36V29.2a.34.34,0,0,1-.34.34h-11a.34.34,0,0,1-.34-.34h0V23.87a.34.34,0,0,1,.34-.34H29.13Zm-.57,2.31v1.49a1,1,0,0,0-.83.83H20.53a1,1,0,0,0-.83-.83V25.75a1,1,0,0,0,.83-.84h6.86a1,1,0,0,0,1,.95h.16ZM15,36.57v-.15H12.62v.14m4.77,0a4.43,4.43,0,0,0-2-.81V30.9h.31a5.26,5.26,0,0,1,3.39,1.22.2.2,0,0,0,.12,0H22a1.13,1.13,0,1,1,0,2.26H19.26a.2.2,0,0,0,0,.4h2.66a1.53,1.53,0,0,0,1.54-1.26L29.19,32a.87.87,0,0,1,.57,1.63L21.2,37.7c-1.87.89-3.13-.79-3.8-1.13ZM21,38.2c.44-.14,0,0,9-4.26a1.27,1.27,0,0,0-.86-2.37l-5.59,1.57A1.54,1.54,0,0,0,22,31.76H19.19a6,6,0,0,0-3.85-1.27v-.34a.2.2,0,0,0-.2-.2h-.93a10.49,10.49,0,0,1,8.67-12,10.67,10.67,0,0,1,1.7-.14h.14a10.51,10.51,0,0,1,7.24,3H30.62c-1.87,0-2.57,1.48-3.58,2.32H18.65a.75.75,0,0,0-.72.73V29.2a.74.74,0,0,0,.74.74h11a.73.73,0,0,0,.75-.72h0V28.6a9.29,9.29,0,0,0,3.31-2.14H35a10.5,10.5,0,0,1-14,11.75Zm1.26-15.72h2.55a.19.19,0,0,0,.2-.19h0a.2.2,0,0,0-.2-.2H22.22a.19.19,0,1,0,0,.38Zm-1.7,0h.66a.19.19,0,0,0,.2-.17h0a.2.2,0,0,0-.17-.22h-.67a.2.2,0,0,0,0,.4Z"
                  transform="translate(-3.87 -4.02)"
                  style={{ fill: "#f2f0f8" }}
                ></path>
              </svg>
            </div>
            <p
              className={`${styles.flits_h2} ${styles.flits_tingle_modal_popup_header_title}`}
            >
              {t("flits.refer_friend_page.popup_greetings", "Welcome Newcomer")}
            </p>
          </div>
          <div className={styles.flits_tingle_modal_popup_body}>
            <p
              className={styles.flits_tingle_modal_popup_text}
              dangerouslySetInnerHTML={{
                __html: t(
                  "flits.refer_friend_page.popup_message",
                  "You were referred by {{ inviter_name }}. Please help us in giving you credit by signing up here.",
                  {
                    inviter_name: name,
                  }
                ),
              }}
            ></p>
          </div>
        </div>
      </div>
    </Modal>
  );
};
