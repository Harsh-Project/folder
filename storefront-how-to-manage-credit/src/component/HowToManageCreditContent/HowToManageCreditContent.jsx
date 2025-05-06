import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useState } from "react";
import { useSelector } from "react-redux";
import { HowToEarn } from "../HowToEarn/HowToEarn";
import { HowToSpent } from "../HowToSpent/HowToSpent";
import { FromStoreOwner } from "../FromStoreOwner/FromStoreOwner";
import { RuleContent } from "../RuleContent/RuleContent";

const componentMap = {
  HowToEarn,
  FromStoreOwner,
  HowToSpent,
};

export const HowToManageCreditContent = () => {
  const microFrontEndData = useSelector(
    (state) => state.storeFrontContainer.microFrontEndData
  );
  // eslint-disable-next-line no-unused-vars
  const [manageCreditJsonTemplate, setManageCreditJsonTemplate] = useState(
    microFrontEndData?.microfront_remotes?.remotes?.storeFrontHowToManageCredit
      ?.jsonTemplate
  );

  const getStore = GlobalStore.Get();
  const Empty = window.UnoDuoComponent("Empty");
  const Loading = window.UnoDuoComponent("Loading");
  const ButtonWrapper = window.UnoDuoComponent("ButtonWrapper");
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;
  const RuleWrapper = window.UnoDuoComponent("RuleWrapper");

  const { t } = useTranslationLanguage();
  const ruleData = useSelector(
    (state) => state.storeFrontHowToManageCredit.ruleData
  );

  const getTotal = () => {
    for (let i = 0; i < ruleData?.length; i++) {
      if (ruleData[i]?.tab_to_append === "flits_from_admin_rules") {
        return true;
      }
    }

    return false;
  };

  const getRule = () => {
    for (let i = 0; i < ruleData?.length; i++) {
      if (ruleData[i]?.tab_to_append === "flits_earning_rules") {
        return true;
      }
    }

    return false;
  };
  const getSpent = () => {
    for (let i = 0; i < ruleData?.length; i++) {
      if (ruleData[i]?.tab_to_append === "flits_spent_rules") {
        return true;
      }
    }

    return false;
  };

  if (!ruleData || !ButtonWrapper) {
    return <Loading />;
  }

  if (ruleData && ruleData?.length === 0) {
    return (
      <Empty
        message1={t(
          "flits.how_to_earn_credit_page.no_rule_found",
          "The store has not set up any rules yet.<br>Keep checking this space for more information.<br>Meanwhile let's continue shopping."
        )}
        shopNowButton={t(
          "flits.how_to_earn_credit_page.blank_screen_button_text",
          "Start shopping"
        )}
      />
    );
  }

  return (
    <>
      <ButtonWrapper>
        {manageCreditJsonTemplate.map((item1, index) => {
          const DynamicComponent = componentMap[item1.component];
          if (item1?.component === "FromStoreOwner" && !getTotal()) {
            return null;
          }
          if (item1?.component === "HowToEarn" && !getRule()) {
            return null;
          }

          if (item1.component === "HowToSpent" && !getSpent()) {
            return null;
          }
          return <DynamicComponent {...item1} key={index} />;
        })}
      </ButtonWrapper>
      <RuleWrapper>
        <RuleContent />
      </RuleWrapper>
    </>
  );
};
