import styles from "./RefundCreditChartModule.module.css";
import React, { Suspense } from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useSelector } from "react-redux";
import { DonutChartCustom } from "../../../../General/DonutChartCustom/DonutChartCustom";

export const RefundCreditChart = () => {
  const getStore = GlobalStore.Get();

  const refundCreditApiData = useSelector(
    (state) => state.storeFrontCredit.refundCreditApiData
  );

  let total =
    refundCreditApiData?.earned_refund_credits +
    Math.abs(refundCreditApiData?.spent_refund_credits) +
    refundCreditApiData?.current_refund_credits;
  let earnValue =
    (refundCreditApiData?.earned_refund_credits * 100) / total;
  let spentValue =
    (Math.abs(refundCreditApiData?.spent_refund_credits) * 100) / total;
  let currentValue =
    (refundCreditApiData?.current_refund_credits * 100) / total;
  let currentCredit =
    parseFloat(refundCreditApiData?.current_refund_credits) / 100;

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
        {t(
          "flits.credit_page.store_credit_chart1_header",
          "Store credit infosphere"
        )}
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
