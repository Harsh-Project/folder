import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import styles from "./ButtonFacebook.module.css";
export const ButtonFacebook = () => {
  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;

  const { t } = useTranslationLanguage();

  return (
    <button
      type="button"
      onClick={() => window?.handleFacebookShare(t)}
      className={`${styles.flits_button} ${styles.flits_facebook_button} ${styles.flits_button_icon_wrap} ${styles.flits_share_btn} ${styles.flits_mx_10}`}
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
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
      </div>
      {t("flits.refer_friend_page.facebook_share", "Share")}
    </button>
  );
};
