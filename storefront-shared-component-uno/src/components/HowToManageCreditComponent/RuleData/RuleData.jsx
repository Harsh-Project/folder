import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import styles from "./RuleData.module.css";
import { useSelector } from "react-redux";

export const RuleData = ({ ruleData }) => {
  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;
  const { maxSpentCredit } = useSelector(state => state.storeFrontHowToManageCredit)
  const formatMoney = getStore._globalActions.Helpers[0].formatMoney;

  const { t } = useTranslationLanguage();

  const maxSpentText = ruleData?.tab_to_append === "flits_spent_rules" && maxSpentCredit ? t("flits.how_to_spend_credit_page.max_spent_credit", "You can use a maximum of {{ max_spent_value }} reward credits.", {max_spent_value: formatMoney(maxSpentCredit, window?.flitsThemeAppExtensionObjects?.money_format)}) : ""

  if (ruleData?.module_on === "birthdate") {
    return (
      <div className={styles.flits_rule_header}>
        <div
          className={styles.flits_rule_details}
          dangerouslySetInnerHTML={{
            __html: t(
              ruleData?.title[0],
              ruleData?.title[1],
              ruleData?.title?.length > 2 ? ruleData?.title[2] : null
            ),
          }}
        ></div>
        {!window?.flitsThemeAppExtensionObjects?.customer?.birthday ? (
          <div
            className={styles.flits_rule_credit}
            dangerouslySetInnerHTML={{
              __html: t(
                ruleData?.description[0],
                ruleData?.description[1],
                ruleData?.description?.length > 2
                  ? ruleData?.description[2]
                  : null
              ),
            }}
          ></div>
        ) : null}
        {window?.flitsThemeAppExtensionObjects?.customer?.birthday?.length ? (
          <div
            className={styles.flits_rule_credit}
            dangerouslySetInnerHTML={{
              __html: t(
                ruleData?.description2[0],
                ruleData?.description2[1],
                ruleData?.description2?.length > 2
                  ? ruleData?.description2[2]
                  : null
              ),
            }}
          ></div>
        ) : null}
        {window?.flitsThemeAppExtensionObjects?.customer?.birthday?.length ? (
          <div
            className={styles.flits_rule_credit}
            style={{ marginTop: "10px" }}
            dangerouslySetInnerHTML={{
              __html: t(
                ruleData?.description3[0],
                ruleData?.description3[1],
                ruleData?.description3?.length > 2
                  ? ruleData?.description3[2]
                  : null
              ),
            }}
          ></div>
        ) : null}
      </div>
    );
  }
  return (
    <div className={styles.flits_rule_header}>
      <div
        className={styles.flits_rule_details}
        dangerouslySetInnerHTML={{
          __html: t(
            ruleData?.title[0],
            ruleData?.title[1],
            ruleData?.title?.length > 2 ? ruleData?.title[2] : null
          ),
        }}
      ></div>
      <div
        className={styles.flits_rule_credit}
        dangerouslySetInnerHTML={{
          __html: `${t(
            ruleData?.description[0],
            ruleData?.description[1],
            ruleData?.description?.length > 2 ? ruleData?.description[2] : null
          )} ${maxSpentText}`,
        }}
      ></div>
    </div>
  );
};
