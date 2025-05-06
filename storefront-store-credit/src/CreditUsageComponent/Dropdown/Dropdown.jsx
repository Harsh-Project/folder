import React from "react";
import styles from "../CreditUsageComponent.module.css";
import { GlobalStore } from "redux-micro-frontend";

export const Dropdown = (props) => {
  const availableSpentRules = props.availableSpentRules;
  const handleChange = (e) => {
    props.onChange(e.target.value);
  };
  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;

  const { t } = useTranslationLanguage();
  return (
    <>
      <div className={`${styles.flits_select_row} ${styles.flits_cart_drp}`}>
        <div className={styles.flits_select_arrow}>
          <svg
            viewBox="0 0 24 24"
            width="14"
            height="14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            shapeRendering="geometricPrecision"
          >
            <path d="M6 9l6 6 6-6"></path>
          </svg>
        </div>
        <select
          onChange={handleChange}
          className={`${styles.flits_want_to_use_credit} ${styles.flits_input}`}
        >
          <option value="-1">
            {t(
              "flits.cart_page.select_credit_option",
              "Select option to use store credit"
            )}
          </option>
          {availableSpentRules?.code?.rules &&
            availableSpentRules?.code?.rules?.map((data) => {
              if (data?.credit_type === "refund_credit") {
                if (data?.applicable_refund_credits <= 0) {
                  return null;
                }
                return (
                  <option value={data?.rule.id} key={data?.rule.id}>
                    {t(
                      "flits.cart_page.store_credit_dropdown_text",
                      "Use store credit of {{ credit }}.",
                      {
                        credit: (
                          parseFloat(data?.applicable_refund_credits) / 100
                        ).toFixed(2),
                      }
                    )}
                  </option>
                );
              }

              if (data?.applicable_credits <= 0) {
                return null;
              }
              return (
                <option value={data?.rule.id} key={data?.rule.id}>
                  {t(
                    "flits.cart_page.credit_cart_percentage",
                    "Use reward credit of {{ credit }} out of {{ total_credit }}.",
                    {
                      credit: (
                        parseFloat(data?.applicable_credits) / 100
                      ).toFixed(2),
                      total_credit: (
                        parseFloat(availableSpentRules?.code?.total_credits) /
                        100
                      ).toFixed(2),
                    }
                  )}
                </option>
              );
            })}
        </select>
      </div>
    </>
  );
};
