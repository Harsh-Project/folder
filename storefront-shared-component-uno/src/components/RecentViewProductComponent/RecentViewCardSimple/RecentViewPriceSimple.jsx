import styles from "./RecentViewCardSimple.module.css";
import React, { Suspense } from "react";
import { MoneyFormat } from '../../General/MoneyFormat/MoneyFormat';

export const RecentViewPriceSimple = ({ productData }) => {
  return (
    <p className={`${styles.flits_product_price} ${styles.flits_mt_10}`}>
      <Suspense fallback={<></>}>
        <MoneyFormat
          price={parseFloat(productData?.variants[0]?.price) / 100}
        />
      </Suspense>
    </p>
  );
};
