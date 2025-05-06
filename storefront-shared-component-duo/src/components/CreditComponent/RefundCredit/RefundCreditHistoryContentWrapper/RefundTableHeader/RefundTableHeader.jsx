import styles from "./RefundTableHeaderModule.module.css";
import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useSelector } from "react-redux";

export const RefundTableHeader = () => {
  const refundCreditData = useSelector(
    (state) => state.storeFrontCredit.refundCreditData
  );

  const getStore = GlobalStore.Get();

  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();
  if (refundCreditData && refundCreditData[1]?.length === 0) {
    return null;
  }
  return (
    <div className={`${styles.flits_credit_table_header}`}>
      <p className={styles.flits_credit_table_title}>
        {t("flits.credit_page.credit_activity", "Recent Transactions")}
      </p>
    </div>
  );
};
