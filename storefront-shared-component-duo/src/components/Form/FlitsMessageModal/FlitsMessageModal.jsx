import React, { Suspense, useEffect, useState } from "react";
import styles from "./FlitsMessageModalModule.module.css";
import { GlobalStore } from "redux-micro-frontend";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { ModalBackground } from "../ModalForm/ModalBackground"
export const FlitsMessageModal = ({
  openMessageModal,
  setOpenMessageModal,
  emailValue,
}) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;

  const { t } = useTranslationLanguage();

  const handleClose = () => {
    setOpenMessageModal(false);
  };

  const isSmallScreen = screenWidth <= 540;

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Modal
      open={openMessageModal}
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
          <div className={styles.flits_wishlist_guest_form_box}>
            <div className={styles.flits_tingle_modal_popup_header}>
              <div className={styles.flits_tingle_modal_popup_header_image}>
                <svg viewBox="0 0 56.24 50">
                  <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_1-2" data-name="Layer 1">
                      <path
                        d="M24.3,0l.9,2.07,2.07.9-2.07.89-.9,2.08-.9-2.08L21.33,3l2.07-.9ZM53.19,22.48l-1.64.71,1.64.71.71,1.63.7-1.63,1.64-.71-1.64-.71-.7-1.63Zm-52,1.17L0,24.17l1.21.52.52,1.21.52-1.21,1.21-.52-1.21-.52-.52-1.21Z"
                        style={{ fill: "#2c6db6" }}
                      ></path>
                      <path
                        d="M44.28,5.18a1.94,1.94,0,1,1-2.36,1.39,1.94,1.94,0,0,1,2.36-1.39M6.61,10.33a1.28,1.28,0,0,0-2.56,0,1.28,1.28,0,0,0,2.56,0"
                        style={{ fill: "#5bc1ee" }}
                      ></path>
                      <path
                        d="M45.93,21.27a20.2,20.2,0,1,1-26.85-9.8,20.21,20.21,0,0,1,26.85,9.8"
                        style={{ fill: "#4576bb" }}
                      ></path>
                      <path
                        d="M23.4,28.86a.34.34,0,0,0,.31,0c.18-.09,4.51-2.39,4.51-5a2.28,2.28,0,0,0-.72-1.7,2.36,2.36,0,0,0-1.61-.63A2.71,2.71,0,0,0,23.55,23a2.7,2.7,0,0,0-2.33-1.44,2.36,2.36,0,0,0-1.61.63,2.28,2.28,0,0,0-.72,1.7c0,2.57,4.33,4.87,4.51,5m-3.33-6.17a1.7,1.7,0,0,1,1.15-.45,2.15,2.15,0,0,1,2,1.74.33.33,0,0,0,.41.24.34.34,0,0,0,.24-.24,2.14,2.14,0,0,1,2-1.74,1.7,1.7,0,0,1,1.15.45,1.58,1.58,0,0,1,.51,1.21c0,1.92-3.24,3.86-4,4.29-.75-.43-4-2.37-4-4.29a1.57,1.57,0,0,1,.5-1.21Zm3.48,8.21a6.33,6.33,0,1,0-6.32-6.33,6.33,6.33,0,0,0,6.32,6.33m0-12a5.66,5.66,0,1,1-5.66,5.66,5.66,5.66,0,0,1,5.66-5.66m0,19.32a1.34,1.34,0,1,0,1.34-1.34,1.34,1.34,0,0,0-1.34,1.34m1.34-.67a.67.67,0,1,1-.67.67.67.67,0,0,1,.67-.67m4,.67a1.34,1.34,0,1,0,1.34-1.34,1.34,1.34,0,0,0-1.34,1.34m1.34-.67a.67.67,0,1,1-.67.67.67.67,0,0,1,.67-.67M38.75,24.9h-2a.67.67,0,0,0-.67.67H34.75a.32.32,0,0,0-.33.25l-.26,1.08H31.09v.67h3.33a.33.33,0,0,1,0,.66H30.09v.67h.61l-.4,2.66H26.48l-.06-.38-.66.1,0,.28H23.7l-.08-.4L23,31.3l.8,4a.33.33,0,0,0,.33.27h8.25l-.17.67H24.09a.33.33,0,0,0,0,.66h8.33a.32.32,0,0,0,.33-.25l.33-1.33,1.28-6.41h.06a1,1,0,0,0,.4-1.91l.19-.76h1.07a.67.67,0,0,0,.67.67h2a.66.66,0,0,0,.66-.67v-.66a.66.66,0,0,0-.66-.67M30.2,32.23l-.4,2.67H27l-.45-2.67Zm2.28,2.67h-2l.4-2.67H33Zm-8.66-2.67h2.09l.44,2.67h-2Zm9.32-.67H31l.4-2.66h2.31Zm3.61-6h2v.66h-2Zm-4.2-2.33a.34.34,0,0,1,0-.67h.33v-.33a.34.34,0,1,1,.67,0v.33h.33a.34.34,0,0,1,0,.67h-.33v.33a.34.34,0,0,1-.67,0v-.33h-.33m-2-3.67a.33.33,0,0,1-.33-.33.33.33,0,0,1,.33-.33h.33v-.34a.34.34,0,0,1,.67,0v.34h.33a.33.33,0,0,1,.34.33.34.34,0,0,1-.34.33h-.33v.34a.34.34,0,0,1-.67,0v-.34h-.33M20.22,33.23a.34.34,0,1,1,0,.67h-.33v.33a.34.34,0,0,1-.67,0V33.9h-.33a.34.34,0,0,1,0-.67h.33V32.9a.34.34,0,1,1,.67,0v.33h.33"
                        style={{ fill: "#fff" }}
                      ></path>
                    </g>
                  </g>
                </svg>
              </div>
              <p
                className={`${styles.flits_h2} ${styles.flits_tingle_modal_popup_header_title}`}
              >
                {t(
                  "flits.wishlisted_product_page.product_added_to_wishlist",
                  "Product has been added to your wishlist"
                )}
              </p>
            </div>
            <div className={styles.flits_tingle_modal_popup_body}>
              <p className={styles.flits_tingle_modal_popup_tagline_text}>
                {t(
                  "flits.wishlisted_product_page.view_your_wishlist_message",
                  "You can view your wishlist by creating account or logging-in an existing account."
                )}
              </p>
              <p
                className={styles.flits_tingle_modal_popup_text}
                id="flits-guest-email"
                dangerouslySetInnerHTML={{
                  __html: t(
                    "flits.wishlisted_product_page.create_account_through",
                    "Please create account/login through {{ customer_email }} email",
                    {
                      customer_email: emailValue,
                    }
                  ),
                }}
              ></p>
              <div className={styles.flits_tingle_modal_popup_action}>
                <a
                  type=""
                  className={`${styles.flits_button} ${styles.flits_empty_button} ${styles.flits_tingle_btn} ${styles.flits_tingle_primary_btn}`}
                  href="/account/login"
                >
                  {t("flits.wishlisted_product_page.login", "Login")}
                </a>
                <a
                  type=""
                  className={`${styles.flits_button} ${styles.flits_empty_button} ${styles.flits_tingle_btn} ${styles.flits_tingle_primary_btn}`}
                  href="/account/register"
                >
                  {t("flits.wishlisted_product_page.register", "Register")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
