import styles from "./RecentViewCard.module.css";
import React, { Suspense } from "react";
import { MoneyFormat } from '../../General/MoneyFormat/MoneyFormat';

export const RecentViewPrice = ({ cardData }) => {
  return (
    <p className={`${styles.flits_product_price} ${styles.flits_mt_10}`}>
      <Suspense fallback={<></>}>
        <MoneyFormat price={parseFloat(cardData?.price) / 100} />
      </Suspense>
    </p>
  );
};
