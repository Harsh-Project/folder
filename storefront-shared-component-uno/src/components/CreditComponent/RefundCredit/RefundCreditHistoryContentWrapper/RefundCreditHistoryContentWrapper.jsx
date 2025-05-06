import styles from "./ReufndCreditHistoryContentWrapper.module.css";
import React, { Suspense } from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useSelector } from "react-redux";
import { RefundCreditHistoryBox } from "./RefundCreditHistoryBox";

export const RefundCreditHistoryContentWrapper = (props) => {
  const getStore = GlobalStore.Get();
  const refundCreditData = useSelector(
    (state) => state.storeFrontCredit.refundCreditData
  );

  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;
  const { t } = useTranslationLanguage();
  if (refundCreditData && refundCreditData[1]?.length === 0) {
    return (
      <Suspense fallback={<></>}>
        <RefundCreditHistoryBox>
          <div className={`${styles.flits_store_credit_table_div}`}>
            {props?.children}
          </div>
        </RefundCreditHistoryBox>
      </Suspense>
    );
  }
  return (
    <Suspense fallback={<></>}>
      <RefundCreditHistoryBox>
        <div className={`${styles.flits_store_credit_table_div}`}>
          <p
            className={`${styles.flits_h5} ${styles.flits_credit_activity_title} ${styles.flits_mb_0}`}
          >
            {t("flits.credit_page.credit_activity", "Recent Transactions")}
          </p>
          <ul
            className={`${styles.flits_credit_log_list} ${styles.flits_credit_log_header}`}
          >
            <li
              className={`${styles.flits_credit_log_item} ${styles.flits_credit_log_title} ${styles.flits_credit_log_item_template}`}
            >
              <div
                className={`${styles.flits_row} ${styles.flits_credit_log_detail}`}
              >
                <div
                  className={`${styles.flits_col_md_3} ${styles.flits_credit_right_border}`}
                >
                  <div>
                    <p className={styles.flits_credit_value}>
                      {t("flits.credit_page.credit", "CR/DR")}
                    </p>
                  </div>
                </div>
                <div
                  className={`${styles.flits_col_md_6} ${styles.flits_credit_right_border} ${styles.flits_text_center}`}
                >
                  <p className={styles.flits_credit_comment}>
                    {t("flits.credit_page.reason_for_credit", "Credit Reason")}
                  </p>
                </div>
                <div className={styles.flits_col_md_3}>
                  <p className={styles.flits_credit_date}>
                    {t("flits.credit_page.time", "Date")}
                  </p>
                </div>
              </div>
            </li>
          </ul>
          {props?.children}
        </div>
      </RefundCreditHistoryBox>
    </Suspense>
  );
};
