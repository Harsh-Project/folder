/* eslint-disable jsx-a11y/anchor-is-valid */
import styles from "./SpentCreditModule.module.css";
import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { GlobalStore } from "redux-micro-frontend";

import { MoneyFormat } from '../../../General/MoneyFormat/MoneyFormat';
/* eslint-disable jsx-a11y/anchor-is-valid */

const validate = [
  "is_store_credit_enable",
  "IS_HOW_TO_EARN_CREDIT_DISPLAY",
  "IS_STORE_CREDIT_PAID",
];

export const SpentCredit = ({ handleData }) => {
  const getStore = GlobalStore.Get();
  const creditData = useSelector((state) => state.storeFrontCredit.creditData);
  const CheckRequireField =
    getStore._globalActions.Helpers[0].CheckRequireField;

  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();

  const handleClick = () => {
    const id = document.getElementById("howToSpent");
    if (id) {
      id.click();
    }
  };

  const handleChange = () => {
    handleData("spent");
  };
  return (
    <div
      className={`${styles.flits_credit_category_box} ${styles.flits_spent}`}
    >
      <div onClick={handleChange}>
        <p className={styles.flits_credit_category_label}>
          {t("flits.credit_page.spent_credit", "Spent Credit")}
        </p>
        <p
          className={`${styles.flits_credit_category_value} ${styles.flits_spent_value}`}
        >
          <Suspense fallback={<></>}>
            <MoneyFormat
              price={Math.abs(creditData?.customer?.total_spent_credits) / 100}
            />
          </Suspense>
        </p>
      </div>
      {CheckRequireField(validate) && (
        <a className={styles.flits_redirect_link} onClick={handleClick}>
          {t("flits.credit_page.how_to_spend", "How to Spend?")}
        </a>
      )}
    </div>
  );
};
