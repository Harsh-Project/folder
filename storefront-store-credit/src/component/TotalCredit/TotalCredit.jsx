import React from "react";
import { Earn } from "./Earn";
import { Current } from "./Current";
import { Spent } from "./Spent";

export const TotalCredit = ({ creditData }) => {
  const CreditTotalBoxWrapper =
    window.UnoDuoComponent("CreditTotalBoxWrapper");

  if (!CreditTotalBoxWrapper) {
    return null;
  }
  return (
    <>
      <CreditTotalBoxWrapper>
        <Earn {...creditData} />
      </CreditTotalBoxWrapper>
      <CreditTotalBoxWrapper>
        <Spent {...creditData} />
      </CreditTotalBoxWrapper>
      <CreditTotalBoxWrapper>
        <Current {...creditData} />
      </CreditTotalBoxWrapper>
    </>
  );
};
