import React from "react";
import { CreditContent } from "../CreditContent/CreditContent";
import { useSelector } from 'react-redux';

export const CreditPage = (props) => {
  const creditData = useSelector((state) => state.storeFrontCredit.creditData);
  const Loading = window.UnoDuoComponent("Loading");
  const CreditContentWrapper =
    window.UnoDuoComponent("CreditContentWrapper");

  if (
    !CreditContentWrapper ||
    !creditData 
  ) {
    return <Loading />;
  }
  return (
      <CreditContentWrapper>
        <CreditContent />
      </CreditContentWrapper>
  );
};
