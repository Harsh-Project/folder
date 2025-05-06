import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useSelector } from "react-redux";
import { TotalCredit } from "../TotalCredit/TotalCredit";

export const EmptyContent = () => {
  const getStore = GlobalStore.Get();
  const CreditHistoryContentWrapper = window.UnoDuoComponent(
    "CreditHistoryContentWrapper"
  );
  const CreditTotalWrapper = window.UnoDuoComponent("CreditTotalWrapper");
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;
  const Empty = window.UnoDuoComponent("Empty");
  const { t } = useTranslationLanguage();
  const creditData = useSelector((state) => state.storeFrontCredit.creditData);
  return (
    <>
      <CreditTotalWrapper>
        <TotalCredit creditData={creditData} />
      </CreditTotalWrapper>
      <CreditHistoryContentWrapper>
        <Empty
          isPositionRelative={true}
          message1={t(
            "flits.credit_page.blank_screen_line_1_html",
            "You are missing out on taking advantage of<br>our Reward Program."
          )}
          message2={t(
            "flits.credit_page.blank_screen_line_2_html",
            "So why wait? Start shopping our products to start earning rewards."
          )}
          shopNowButton={t(
            "flits.credit_page.blank_screen_button_text",
            "Start shopping"
          )}
        />
      </CreditHistoryContentWrapper>
    </>
  );
};
