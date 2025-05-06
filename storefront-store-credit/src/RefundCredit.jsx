import React, { useEffect } from "react";
import { RefundCreditPage } from "./component/RefundCredit/RefundCreditPage";

const RefundCredit = () => {
  useEffect(() => {
    const loaders = document.getElementsByClassName("flits_initial_loader");
    for (let i = 0; i < loaders.length; i++) {
      loaders[i].style.display = "none";
    }
  });
  return <RefundCreditPage />;
};

export default RefundCredit;
