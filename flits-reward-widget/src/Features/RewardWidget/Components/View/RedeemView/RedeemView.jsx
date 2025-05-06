import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  RewardRedeemBox,
  InnerScreenBackView,
} from "../../../../../components/index";
import { ProcessSpentRules } from "../../Helpers/ProcessSpentRules";
import LogEmptyView from "../../Atoms/LogEmptyView/LogEmptyView";

export const RedeemView = ({ backButtonClick }) => {
  const isCustomer = window?.flitsThemeAppExtensionObjects?.customerExist
    ? true
    : false;
  const [spentRules, setSpentRules] = useState(null);
  const { adminT, themeT } =
    window?.flitsThemeAppExtensionObjects?.useTranslationLanguage;
  const noLoginRules = useSelector((state) => state.rewardWidget.noLoginRules);
  const creditRules = useSelector(
    (state) => state.rewardWidget.customerCreditRules
  );
  let redeemLink = window?.commonEndpoint?.login ?? "/account/login";
  let redeemLinkBtnText = themeT(
    "flits.reward_widget.how_to_spend_credit_page.cart_rule_btn_text_guest",
    "Login"
  );
  if (isCustomer) {
    redeemLink = `${window?.commonEndpoint?.collection ?? ""}/collections/all`;
    redeemLinkBtnText = themeT(
      "flits.reward_widget.how_to_spend_credit_page.cart_rule_btn_text_member",
      "Redeem"
    );
  }

  useEffect(() => {
    if (isCustomer && !spentRules) {
      if (creditRules) {
        const processedRules = ProcessSpentRules(creditRules);
        setSpentRules(processedRules);
      }
    } else if (!spentRules) {
      if (noLoginRules) {
        const processedRules = ProcessSpentRules(noLoginRules);
        setSpentRules(processedRules);
      }
    }
  }, [isCustomer, spentRules, creditRules, noLoginRules]);
  return (
    <div>
      <InnerScreenBackView
        backButtonClick={backButtonClick}
        backScreenText={
          window?.flitsThemeAppExtensionObjects?.customerExist
            ? adminT(
                "banner.member_description",
                "Welcome back to Flits rewards"
              )
            : adminT(
                "banner.guest_description",
                "Welcome back to Flits rewards"
              )
        }
      />
      <div className="flits-widget-inside-body flits-fadeslideIn-animation">
        <div className="flits-widget-inside-body-head">
          {adminT("reward.spend_reward_card_title", "Ways to redeem")}
        </div>
        {!spentRules || spentRules.length === 0 ? (
          <LogEmptyView
            langConfig={{
              empty_head: themeT(
                "flits.how_to_spend_credit_page.no_rule_found",
                "The store has not set up any rules yet"
              ),
            }}
            icon={window?.flits_icons?.flits?.icons?.credit_rule_not_found}
          />
        ) : (
          spentRules.map((rule, index) => (
            <RewardRedeemBox
              key={index}
              icon={rule.icon}
              title={rule.title}
              description={rule.description}
              linkTo={redeemLink}
              btn_text={rule.linkButtonText ?? redeemLinkBtnText}
            />
          ))
        )}
      </div>
      <div className="flits-widget-sticky-footer"></div>
    </div>
  );
};
