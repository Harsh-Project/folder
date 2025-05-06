import { GlobalStore } from "redux-micro-frontend";
import styles from "./HowToEarnHeaderTitleModule.module.css";
import React from "react";

export const HowToEarnHeaderTitle = () => {
  const getStore = GlobalStore.Get();

  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;

  const { t } = useTranslationLanguage();
  return (
    <div className={styles.flits_header_title}>
      <span
        dangerouslySetInnerHTML={{
          __html: t("flits.how_to_earn_credit_page.header_line_html","Earn More <strong>Spend More</strong>"),
        }}
      ></span>
    </div>
  );
};
