import styles from "./ChangePasswordContentWrapperModule.module.css";
import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import { RenderSvgString } from '../../General/RenderSvgString';

export const ChangePasswordContentWrapper = (props) => {
  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;

  const { t } = useTranslationLanguage();
  return (
    <div
      className={`${styles.flits_mobile_box_card} ${styles.flits_change_password_form} ${styles.flits_p_15}`}
    >
      <div className={styles.flits_form_header}>
        <RenderSvgString svgString={window?.DuoIcon?.ChangePasswordIcon}/>
        <p
          className={`${styles.flits_h5} ${styles.flits_form_header_title}`}
          data-flits-lang="update_password_page.header_line_html"
          data-flits-lang-default="Update your password for"
          data-flits-translation="true"
        >
          {t("flits.update_password_page.header_line_html","Update your password for")}
        </p>
        <p className={`${styles.flits_customer_email} ${styles.flits_strong}`}>
          {window?.flitsThemeAppExtensionObjects?.customer?.email}
        </p>
      </div>
      <form
        autoComplete="off"
        action="/update_password"
        method="post"
        id="flits-form-change-password"
        className={styles.flits_form_change_password}
      >
        {props.children}
      </form>
    </div>
  );
};
