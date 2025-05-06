import styles from "./HowToSpentHeaderChart1Module.module.css";
import React, { Suspense } from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useSelector } from "react-redux";
import { DonutChartCustom } from  "../../../General/DonutChartCustom/DonutChartCustom";


export const HowToSpentHeaderChart1 = () => {
  const getStore = GlobalStore.Get();
  const creditData = useSelector((state) => state.storeFrontCredit.creditData);

  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;

  const { t } = useTranslationLanguage();

  let saveCredit = Math.abs(creditData?.customer?.total_spent_credits)/100;
  let saveValue =
    (Math.abs(creditData?.customer?.total_spent_credits) * 100) /
    creditData?.customer?.total_earned_credits;

  const data = [
    {
      name: "spend-save-credit",
      value: isNaN(saveValue) ? 0 : saveValue,
      color: "#ea1c2c",
    },
  ];

  return (
    <div className={styles.flits_chart_container}>
      <p className={`${styles.flits_chart_title} ${styles.flits_p_top}`}>
        {t("flits.how_to_spend_credit_page.chart1_header","Your Total Savings")}
      </p>
      <div
        className={`${styles.flits_credit_chart} ${styles.flits_how_to_spend_chart}`}
      >
      <Suspense fallback={<></>}>
        <DonutChartCustom
          settings={{
            seriesData: data.sort((a, b) => a.value - b.value),
            title: saveCredit,
            textStyle: {
              fontWeight: "bold",
              color: "#ea1c2c",
            },
          }}
        />
        </Suspense>
      </div>
    </div>
  );
};
