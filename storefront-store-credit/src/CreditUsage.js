import React from "react";
import { useEffect } from "react";
import { CreditUsageComponent } from "./CreditUsageComponent/CreditUsageComponent";

function CreditUsage(props) {
  useEffect(() => {
    const loaders = document.getElementsByClassName("flits_initial_loader");
    for (let i = 0; i < loaders.length; i++) {
      loaders[i].style.display = "none";
    }
  });
  return <CreditUsageComponent {...props} />;
}

export default CreditUsage;
