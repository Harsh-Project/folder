import styles from "./RefundCreditHistoryContentWrapperModule.module.css";
import React, { Suspense } from "react";
import { RefundTableHeader } from "./RefundTableHeader/RefundTableHeader";
import { RefundTableIndex } from "./RefundTableIndex/RefundTableIndex";

export const RefundCreditHistoryContentWrapper = (props) => {
  return (
    <div className={`${styles.flits_container_box}`}>
      <div className={`${styles.flits_store_credit_transcation_table}`}>
        <div className={styles.flits_credit_table}>
          <Suspense fallback={<></>}>
            <RefundTableHeader />
            <RefundTableIndex />
          </Suspense>
          {props?.children}
        </div>
      </div>
      <div className={styles.flits_clearfix}></div>
    </div>
  );
};
