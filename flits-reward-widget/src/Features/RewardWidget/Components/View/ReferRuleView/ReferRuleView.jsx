import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  RewardRedeemBox,
  InnerScreenBackView,
} from "../../../../../components/index";
import { ProcessReferRules } from "../../Helpers/ProcessReferRules";
import LogEmptyView from "../../Atoms/LogEmptyView/LogEmptyView";
import React from "react";
import { setPagesViewClicks } from "../../../../../redux/reducer/rewardWidgetSlice";

export const ReferRuleView = ({ backButtonClick }) => {
  const isCustomer = window?.flitsThemeAppExtensionObjects?.customerExist
    ? true
    : false;
  const [earningRules, setEarningRules] = useState(null);
  const { adminT, themeT } =
    window?.flitsThemeAppExtensionObjects?.useTranslationLanguage;
  const { pagesViewClicks, noLoginRules } = useSelector(
    (state) => state.rewardWidget
  );
  const creditRules = useSelector(
    (state) => state.rewardWidget.customerCreditRules
  );
  const dispatch = useDispatch();

  const RewardRedeemBtnClick = () => {
    dispatch(
      setPagesViewClicks({
        ...pagesViewClicks,
        defaultView: true,
        earningView: false,
        redeemView: false,
        howItWorksView: false,
        cractivityView: false,
        referRuleView: false,
        fromReferView: true,
      })
    );
  };

  useEffect(() => {
    if (!earningRules && isCustomer) {
      if (creditRules) {
        const processedRules = ProcessReferRules(creditRules);
        setEarningRules(processedRules);
      }
    } else if (!earningRules) {
      if (noLoginRules) {
        const processedRules = ProcessReferRules(noLoginRules);
        setEarningRules(processedRules);
      }
    }
  }, [earningRules, isCustomer, noLoginRules, creditRules]);
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
          {adminT("refer_friend.card_title", "Referral rewards")}
        </div>
        {!earningRules || earningRules.length === 0 ? (
          <LogEmptyView
            langConfig={{
              empty_head: themeT(
                "flits.how_to_earn_credit_page.no_rule_found",
                "The store has not set up any rules yet"
              ),
            }}
            icon={window?.flits_icons?.flits?.icons?.credit_rule_not_found}
          />
        ) : (
          earningRules.map((rule, index) => (
            <RewardRedeemBox
              key={index}
              icon={rule.icon}
              title={rule.title}
              description={rule.description}
              linkTo={rule.linkTo}
              btn_text={rule.linkBtntext}
              isEarned={rule.isEarned}
              RewardRedeemBtnClick={RewardRedeemBtnClick}
            />
          ))
        )}
      </div>
      <div className="flits-widget-sticky-footer"></div>
    </div>
  );
};
