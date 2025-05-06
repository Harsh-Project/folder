import React from "react";
import styles from './Loader.module.css';
import { GlobalStore } from "redux-micro-frontend";

export const Loader = () => {
    const getStore = GlobalStore.Get();
    const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;
    const { t } = useTranslationLanguage();
   return  (
        <div className={`${styles.flits_loading_div} ${styles.flits_social_login_loader}`}>
            <div className={styles.flits_spinner}></div>
            <p className={styles.flits_loading_message}>{t("flits.social_login_page.loading_message", "Logging you in")}</p>
        </div>
  )
}