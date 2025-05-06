import styles from "./CreditHistoryContentWrapperModule.module.css";
import React, { Suspense } from "react";
import { TableHeader } from "./TableHeader/TableHeader";
import { TableIndex } from "./TableIndex/TableIndex";

export const CreditHistoryContentWrapper = (props) => {
  return (
    <div className={`${styles.flits_container_box}`}>
      <div className={`${styles.flits_store_credit_transcation_table}`}>
        <div className={styles.flits_credit_table}>
        <Suspense fallback={<></>}>
          <TableHeader />
          <TableIndex />
          </Suspense>
          {props?.children}
        </div>
      </div>
      <div className={styles.flits_clearfix}></div>
    </div>
  );
};
