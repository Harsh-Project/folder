import React from "react";
import { DeliveryAddress } from "../DeliveryAddress/DeliveryAddress";

export const DeliveryAddressPage = (props) => {

  const DeliveryAddressContentWrapper =
    window.UnoDuoComponent("DeliveryAddressContentWrapper");
  const Loading = window.UnoDuoComponent("Loading");

  if (!DeliveryAddressContentWrapper) {
    return <Loading />;
  }

  return (
    <DeliveryAddressContentWrapper>
      <DeliveryAddress />
    </DeliveryAddressContentWrapper>
  );
};
