import styles from "./TopOrderCard.module.css";
import React, { Suspense } from "react";
import { TopOrderInfo } from '../TopOrderInfo/TopOrderInfo';

export const TopOrderCard = (props) => {
  const { item } = props;
  return (
    <div
      className={`${styles.flits_product_card} ${styles.flits_top_order_card}`}
    >
      <Suspense fallback={<></>}>
        <TopOrderInfo item={item} />
      </Suspense>
      {props?.children}
    </div>
  );
};
