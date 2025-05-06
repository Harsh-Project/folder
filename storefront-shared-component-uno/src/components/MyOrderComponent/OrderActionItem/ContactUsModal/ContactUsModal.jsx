import { GlobalStore } from "redux-micro-frontend";
import styles from "./ContactUsModal.module.css";
import React, { Suspense } from "react";
import { Modal } from "react-responsive-modal";
import { RenderSvgString } from "../../../General/RenderSvgString";
import { ContactUsHidden } from './ContactUsHidden/ContactUsHidden';

export const ContactUsModal = (props) => {
  const {
    Contact,
    Email,
    FirstName,
    LastName,
    Reason,
    modal,
    Message,
    Link,
    item,
    handleClose,
    handleSubmit,
  } = props;
  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;

  const { t } = useTranslationLanguage();

  return (
    <Modal
      open={modal}
      onClose={handleClose}
      focusTrapped={false}
      center={true}
      classNames={{
        modal: styles.flits_modal,
        closeButton: styles.flits_close_button,
      }}
    >
      <div className={styles.flits_popup_icon_text}>
        <div className={styles.flits_popup_icon}><RenderSvgString svgString={window?.UnoIcon?.Contactus} 
/></div>
        <div className={styles.flits_popup_text}>
          <p
            className={`${styles.flits_h3} ${styles.flits_popup_header_title}`}
          >
            {t("flits.order_contact_us.form_title", "Contact Us")}
          </p>
          <p className={styles.flits_popup_header_sub_text}>
            {t(
              "flits.order_contact_us.header_text",
              "Your satisfaction is our top priority"
            )}
          </p>
        </div>
      </div>
      <div className={styles.flits_form_content}>
        <form
          className={styles.flits_contact_form}
          method="post"
          id="contact-form"
          action="/contact#contact-form"
        >
          <div className={styles.flits_row}>
            <FirstName />
            <LastName />
          </div>
          <div className={styles.flits_row}>
            <Email />
            <Contact />
          </div>
          <div className={styles.flits_row}>
            <Reason />
          </div>
          <div className={styles.flits_row}>
            <Message />
          </div>
          <div className={styles.flits_row}>
            <Link />
          </div>
          <button
            className={styles.flits_input}
            onClick={handleSubmit}
            id="flits-contactus-submit"
            type="button"
          >
            {t("flits.order_contact_us.submit_button", "OK")}
          </button>
          <Suspense fallback={<></>}>
            <ContactUsHidden item={item} />
          </Suspense>
        </form>
      </div>
    </Modal>
  );
};
