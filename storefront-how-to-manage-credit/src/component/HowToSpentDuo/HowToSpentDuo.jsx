import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useSelector } from "react-redux";
import { EmptySvg } from "./EmptySvg";

export const HowToSpentDuo = () => {
  const getStore = GlobalStore.Get();
  const Loading = window.UnoDuoComponent("Loading");
  const HowToSpentContainer = window.UnoDuoComponent("HowToSpentContainer");
  const HowToSpentContentWrapper = window.UnoDuoComponent(
    "HowToSpentContentWrapper"
  );
  const HowToSpentHeader = window.UnoDuoComponent("HowToSpentHeader");
  const HowToSpentContainerWrapper = window.UnoDuoComponent(
    "HowToSpentContainerWrapper"
  );
  const SpentRuleChartMessage = window.UnoDuoComponent("SpentRuleChartMessage");
  const Empty = window.UnoDuoComponent("Empty");
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();

  const ruleData = useSelector(
    (state) => state.storeFrontHowToManageCredit.ruleData
  );
  const updated =
    ruleData?.length &&
    ruleData?.filter((item) => item?.tab_to_append === "flits_spent_rules");

  if (!ruleData) {
    return <Loading />;
  }
  return (
    <HowToSpentContentWrapper>
      <HowToSpentHeader />
      {updated?.length === 0 || ruleData?.length === 0 ? (
        <HowToSpentContainerWrapper>
          <SpentRuleChartMessage />
          <Empty
            svgProp={EmptySvg}
            message1={t(
              "flits.how_to_spend_credit_page.no_rule_found",
              "The store has not set up any rules yet.<br>Keep checking this space for more information.<br>Meanwhile let's continue shopping."
            )}
            needMT15={true}
            shopNowButton={t(
              "flits.how_to_spend_credit_page.blank_screen_button_text",
              "Start shopping"
            )}
          />
        </HowToSpentContainerWrapper>
      ) : (
        <HowToSpentContainerWrapper>
          <HowToSpentContainer item={updated} />
        </HowToSpentContainerWrapper>
      )}
    </HowToSpentContentWrapper>
  );
};
