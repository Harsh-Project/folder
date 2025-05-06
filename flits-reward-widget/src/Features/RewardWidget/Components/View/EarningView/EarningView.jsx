import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  RewardRedeemBox,
  InnerScreenBackView,
} from "../../../../../components/index";
import { ProcessEarningRules } from "../../Helpers/ProcessEarningRules";
import LogEmptyView from "../../Atoms/LogEmptyView/LogEmptyView";
import { useGeneralSubscriptionSave } from "../../Services/Flits/generalSubscriptionSave";
import { UseSnackbar } from "../../../../../Helper/SnackBar/UseSnackbar";
import SnackBar from "../../../../../Helper/SnackBar/Snackbar";

export const EarningView = ({ backButtonClick }) => {
  const isCustomer = window?.flitsThemeAppExtensionObjects?.customerExist
    ? true
    : false;
  const [earningRules, setEarningRules] = useState(null);
  const { isActive, message, type, openSnackBar } = UseSnackbar();
  const { generalSubscriptionSave } = useGeneralSubscriptionSave();
  const { adminT, themeT } =
    window?.flitsThemeAppExtensionObjects?.useTranslationLanguage;
  const noLoginRules = useSelector((state) => state.rewardWidget.noLoginRules);
  const creditRules = useSelector(
    (state) => state.rewardWidget.customerCreditRules
  );

  function registerClick(event) {
    event.preventDefault();
    if (window.loginType === "otp") {
      backButtonClick();
    } else {
      window.location.href =
        window?.commonEndpoint?.register ?? "/account/register";
    }
  }
  async function subscribeClick(event) {
    event.preventDefault();
    if (isCustomer) {
      const parentElement = event.target.closest(".flits-reward-redeem-box");
      if (parentElement) {
        parentElement.classList.add("flits-earned-box");
      }
      openSnackBar(
        themeT(
          "flits.how_to_earn_credit_page.subscribing_email",
          "Your request to receive a mail subscription from the store is being accepted."
        ),
        "success"
      );
      let subscriptionSave = await generalSubscriptionSave();
      if (subscriptionSave.status === true) {
        openSnackBar(
          themeT(
            "flits.how_to_earn_credit_page.subscribed_successfully",
            "Hurray! You will recieve subscriber credit in a short while."
          ),
          "success"
        );
        let updateView = earningRules?.map((ruleData) => ruleData?.moduleOn !== "subscribe" ? ruleData : {...ruleData, isEarned: true})
        setEarningRules(updateView)
      } else {
        openSnackBar(
          themeT(
            "flits.general.something_went_wrong",
            "Something went wrong. Please try again."
          ),
          "alert"
        );
      }
    } else {
      window.location.href = window?.flitsThemeAppExtensionObjects
        ?.customerExist
        ? window?.commonEndpoint?.login ?? "/account/login"
        : !window?.flitsThemeAppExtensionObjects?.request?.locale?.shop_locale
            ?.primary
        ? `/${
            window?.flitsThemeAppExtensionObjects?.request?.locale?.shop_locale?.locale?.split(
              "-"
            )?.[0]
          }/account#howToEarn`
        : "/account#howToEarn";
    }
  }

  useEffect(() => {
    if (isCustomer && !earningRules) {
      if (creditRules) {
        const processedRules = ProcessEarningRules(creditRules);
        setEarningRules(processedRules);
      }
    } else if (!earningRules) {
      if (noLoginRules) {
        const processedRules = ProcessEarningRules(noLoginRules);
        setEarningRules(processedRules);
      }
    }
  }, [isCustomer, earningRules, noLoginRules, creditRules]);
  return (
    <>
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
            {adminT("reward.earn_reward_card_title", "Ways to earn")}
          </div>
          {!earningRules || earningRules?.length === 0 ? (
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
            earningRules.map((rule, index) =>
              rule.moduleOn === "register" ? (
                <RewardRedeemBox
                  key={index}
                  icon={rule.icon}
                  title={rule.title}
                  description={rule.description}
                  linkTo={rule.linkTo}
                  btn_text={rule.linkBtntext}
                  isEarned={rule.isEarned}
                  RewardRedeemBtnClick={registerClick}
                  moduleOn={rule.moduleOn}
                />
              ) : rule.moduleOn === "subscribe" ? (
                <RewardRedeemBox
                  key={index}
                  icon={rule.icon}
                  title={rule.title}
                  description={rule.description}
                  linkTo={rule.linkTo}
                  btn_text={rule.linkBtntext}
                  isEarned={rule.isEarned}
                  RewardRedeemBtnClick={subscribeClick}
                  moduleOn={rule.moduleOn}
                />
              ) : (
                <RewardRedeemBox
                  key={index}
                  icon={rule.icon}
                  title={rule.title}
                  description={rule.description}
                  linkTo={rule.linkTo}
                  btn_text={rule.linkBtntext}
                  isEarned={rule.isEarned}
                  moduleOn={rule.moduleOn}
                />
              )
            )
          )}
        </div>
        <div className="flits-widget-sticky-footer"></div>
      </div>
      <SnackBar isActive={isActive} message={message} type={type} />
    </>
  );
};
