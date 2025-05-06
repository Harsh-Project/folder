import { GlobalStore } from "redux-micro-frontend";
import styles from "./HowToSpentHeaderTitleModule.module.css";
import React from "react";

export const HowToSpentHeaderTitle = () => {
  const getStore = GlobalStore.Get();

  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;

  const { t } = useTranslationLanguage();
  return (
    <div className={styles.flits_header_title}>
      <span
        dangerouslySetInnerHTML={{
          __html: t("flits.how_to_spend_credit_page.header_line_html"
          ,
          "Spend More <strong>Save More</strong>"),
        }}
      ></span>
    </div>
  );
};
