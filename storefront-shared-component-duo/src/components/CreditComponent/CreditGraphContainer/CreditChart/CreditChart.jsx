import styles from "./CreditChartModule.module.css";
import React, { Suspense } from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useSelector } from "react-redux";
import { DonutChartCustom } from '../../../General/DonutChartCustom/DonutChartCustom';

export const CreditChart = () => {
  const getStore = GlobalStore.Get();

  const creditData = useSelector((state) => state.storeFrontCredit.creditData);

  let total =
    creditData?.customer?.total_earned_credits +
    Math.abs(creditData?.customer?.total_spent_credits) +
    creditData?.customer?.credits;
  let earnValue = (creditData?.customer?.total_earned_credits * 100) / total;
  let spentValue =
    (Math.abs(creditData?.customer?.total_spent_credits) * 100) / total;
  let currentValue = (creditData?.customer?.credits * 100) / total;
  let currentCredit = parseFloat(creditData?.customer?.credits) / 100;

  let data = [
    {
      name: "earn",
      value: isNaN(earnValue) ? (earnValue = 0) : earnValue,
      color: "#25d872",
    },
    {
      name: "spent",
      value: isNaN(spentValue) ? (spentValue = 0) : spentValue,
      color: "#ea1c2c",
    },
    {
      name: "current",
      value: isNaN(currentValue) ? (currentValue = 0) : currentValue,
      color: "#0033cc",
    },
  ];

  const settings = {
    seriesData: data.sort((a, b) => a.value - b.value),
    title: currentCredit,
    outerStrokeWidth: 17.5,
    innerStrokeWidth: 6.15,
    radius: 50,
    textStyle: {
      color: "#0033cc",
      fontWeight: "bold",
      fontFamily: "inherit",
      fontSize: 12,
      align: "middle",
    },
  };

  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;

  const { t } = useTranslationLanguage();
  return (
    <div className={styles.flits_chart_container}>
      <p className={`${styles.flits_chart_title} ${styles.flits_p_top}`}>
        {t("flits.credit_page.chart1_header", "Credit infosphere")}
      </p>
      <div
        className={`${styles.flits_credit_chart} ${styles.flits_store_credit_chart}`}
      >
        <Suspense fallback={<></>}>
          <DonutChartCustom settings={settings} />
        </Suspense>
      </div>
    </div>
  );
};
