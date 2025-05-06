import styles from "./HowToSpentHeaderChart2Module.module.css";
import React, { Suspense } from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useSelector } from "react-redux";
import { DonutChartCustom } from "../../../General/DonutChartCustom/DonutChartCustom"

export const HowToSpentHeaderChart2 = () => {
  const creditData = useSelector((state) => state.storeFrontCredit.creditData);

  const getStore = GlobalStore.Get();

  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;

  const { t } = useTranslationLanguage();

  let currentCredit = parseFloat(creditData?.customer?.credits)/100;
  let currentValue =
    (creditData?.customer?.credits * 100) /
    creditData?.customer?.total_earned_credits;

  const data = [
    {
      name: "current-credit",
      value: isNaN(currentValue) ? 0 : currentValue,
      color: '#0033cc',
    },
  ];

  return (
    <div className={styles.flits_chart_container}>
      <p className={`${styles.flits_chart_title} ${styles.flits_p_top}`}>
        {t("flits.how_to_spend_credit_page.chart2_header",
        "Your Current Credit")}
      </p>
      <div
        className={`${styles.flits_credit_chart} ${styles.flits_how_to_spend_current_chart}`}
      >
        <Suspense fallback={<></>}><DonutChartCustom
          settings={{
            seriesData: data.sort((a, b) => a.value - b.value),
            title: currentCredit,
            textStyle: {
              fontWeight: "bold",
              color: '#0033cc',
            },
          }}
        /></Suspense>
      </div>
    </div>
  );
};
