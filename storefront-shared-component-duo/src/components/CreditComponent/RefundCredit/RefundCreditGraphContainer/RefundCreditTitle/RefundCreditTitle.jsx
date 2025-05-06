import { GlobalStore } from "redux-micro-frontend";
import styles from "./RefundCreditTitleModule.module.css";
import React from "react";

export const RefundCreditTitle = () => {
  const getStore = GlobalStore.Get();

  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;

  const { t } = useTranslationLanguage();
  return (
    <div className={styles.flits_header_title}>
      <span
        dangerouslySetInnerHTML={{
          __html: t(
            "flits.credit_page.header_line_html",
            "Save Money <strong>Through Rewards</strong>"
          ),
        }}
      ></span>
    </div>
  );
};
