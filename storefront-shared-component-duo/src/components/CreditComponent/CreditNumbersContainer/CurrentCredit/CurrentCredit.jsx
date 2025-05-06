import styles from "./CurrentCreditModule.module.css";
import React, { Suspense } from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useSelector } from "react-redux";
import { MoneyFormat } from "../../../General/MoneyFormat/MoneyFormat";

export const CurrentCrdit = ({ handleData }) => {
  const getStore = GlobalStore.Get();
  const creditData = useSelector((state) => state.storeFrontCredit.creditData);

  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();

  const handleChange = () => {
    handleData("current");
  };
  return (
    <div
      className={`${styles.flits_credit_category_box} ${styles.flits_current}`}
    >
      <div onClick={handleChange}>
        <p className={styles.flits_credit_category_label}>
          {t("flits.credit_page.current_credit", "Current Credit")}
        </p>
        <p
          className={`${styles.flits_credit_category_value} ${styles.flits_current_value}`}
        >
          {parseFloat(creditData?.customer?.credits) < 0 ? "- " : ""}{" "}
          {
            <Suspense fallback={<></>}>
              <MoneyFormat
                price={Math.abs(creditData?.customer?.credits) / 100}
              />
            </Suspense>
          }
        </p>
      </div>
    </div>
  );
};
