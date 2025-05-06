import React from "react";
import { RefundCreditContent } from "./RefundCreditContent";
import { useSelector } from "react-redux";

export const RefundCreditPage = (props) => {
  const refundCreditData = useSelector(
    (state) => state.storeFrontCredit.refundCreditData
  );
  const Loading = window.UnoDuoComponent("Loading");
  const RefundCreditContentWrapper = window.UnoDuoComponent(
    "RefundCreditContentWrapper"
  );

  if (!RefundCreditContentWrapper || !Loading) {
    return null;
  }

  if (!refundCreditData) {
    return <Loading />;
  }

  return (
    <RefundCreditContentWrapper>
      <RefundCreditContent />
    </RefundCreditContentWrapper>
  );
};
