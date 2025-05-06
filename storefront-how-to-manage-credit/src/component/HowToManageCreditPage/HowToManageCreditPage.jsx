import React from "react";
import { HowToManageCreditContent } from "../HowToManageCreditContent/HowToManageCreditContent";
import { useSelector } from "react-redux";
import { HowToManageCreditDuo } from "../HowToManageCreditDuo/HowToManageCreditDuo";
import { Suspense } from "react";

export const HowToManageCreditPage = (props) => {
  const microFrontEndData = useSelector(
    (state) => state.storeFrontContainer.microFrontEndData
  );
  const ruleData = useSelector(
    (state) => state.storeFrontHowToManageCredit.ruleData
  );
  const Loading = window.UnoDuoComponent("Loading");
  const HowToManageCreditContentWrapper = window.UnoDuoComponent(
    "HowToManageCreditContentWrapper"
  );

  if (!HowToManageCreditContentWrapper || !ruleData) {
    return <Loading />;
  }

  if (microFrontEndData?.accountSettings?.template === 2) {
    return (
      <Suspense fallback={<Loading />}>
        <HowToManageCreditDuo {...props} />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <HowToManageCreditContentWrapper>
        <HowToManageCreditContent />
      </HowToManageCreditContentWrapper>
    </Suspense>
  );
};
