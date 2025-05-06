import styles from "./HowToEarnHeaderChartModule.module.css";
import React, { Suspense } from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useSelector } from "react-redux";
import { DonutChartCustom } from "../../../General/DonutChartCustom/DonutChartCustom";

export const HowToEarnHeaderChart = () => {
  const getStore = GlobalStore.Get();
  const creditData = useSelector((state) => state.storeFrontCredit.creditData);
  const ruleData = useSelector(
    (state) => state.storeFrontHowToManageCredit.ruleData
  );

  const getTotalEarnRule = () => {
    let x = 0;

    for (let i = 0; i < ruleData?.length; i++) {
      if (ruleData[i]?.tab_to_append === "flits_earning_rules") {
        x = x + 1;
      }
    }

    return x;
  };

  const getEarnedRule = () => {
    let x = 0;

    for (let i = 0; i < ruleData?.length; i++) {
      if (ruleData[i]?.is_earned) {
        x = x + 1;
      }
    }

    return x;
  };
  let earnCredit = Math.abs(creditData?.customer?.total_earned_credits) / 100;
  let earnValue = (getEarnedRule() * 100) / getTotalEarnRule();

  const data = [
    {
      name: "rules-earn",
      value: isNaN(earnValue) ? 0 : earnValue,
      color: "#25d872",
    },
  ];

  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;

  const { t } = useTranslationLanguage();
  return (
    <div className={styles.flits_chart_container}>
      <p className={`${styles.flits_chart_title} ${styles.flits_p_top}`}>
        {t("flits.how_to_earn_credit_page.chart1_header", "Your Earned Credit")}
      </p>
      <div
        className={`${styles.flits_credit_chart} ${styles.flits_how_to_earn_chart}`}
      >
        <Suspense fallback={<></>}>
          <DonutChartCustom
            settings={{
              seriesData: data.sort((a, b) => a.value - b.value),
              title: earnCredit,
              textStyle: {
                fontWeight: "bold",
                color: "#25d872",
              },
            }}
          />
        </Suspense>
      </div>
    </div>
  );
};
