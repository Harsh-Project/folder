import React, { Suspense } from "react";
import { CreditGraphContainer } from "../CreditGraphContainer/CreditGraphContainer";
import { CreditNumbersContainer } from "../CreditNumbersContainer/CreditNumbersContainer";

export const CreditTotalWrapper = ({ handleData }) => {
  return (
    <Suspense fallback={<></>}>
      <CreditGraphContainer />
      <CreditNumbersContainer handleData={handleData} />
    </Suspense>
  );
};
