import { GlobalStore } from "redux-micro-frontend";
import styles from "./ButtonShare.module.css";
import React from "react";

export const ButtonShare = () => {
  const getStore = GlobalStore.Get()

  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;

    const { t } = useTranslationLanguage()


  if(navigator.share === undefined) {
    return null;
  }
  return (
      <button
        onClick={() => window?.handleShare(t)}
        type="button"
        className={`${styles.flits_button} ${styles.flits_navigator_button} ${styles.flits_button_icon_wrap} ${styles.flits_share_btn} ${styles.flits_ml_10}`}
      >
        <div className={styles.flits_button_icon}>
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="css-i6dzq1"
          >
            <circle cx="18" cy="5" r="3"></circle>
            <circle cx="6" cy="12" r="3"></circle>
            <circle cx="18" cy="19" r="3"></circle>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
          </svg>
        </div>
        {t("flits.refer_friend_page.share","Share")}
      </button>
  );
};
