import styles from "./FromAdminHeaderModule.module.css";
import React from "react";
import { GlobalStore } from "redux-micro-frontend";

export const FromAdminHeader = () => {
  const getStore = GlobalStore.Get();
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();
  return (
    <>
      <div className={styles.flits_account_box_header}>
        <div className={styles.flits_header_title}>
          <span>{t("flits.from_admin_page.header_line_html","From Store Owner")}</span>
        </div>
      </div>
      <div className={`${styles.flits_mobile_box_card} ${styles.flits_header_title} ${styles.flits_p_10} ${styles.flits_mobile}`}>
        <span>{t("flits.from_admin_page.header_line_html","From Store Owner")}</span>
      </div>
    </>
  );
};
