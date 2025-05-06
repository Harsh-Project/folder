import React from "react";
import { FromAdmin } from "../FromAdmin/FromAdmin";
import { HowToEarnDuo } from "../HowToEarnDuo/HowToEarnDuo";
import { HowToSpentDuo } from "../HowToSpentDuo/HowToSpentDuo";

export const HowToManageCreditDuo = (props) => {
  if (props?.item?.path === "fromAdmin") {
    return <FromAdmin />;
  }

  if(props?.item?.path === "howToEarn") {
    return <HowToEarnDuo />
  }

  if(props?.item?.path === "howToSpent") {
    return <HowToSpentDuo />
  }

  return null;
};
