import styles from "./TableHeaderModule.module.css";
import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useSelector } from 'react-redux';

export const TableHeader = () => {
  const creditData = useSelector((state) => state.storeFrontCredit.creditData);

  const getStore = GlobalStore.Get();

  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();
  if(creditData &&
    creditData.status &&
    creditData?.customer?.credit_log?.length === 0) {
      return null;
    }
  return (
    <div className={`${styles.flits_credit_table_header}`}>
      <p className={styles.flits_credit_table_title}>
        {t("flits.credit_page.credit_activity","Recent Transactions")}
      </p>
    </div>
  );
};
