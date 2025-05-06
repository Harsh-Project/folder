import React from "react"
import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import { GlobalStore } from "redux-micro-frontend";
import { GetAvailableSpentRules } from "../component/Helpers/GetAvailableSpentRules";
import { useSelector } from "react-redux";
import { CreditUsageContainer } from "./CreditUsageContainer";
import { AppendStoreCreditDiv } from "../component/Helpers/AppendStoreCreditDiv";

export const CreditUsageComponent = () => {
  const [availableSpentRules, setAvailableSpentRules] = useState(null);

  let cartData = useSelector((state) => state.StoreFrontShopifyData.cartData);

  const getStore = GlobalStore.Get();
  const Utility = getStore._globalActions.Helpers[0].Utility;

  const spentRuleNotAvailable = () => {
    return !availableSpentRules || !availableSpentRules?.code?.rules?.length || availableSpentRules?.code?.rules?.length <= 0
  }

  useEffect(() => {
    const customerId = window?.flitsThemeAppExtensionObjects?.customer?.customer_id
    if (cartData === -1 || customerId === null || customerId === undefined || customerId === -1 || customerId === "-1"){
      return;
    }
    const setSpentrules = async () => {
      const availableSpentRules = await GetAvailableSpentRules(cartData);
      setAvailableSpentRules(availableSpentRules);
    }
    setSpentrules();
  }, [Utility, cartData]);

  useEffect(() => {
    if(window?.flitsThemeAppExtensionObjects?.Metafields?.CREDIT_DISPLAY_ON === 'cart' && parseInt(window?.flitsThemeAppExtensionObjects?.Metafields?.is_cart_code_automatic) === 1){
      AppendStoreCreditDiv();
    }
  });

  if(spentRuleNotAvailable()){
    return null;
  }

  const flitsCartDiv = Array.from(window.document.querySelectorAll(".flits-cart-automatic-code"));
  return (
    <>
    {flitsCartDiv.map((item, index) => {
      item.style.display = "block";
      return ReactDOM.createPortal(<CreditUsageContainer availableSpentRules={availableSpentRules} appendedTo={item}/>, item);
    })}
    </>
  );
};
