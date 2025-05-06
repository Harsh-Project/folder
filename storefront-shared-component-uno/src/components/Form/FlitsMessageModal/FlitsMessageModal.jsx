import React, { useEffect, useState } from "react";
import styles from "./FlitsMessageModal.module.css";
import { GlobalStore } from "redux-micro-frontend";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
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
      <div className={styles.flits_modal_form}>
        <div className={styles.flits_message_modal}>
          <span className={styles.flits_message_span}>
            <strong>{t("flits.wishlisted_product_page.product_added_to_wishlist", "Product has been added to your wishlist")}</strong>
          </span>
          <br />
          <span className={styles.flits_message_span}>
          {t("flits.wishlisted_product_page.view_your_wishlist_message", "You can view your wishlist by creating account or logging-in an existing account.")}
          </span>
          <br />
          <span
            className={`${styles.flits_message_span} ${styles.flits_message_span_change}`}
            dangerouslySetInnerHTML={{
                  __html: t(
                    "flits.wishlisted_product_page.create_account_through",
                    "Please create account/login through {{ customer_email }} email",
                    {
                      customer_email: emailValue,
                    }
                  ),
                }}
          >
          </span>
          <div className={styles.flits_button_grp}>
          <a
                  type=""
                  className={`${styles.flits_button} ${styles.flits_empty_button} ${styles.flits_tingle_btn} ${styles.flits_tingle_primary_btn}`}
                  href="/account/login"
                >
                  {t("flits.wishlisted_product_page.login","Login")}
                </a>
                <a
                  type=""
                  className={`${styles.flits_button} ${styles.flits_empty_button} ${styles.flits_tingle_btn} ${styles.flits_tingle_primary_btn}`}
                  href="/account/register"
                >
                  {t("flits.wishlisted_product_page.register","Register")}
                </a>
          </div>
        </div>
      </div>
    </Modal>
  );
};
