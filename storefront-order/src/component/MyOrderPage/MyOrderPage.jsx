import React from "react";
import { MyOrderContent } from "../MyOrderContent/MyOrderContent";
import { useSelector } from 'react-redux';

export const MyOrderPage = (props) => {
  const orderData = useSelector((state) => state.storeFrontOrder.orderData);
  const MyOrderContentWrapper =
    window.UnoDuoComponent("MyOrderContentWrapper");
  const Loading = window.UnoDuoComponent("Loading");

  if (
    !MyOrderContentWrapper ||
    !orderData
  ) {
    return <Loading />;
  }

  return (
      <MyOrderContentWrapper>
        <MyOrderContent />
      </MyOrderContentWrapper>
  );
};
