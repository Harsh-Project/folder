import { useSelector } from "react-redux";
import styles from "./OrderCardModule.module.css";
import React, { Suspense, useEffect, useState } from "react";
import { OrderDetail }from "../OrderDetail/OrderDetail"
import { OrderGrandTotal }from "../OrderGrandTotal/OrderGrandTotal"
import { OrderAddress }from "../OrderAddress/OrderAddress"
import { OrderAddressDetail }from "../OrderAddressDetail/OrderAddressDetail"
import { OrderItemDetail }from "../OrderItemDetail/OrderItemDetail"
import { SkeletonOrder }from "../../Skeleton/SkeletonOrder/SkeletonOrder"

export const OrderCard = (props) => {
  const { handleReOrder, item } = props
  const [isLoading, setIsLoading] = useState(true);
  const [orderMode, setOrderMode] = useState(false);
  const [addressMode, setAddressMode] = useState(false);
  const orderData = useSelector((state) => state.storeFrontOrder.orderData);


  useEffect(() => {
    if (orderData) {
      setIsLoading(false);
    }
  }, [orderData]);

  if (!orderData && !isLoading) {
    return null;
  }

  if (isLoading) {
    return (
      <Suspense fallback={<></>}>
        <SkeletonOrder />
      </Suspense>
    );
  }

  return (
    <>
      <div className={styles.flits_order_card}>
      <Suspense fallback={<></>}>
        <OrderDetail
          item={{...item}}
          setOrderMode={setOrderMode}
          orderMode={orderMode}
          handleReOrder={handleReOrder}
        />
        <OrderItemDetail orderMode={orderMode} item={item} />
        <OrderGrandTotal item={item} />
        <OrderAddress
          item={item}
          setAddressMode={setAddressMode}
          addressMode={addressMode}
          orderMode={orderMode}
        />
        <OrderAddressDetail
          orderMode={orderMode}
          item={item}
          addressMode={addressMode}
        />
        </Suspense>
      </div>
    </>
  );
};
