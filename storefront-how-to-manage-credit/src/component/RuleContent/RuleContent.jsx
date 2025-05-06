import React from "react";
import { useSelector } from "react-redux";

export const RuleContent = () => {
  const RuleData = window.UnoDuoComponent("RuleData");
  const RuleContentWrapper =
    window.UnoDuoComponent("RuleContentWrapper");
  const RuleImage = window.UnoDuoComponent("RuleImage");
  const activeButton = useSelector(
    (state) => state.storeFrontHowToManageCredit.activeButton
  );
  const ruleData = useSelector(
    (state) => state.storeFrontHowToManageCredit.ruleData
  );

  if (!RuleContentWrapper || !ruleData) {
    return null;
  }

  return ruleData?.map((item1, index) => {
    if (activeButton === item1.tab_to_append)
      return (
        <RuleContentWrapper key={index} rule={item1}>
          <RuleImage rule={item1} />
          <RuleData ruleData={item1} />
        </RuleContentWrapper>
      );
    else return null;
  });
};
