import styles from "./OrderDetailModule.module.css";
import React, { Suspense } from "react";
import { OrderDetailInfo } from './OrderDetailInfo/OrderDetailInfo';
import { OrderDetailAction } from './OrderDetailAction/OrderDetailAction';

export const OrderDetail = ({
  item,
  setOrderMode,
  orderMode,
  handleReOrder,
}) => {
  return (
    <div className={styles.flits_order_details}>
      <Suspense fallback={<></>}>
        <OrderDetailInfo
          item={item}
          setOrderMode={setOrderMode}
          orderMode={orderMode}
        />
        <OrderDetailAction item={item} handleReOrder={handleReOrder} />
      </Suspense>
    </div>
  );
};
