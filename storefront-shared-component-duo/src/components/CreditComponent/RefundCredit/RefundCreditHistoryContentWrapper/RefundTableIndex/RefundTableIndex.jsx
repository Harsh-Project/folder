import styles from "./RefundTableIndexModule.module.css";
import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useSelector } from "react-redux";

export const RefundTableIndex = () => {
  const getStore = GlobalStore.Get();
  const refundCreditData = useSelector(
    (state) => state.storeFrontCredit.refundCreditData
  );
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();
  if (refundCreditData && refundCreditData[1]?.length === 0) {
    return null;
  }
  return (
    <div className={styles.flits_credit_table_head}>
      <div className={styles.flits_row}>
        <div className={styles.flits_col_sm_3}>
          <span>{t("flits.credit_page.time", "Date")}</span>
        </div>
        <div className={styles.flits_col_sm_4}>
          <span>
            {t("flits.credit_page.reason_for_credit", "Credit Reason")}
          </span>
        </div>
        <div className={`${styles.flits_col_sm_3} ${styles.flits_text_center}`}>
          <span>{t("flits.credit_page.credit", "CR/DR")}</span>
        </div>
        <div className={styles.flits_col_sm_2}>
          <span>{t("flits.credit_page.balance", "Balance")}</span>
        </div>
      </div>
    </div>
  );
};
