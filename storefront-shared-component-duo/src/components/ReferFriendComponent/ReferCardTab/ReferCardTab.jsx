import styles from "./ReferCardTab.module.css";
import React from "react";
import { GlobalStore } from "redux-micro-frontend";
/* eslint-disable jsx-a11y/anchor-is-valid */
import { formatMoney } from "../../General/formatMoney";

export const ReferCardTab = ({ item }) => {
  const getStore = GlobalStore.Get();
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();

  const getTotalCredit = () => {
    const idArray =
      item?.mappedRuleIds?.length > 0 ? item?.mappedRuleIds : [item?.rule_id];
    let total = 0;

    for (let i = 0; i < idArray?.length; i++) {
      total += window?.creditIdArray?.[idArray[i]] ?? 0;
    }

    return total;
  };

  return (
    <div
      id={item?.rule_id}
      className={`${styles.flits_rule_card} ${styles.flits_rule_earned} ${
        item?.notApplicable ? styles.flits_rule_not_applicable : ""
      } ${item?.module_on === "register" ? styles.flits_register_order : ""}`}
    >
      <p
        className={styles.flits_rule_title}
        dangerouslySetInnerHTML={{
          __html: t(
            item?.title[0],
            item?.title[1],
            item?.title?.length > 2 ? item?.title[2] : null
          ),
        }}
      ></p>
      <p
        className={styles.flits_rule_description}
        dangerouslySetInnerHTML={{
          __html: t(
            item?.description[0],
            item?.description[1],
            item?.description?.length > 2 ? item?.description[2] : null
          ),
        }}
      ></p>
      {item?.showEarnCredit && getTotalCredit() > 0 && (
        <p
          className={styles.flits_rule_earn_credit}
          dangerouslySetInnerHTML={{
            __html: t(
              "flits.how_to_earn_credit_page.total_earned_credit_by_rule",
              "Total points earned: {{ credit }}",
              {
                credit: formatMoney(
                  Math.abs(getTotalCredit()),
                  window?.flitsThemeAppExtensionObjects?.money_format
                ),
              }
            ),
          }}
        ></p>
      )}
      <div className={styles.flits_rule_footer}>
        {item?.notApplicable ? (
          <a className={styles.flits_unlock_badge}>
            {t("flits.how_to_earn_credit_page.rule_not_applicable")}
          </a>
        ) : (
          !item?.ruleEarned && (
            <a
              className={styles.flits_unlock_badge}
              dangerouslySetInnerHTML={{
                __html: item?.linkButtonText
                  ? t(...item?.linkButtonText)
                  : item?.is_fixed || item?.module_on == "monthly_date"
                  ? t(
                      "flits.how_to_earn_credit_page.unlock_fixed_credit",
                      "Unlock {{ credit }}",
                      {
                        credit: formatMoney(
                          Math.abs(item?.credits),
                          window?.flitsThemeAppExtensionObjects?.money_format
                        ),
                      }
                    )
                  : t(
                      "flits.how_to_earn_credit_page.unlock_some_percentage_credit",
                      "Unlock {{ credit }} cashback",
                      {
                        credit: `${item?.credits / 100}%`,
                      }
                    ),
              }}
              onClick={() => {
                let copyBtn = document.querySelectorAll(
                  "#flits-refer-link-copy"
                );
                for (let i = 0; i < copyBtn?.length; i++) {
                  copyBtn[i]?.click();
                }
              }}
            ></a>
          )
        )}
        <div className={styles.flits_rule_image}>
          <img
            alt=""
            src={`data:image/svg+xml;base64,${
              window?.HowToManageCreditIcon?.[item?.module_on]?.icon
            }`}
          ></img>
        </div>
      </div>
      {!item?.notApplicable && item?.ruleEarned && (
        <div className={styles.flits_rules_earn_overlay}>
          <img
            alt=""
            src={`data:image/svg+xml;base64,${window?.HowToManageCreditIcon?.["removed"]?.icon}`}
          ></img>
        </div>
      )}
    </div>
  );
};
