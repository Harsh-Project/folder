import React, { useState, useEffect, Suspense } from "react";
import styles from "./ModalForm.module.css";
import { GlobalStore } from "redux-micro-frontend";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { FlitsParagraph } from "../FlitsParagraph/FlitsParagraph";
import { FlitsInputField } from "../FlitsInputField/FlitsInputField";
import { FlitsPrimaryButton } from "../FlitsPrimaryButton/FlitsPrimaryButton";

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

  const isSmallScreen = screenWidth <= 536;

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
      <div className={styles.flits_modal_form}>
        <div id="flits_wishlist_guest_modal">
          <Suspense fallback={<></>}>
            <FlitsParagraph
              paragraph={t(
                "flits.wishlisted_product_page.what_is_your_email",
                "What's Your Email?"
              )}
            />
          </Suspense>
          <Suspense fallback={<></>}>
            <FlitsInputField
              disabled={false}
              name="email"
              placeholder={t(
                "flits.wishlisted_product_page.email_placeholder",
                "Email address"
              )}
              value={emailValue}
              id="flits_email_id"
              type="email"
              onValueChange={handleValueChange}
            />
            {err ? <div className={styles.flits_incorrect_email}>{err}</div> : null}
          </Suspense>
          <div className={styles.flits_add_to_wishlist_button}>
            <Suspense fallback={<></>}>
              <FlitsPrimaryButton
                type="submit"
                label={t(
                  "flits.wishlisted_product_page.add_to_wishlist_button",
                  "Add to Wishlist"
                )}
                onClickEvent={handleClickButton}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </Modal>
  );
};
