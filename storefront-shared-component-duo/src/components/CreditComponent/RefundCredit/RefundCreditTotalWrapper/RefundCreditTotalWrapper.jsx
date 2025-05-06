import React from "react";
import { RefundCreditGraphContainer } from "../RefundCreditGraphContainer/RefundCreditGraphContainer";
import styles from "./RefundCreditTotalWrapperModule.module.css";
import { GlobalStore } from "redux-micro-frontend";

export const RefundCreditTotalWrapper = () => {
  const getStore = GlobalStore.Get();

  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();
  return (
    <div className={styles.flits_refund_credit_chart_contain}>
      <RefundCreditGraphContainer />
      <div
        className={`${styles.flits_mobile_box_card} ${styles.flits_header_title} ${styles.flits_p_10}`}
      >
        <span
          dangerouslySetInnerHTML={{
            __html: t(
              "flits.credit_page.refund_made_easy",
              "Refunds made easy"
            ),
          }}
        ></span>
      </div>
    </div>
  );
};
