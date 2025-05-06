import React from "react";
import { useSelector } from "react-redux";
import { GlobalStore } from "redux-micro-frontend";
import { EmptySvg } from "./EmptySvg";

export const HowToEarnDuo = () => {
  const getStore = GlobalStore.Get();
  const ruleData = useSelector(
    (state) => state.storeFrontHowToManageCredit.ruleData
  );
  const HowToEarnCard =
    window.UnoDuoComponent("HowToEarnCard");
  const HowToEarnContentWrapper =
    window.UnoDuoComponent("HowToEarnContentWrapper");
  const Loading = window.UnoDuoComponent("Loading");
  const Empty = window.UnoDuoComponent("Empty");
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();
  const HowToEarnHeader =
    window.UnoDuoComponent("HowToEarnHeader");
  const HowToEarnCardWrapper =
    window.UnoDuoComponent("HowToEarnCardWrapper");
  const howToManageCreditMode = useSelector(
    (state) => state.storeFrontHowToManageCredit.howToManageCreditMode
  );
  const howToManageCreditMessage = useSelector(
    (state) => state.storeFrontHowToManageCredit.howToManageCreditMessage
  );
  const SnackBar = window.UnoDuoComponent("SnackBar");

  const getRule = () => {
    for (let i = 0; i < ruleData?.length; i++) {
      if (ruleData[i]?.tab_to_append === "flits_earning_rules" && ruleData[i]?.module_on !== "referrer_friend" &&
      ruleData[i]?.module_on !== "referrals_total_number" &&
      ruleData[i]?.module_on !== "referrals_order_number" &&
      ruleData[i]?.module_on !== "referrals_total_spent") {
        return true;
      }
    }

    return false;
  };

  if(!ruleData) {
    return <Loading />
  }
  return (
    <>
      <HowToEarnContentWrapper>
      <HowToEarnHeader />
      {(ruleData && ruleData?.length && !getRule()) ||
      ruleData?.length === 0 ? (
        <Empty
          svgProp={EmptySvg}
          message1={t("flits.how_to_earn_credit_page.no_rule_found", "The store has not set up any rules yet.<br>Keep checking this space for more information.<br>Meanwhile let's continue shopping.")}
          shopNowButton={t("flits.how_to_earn_credit_page.blank_screen_button_text", "Start shopping")}
        />
      ) : (
        <HowToEarnCardWrapper>
          {ruleData?.length > 0 &&
            ruleData?.map((item, index) => {
              if (
                item?.tab_to_append === "flits_earning_rules" &&
                item?.module_on !== "referrer_friend" &&
                item?.module_on !== "referrals_total_number" &&
                item?.module_on !== "referrals_order_number" &&
                item?.module_on !== "referrals_total_spent"
              ) {
                return <HowToEarnCard key={index} item={item} />;
              }

              return null;
            })}
        </HowToEarnCardWrapper>
      )}
    </HowToEarnContentWrapper>
    <SnackBar mode={howToManageCreditMode} message={howToManageCreditMessage} />
    </>
  );
};
