import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Icon, Loader } from "../../../../../../components/index";
import { CountRules } from "../../../Helpers/CountRules";
import { EarningView } from "../../../View/EarningView/EarningView";
import { RedeemView } from "../../../View/RedeemView/RedeemView";
import CreditActivity from "../../../View/CreditActivity/CreditActivity";
import "./style.css";
import { ReferralSection } from "../../../Molecules/PointsReferralSection/ReferralSection/ReferralSection";
import { setPagesViewClicks } from "../../../../../../redux/reducer/rewardWidgetSlice";
import { EarnSectionCard } from "../../../Molecules/PointsReferralSection/EarnSectionCard/EarnSectionCard";
import { SpentSectionCard } from "../../../Molecules/PointsReferralSection/SpentSectionCard/SpentSectionCard";
import { ReferRuleView } from "../../../View/ReferRuleView/ReferRuleView";
import BannerSection from "../../../../../BannerSection/BannerSection";
import { ShowCreditSection } from "../../../../../BannerSection/ShowCreditSection";
import { ProcessReferRules } from "../../../Helpers/ProcessReferRules";

function WidgetScreen() {
  const { adminT } =
    window?.flitsThemeAppExtensionObjects?.useTranslationLanguage;
  const { pagesViewClicks, customerCreditRules, noLoginRules, creditData } =
    useSelector((state) => state.rewardWidget);
  const dispatch = useDispatch();
  const creditRules = window?.flitsThemeAppExtensionObjects?.customerExist
    ? customerCreditRules
    : noLoginRules;

  const backButtonClick = useCallback(() => {
    dispatch(
      setPagesViewClicks({
        ...pagesViewClicks,
        defaultView: true,
        earningView: false,
        redeemView: false,
        howItWorksView: false,
        cractivityView: false,
        referRuleView: false,
      })
    );
  }, [dispatch, pagesViewClicks]);

  function creditViewClick() {
    dispatch(
      setPagesViewClicks({
        ...pagesViewClicks,
        defaultView: false,
        cractivityView: true,
      })
    );
  }

  useEffect(() => {
    if (
      creditRules &&
      !pagesViewClicks?.ruleCounts &&
      !pagesViewClicks?.referRules
    ) {
      const { totalEarningRules, totalSpendingRules } = CountRules(creditRules);
      const processedRules = window?.flitsThemeAppExtensionObjects?.scReferOn
        ? ProcessReferRules(creditRules)
        : false;
      dispatch(
        setPagesViewClicks({
          ...pagesViewClicks,
          ruleCounts: { totalEarningRules, totalSpendingRules },
          referRules: processedRules
            ? processedRules[0]
            : pagesViewClicks?.referRules,
        })
      );
    }
  }, [creditRules, dispatch, pagesViewClicks]);

  if (!pagesViewClicks?.ruleCounts) {
    return <Loader active={true} />;
  }
  if (window?.flitsThemeAppExtensionObjects?.customerExist && creditData) {
    window.flitsRewardAcceptMarketing = creditData?.customer?.accepts_marketing;
  }

  return (
    <>
      <div
        className={`defualt-view-wrapper flits-no-login-default-view flits-fadeslideOut-animation ${
          !pagesViewClicks?.defaultView ? "hide" : ""
        }`}
      >
        <div className="flits-widget-fixed-header">
          <h3>
            {!window?.flitsThemeAppExtensionObjects?.customerExist
              ? adminT(
                  "banner.guest_description",
                  "Welcome back to Flits rewards"
                )
              : adminT(
                  "banner.member_description",
                  "Welcome back to Flits rewards"
                )}
          </h3>
        </div>
        <div
          className={`flits-widget-header ${
            window?.flitsThemeAppExtensionObjects?.customerExist
              ? "flits-widget-header-padding-adjust"
              : ""
          }`}
        >
          <h2>
            {window?.flitsThemeAppExtensionObjects?.customerExist
              ? adminT("banner.member_title", "Hi, {{ customer_name }}!", {
                  customer_name:
                    window?.flitsThemeAppExtensionObjects?.customer.first_name,
                })
              : adminT("banner.guest_title", "Hello!")}
          </h2>
          <div className="flits-widget-subhead-with-icon">
            <h3>
              {!window?.flitsThemeAppExtensionObjects?.customerExist
                ? adminT(
                    "banner.guest_description",
                    "Welcome back to Flits rewards"
                  )
                : adminT(
                    "banner.member_description",
                    "Welcome back to Flits rewards"
                  )}
            </h3>
            {window?.flitsThemeAppExtensionObjects?.customerExist ? (
              <div
                className="flits-widget-activity-icon"
                onClick={creditViewClick}
                title="Credit Activity"
              >
                <Icon
                  icon={window?.flits_icons?.flits?.icons?.credit_activity_log}
                />
              </div>
            ) : null}
          </div>
        </div>
        {window?.flitsThemeAppExtensionObjects?.customerExist ? (
          <ShowCreditSection />
        ) : (
          <div className="flits-widget-otp-main">
            <BannerSection />
          </div>
        )}
        <div className="flits-widget-body flits-fadeslideOut-animation">
          <div className="flits-widget-point-section">
            <div className="flits-widget-section-head">
              <h2>{adminT("reward.title", "Rewards")}</h2>
              <p>
                {adminT(
                  "reward.description",
                  "Earn rewards for different actions, and redeem those to maximise savings."
                )}
              </p>
            </div>
          </div>
          <EarnSectionCard />
          <SpentSectionCard />
          {window?.flitsThemeAppExtensionObjects?.scReferOn ? (
            <ReferralSection />
          ) : null}
        </div>
        <div className="flits-widget-sticky-footer"></div>
      </div>
      {pagesViewClicks?.earningView ? (
        <EarningView backButtonClick={backButtonClick} />
      ) : null}
      {pagesViewClicks?.redeemView ? (
        <RedeemView backButtonClick={backButtonClick} />
      ) : null}
      {pagesViewClicks?.referRuleView ? (
        <ReferRuleView backButtonClick={backButtonClick} />
      ) : null}
      {pagesViewClicks?.cractivityView ? (
        <CreditActivity backButtonClick={backButtonClick} />
      ) : null}
    </>
  );
}
export default WidgetScreen;
