import React from "react";
import { useSelector } from "react-redux";
import { GlobalStore } from "redux-micro-frontend";

export const RefundEmptyContent = () => {
  const getStore = GlobalStore.Get();
  const microFrontEndData = useSelector(
    (state) => state.storeFrontContainer.microFrontEndData
  );
  const refundCreditApiData = useSelector(
    (state) => state.storeFrontCredit.refundCreditApiData
  );
  const RefundCreditHistoryContentWrapper = window.UnoDuoComponent(
    "RefundCreditHistoryContentWrapper"
  );
  const RefundCreditTotalWrapper = window.UnoDuoComponent(
    "RefundCreditTotalWrapper"
  );
  const RefundCreditHeader = window.UnoDuoComponent("RefundCreditHeader");
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;
  const Empty = window.UnoDuoComponent("Empty");
  const { t } = useTranslationLanguage();
  return (
    <>
      {microFrontEndData?.accountSettings?.template === 2 ? (
        <RefundCreditTotalWrapper />
      ) : null}
      <RefundCreditHeader
        refundCredit={refundCreditApiData?.current_refund_credits}
      />
      <RefundCreditHistoryContentWrapper>
        <Empty
          isPositionRelative={true}
          isRefund={true}
          message1={t(
            "flits.credit_page.refund_blank_screen_line_1_html",
            "You have not made any returns eligible for a store credit."
          )}
          message2={t(
            "flits.credit_page.refund_blank_screen_line_2_html",
            "Your refunds will appear here in the form of store credits which you can use for shopping our products."
          )}
          shopNowButton={t(
            "flits.credit_page.refund_shop_now",
            "Continue shopping"
          )}
        />
      </RefundCreditHistoryContentWrapper>
    </>
  );
};
