import React, { useState, useEffect, Suspense } from "react";
import styles from "./ModalFormModule.module.css";
import { GlobalStore } from "redux-micro-frontend";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { ModalBackground } from "./ModalBackground";

export const ModalForm = ({
  openModal,
  setOpenModal,
  handleButtonClickModal,
}) => {
  const [emailValue, setEmailValue] = useState("");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [err, setErr] = useState(null)

  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;

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
    setOpenModal(false);
  };

  const handleValueChange = (value) => {
    setEmailValue(value);
    setErr(null)
  };

  const handleClickButton = () => {
    if (
      !emailValue ||
      typeof emailValue !== "string" ||
      emailValue?.length === 0 ||
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailValue)
    ) {
      setErr(t("flits.wishlisted_product_page.invalid_email_warning", "Please enter a valid email address"))
      return;
    }
    handleButtonClickModal(emailValue);
  };

  const isSmallScreen = screenWidth <= 540;

  return (
    <Modal
      open={openModal}
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
                        d="M45.93,21.27a20.2,20.2,0,1,1-26.84-9.8,20.2,20.2,0,0,1,26.84,9.8"
                        style={{ fill: "#4576bb" }}
                      ></path>
                      <path
                        d="M24.3,0l.9,2.07,2.07.9-2.07.89-.9,2.07-.9-2.07L21.33,3l2.07-.9ZM53.19,22.49l-1.63.7,1.63.71.71,1.64.71-1.64,1.63-.71-1.63-.7-.71-1.64Zm-52,1.16L0,24.17l1.21.52.52,1.21.52-1.21,1.21-.52-1.21-.52-.52-1.21Z"
                        style={{ fill: "#2c6db6" }}
                      ></path>
                      <path
                        d="M44.28,5.18a1.94,1.94,0,1,1-2.36,1.39,1.94,1.94,0,0,1,2.36-1.39M6.61,10.33a1.28,1.28,0,0,0-2.56,0,1.28,1.28,0,0,0,2.56,0"
                        style={{ fill: "#5bc1ee" }}
                      ></path>
                      <path
                        d="M41.4,24V38.29A1.7,1.7,0,0,1,39.7,40H15.83a1.7,1.7,0,0,1-1.7-1.7V24Z"
                        style={{ fill: "#ababab" }}
                      ></path>
                      <path
                        d="M40.79,22.76A1.49,1.49,0,0,1,41.4,24H14.13a1.49,1.49,0,0,1,.61-1.2l12.15-8.88a1.47,1.47,0,0,1,1.76,0l12.14,8.88"
                        style={{ fill: "#d8d7db" }}
                      ></path>
                      <path
                        d="M37.4,21.58a.53.53,0,0,1,.53.53V37.28a.54.54,0,0,1-.53.54H18.2a.54.54,0,0,1-.54-.54V22.11a.54.54,0,0,1,.54-.53H37.4"
                        style={{ fill: "#e0e5f4" }}
                      ></path>
                      <path
                        d="M20.79,26.29a.27.27,0,0,1,0-.54H34.86a.27.27,0,0,1,0,.54H20.79m14.07,1.78H20.79a.27.27,0,0,0,0,.54H34.86a.27.27,0,0,0,0-.54m0,2.32H20.79a.27.27,0,0,0,0,.54H34.86a.27.27,0,0,0,0-.54"
                        style={{ fill: "#01516a" }}
                      ></path>
                      <path
                        d="M41.4,24V38.32A1.67,1.67,0,0,1,39.73,40H15.83Z"
                        style={{ fill: "#fff" }}
                      ></path>
                      <path
                        d="M39.7,40H15.8a1.67,1.67,0,0,1-1.67-1.67V24Z"
                        style={{ fill: "#f2f0f8" }}
                      ></path>
                    </g>
                  </g>
                </svg>
              </div>
              <p
                className={`${styles.flits_h2} ${styles.flits_tingle_modal_popup_header_title}`}
              >
                {t(
                  "flits.wishlisted_product_page.what_is_your_email",
                  "What's Your Email?"
                )}
              </p>
            </div>
            <div className={styles.flits_tingle_modal_popup_body}>
              <div id="flits-guest-wishlist-form">
                <div className={styles.flits_input_wrap}>
                  <input
                    type="email"
                    className={`${styles.flits_input} ${styles.flits_tingle_input}`}
                    placeholder={t(
                      "flits.wishlisted_product_page.email_placeholder"
                    )}
                    name="email"
                    value={emailValue}
                    onChange={(e) => {
                      handleValueChange(e.target.value);
                    }}
                    id="flits_email_id"
                    required=""
                  ></input>
                  {err ? <div className={styles.flits_incorrect_email}>{err}</div> : null}
                </div>
                <div className={styles.flits_tingle_modal_popup_action}>
                  <button
                    onClick={handleClickButton}
                    className={`${styles.flits_button} ${styles.flits_tingle_btn} ${styles.flits_tingle_primary_btn}`}
                    data-flits-lang="wishlisted_product_page.add_to_wishlist_button"
                    data-flits-lang-default="Add to Wishlist"
                  >
                    {t(
                      "flits.wishlisted_product_page.add_to_wishlist_button",
                      "Add to Wishlist"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
