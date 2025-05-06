import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import styles from "./RuleDataModule.module.css";

export const RuleData = ({ ruleData }) => {
  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;

  const { t } = useTranslationLanguage();

  if (ruleData?.module_on === "birthdate") {
    return (
      <div className={styles.flits_rule_header}>
        <div className={styles.flits_rule_details}>
          {t(
            ruleData?.title[0],
            ruleData?.title[1],
            ruleData?.title?.length > 2 ? ruleData?.title[2] : null
          )}
        </div>
        {!window?.customer_data?.birthday && (
          <div className={styles.flits_rule_credit}>
           {t(
              ruleData?.description[0],
              ruleData?.description[1],
              ruleData?.description?.length > 2
                ? ruleData?.description[2]
                : null
            )}
          </div>
        )}
        {window?.customer_data?.birthday?.length && (
          <div className={styles.flits_rule_credit}>
           {t(
              ruleData?.description2[0],
              ruleData?.description2[1],
              ruleData?.description2?.length > 2
                ? ruleData?.description2[2]
                : null
            )}
          </div>
        )}
        {window?.customer_data?.birthday?.length && (
          <div className={styles.flits_rule_credit} style={{marginTop: "10px"}}>
           {t(
              ruleData?.description3[0],
              ruleData?.description3[1],
              ruleData?.description3?.length > 2
                ? ruleData?.description3[2]
                : null
            )}
          </div>
        )}
      </div>
    );
  }
  return (
    <div className={styles.flits_rule_header}>
      <div className={styles.flits_rule_details}>
        {t(
          ruleData?.title[0],
          ruleData?.title[1],
          ruleData?.title?.length > 2 ? ruleData?.title[2] : null
        )}
      </div>
      <div className={styles.flits_rule_credit}>
        {t(
          ruleData?.description[0],
          ruleData?.description[1],
          ruleData?.description?.length > 2 ? ruleData?.description[2] : null
        )}
      </div>
    </div>
  );
};
