import React from "react";
import styles from "./FormSubmitModal.module.css";
import Modal from "react-responsive-modal";
import { GlobalStore } from "redux-micro-frontend";
import { useState } from "react";
import { RenderSvgString } from "../../../../General/RenderSvgString";

export const FormSubmitModal = (props) => {
  const getStore = GlobalStore.Get();
  const GetLocalStorage = getStore._globalActions.Helpers[0].GetLocalStorage;
  const [modal, setModal] = useState(
    GetLocalStorage(
      `contactModal${window?.flitsThemeAppExtensionObjects?.customer?.customer_id}`
    ) ?? false
  );
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;

  const { t } = useTranslationLanguage();

  const handleClose = () => {
    setModal(false);
    props.onClose();
  };
  return (
    <Modal
      open={modal}
      focusTrapped={false}
      onClose={handleClose}
      center={true}
      classNames={{
        modal: styles.flits_modal,
        closeButton: styles.flits_close_button,
      }}
    >
      <div className={styles.flits_success_popup_bg}>
        <div
          className={`${styles.flits_paper_plane} ${styles.flits_paper_plane_1}`}
        >
          <RenderSvgString svgString={window?.UnoIcon?.Plane} 
/>
        </div>
        <div
          className={`${styles.flits_paper_plane} ${styles.flits_paper_plane_2}`}
        >
          <RenderSvgString svgString={window?.UnoIcon?.Plane} 
/>
        </div>
        <div
          className={`${styles.flits_bg_bubble} ${styles.flits_bubble_1}`}
        ></div>
        <div
          className={`${styles.flits_bg_bubble} ${styles.flits_bubble_2}`}
        ></div>
        <div
          className={`${styles.flits_bg_bubble} ${styles.flits_bubble_3}`}
        ></div>
        <div
          className={`${styles.flits_bg_bubble} ${styles.flits_bubble_4}`}
        ></div>
      </div>
      <div className={styles.flits_form_success}>
        <div className={styles.flits_form_success_icon}>
          <RenderSvgString svgString={window?.UnoIcon?.LargeEmail} 
/>
          <RenderSvgString svgString={window?.UnoIcon?.True} 
/>
        </div>
        <p
          className={`${styles.flits_popup_message} ${styles.flits_popup_message_1}`}
        >
          {t(
            "flits.order_contact_us.success_message_line_1",
            "Your request has been submitted."
          )}
        </p>
        <p className={styles.flits_popup_message}>
          {t(
            "flits.order_contact_us.success_message_line_2",
            "You will receive a reply in the email address which you have submitted in the query form."
          )}
        </p>
        <p className={styles.flits_popup_message}>
          {t(
            "flits.order_contact_us.success_message_line_3",
            "Thank you for contacting us."
          )}
        </p>
        <button
          onClick={handleClose}
          className={`${styles.flits_input} ${styles.flits_contactus_success_btn}`}
          type="button"
        >
          {t("flits.order_contact_us.success_button", "OK")}
        </button>
      </div>
    </Modal>
  );
};
