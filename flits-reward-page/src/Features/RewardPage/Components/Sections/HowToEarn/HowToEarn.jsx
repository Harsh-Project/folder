import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useTranslationLanguage } from "../../Helpers/UseTranslation";
import { useGeneralSubscriptionSave } from "../../Services/Flits/generalSubscriptionSave";
import LogEmptyView from "../../Atoms/LogEmptyView/LogEmptyView";
import { UseSnackbar } from "../../Molecules/Snackbar/UseSnackbar";
import SnackBar from "../../Molecules/Snackbar/Snackbar";
import { UseProcessEarningRules } from "../../Helpers/ProcessEarningRules";
import "./style.css";
import ReactDOM from "react-dom";

function HowToEarn() {
  // eslint-disable-next-line
  const isCustomer = window?.flitsRewardPageObjects?.customer ? true : false;
  const [earningRules, setEarningRules] = useState(null);

  const { themeT, adminT } = useTranslationLanguage();
  const { isActive, message, type, openSnackBar } = UseSnackbar();
  const { generalSubscriptionSave } = useGeneralSubscriptionSave();

  const noLoginRules = useSelector((state) => state.rewardPage.noLoginRules);
  const creditRules = useSelector(
    (state) => state.rewardPage.customerCreditRules
  );
  const icon = useSelector((state) => state.rewardPage.icons);
  const isEnable =
    window?.flitsRewardPageObjects?.Metafields
      ?.FLITS_EXTENSION_ONSITE_CONTENT_REWARD_PAGE?.how_to_earn?.is_enable;

  async function subscribeClick(event) {
    event.preventDefault();
    if (isCustomer) {
      const parentElement = event.target.closest(
        ".flits-reward-page-earn-item"
      );
      if (parentElement) {
        parentElement.classList.add("flits-earned-box");
        parentElement.setAttribute("earned", "true");
      }
      openSnackBar(
        themeT(
          "flits.how_to_earn_credit_page.subscribed_successfully",
          "Your request to receive a mail subscription from the store is being accepted."
        ),
        "success"
      );
      let subscriptionSave = await generalSubscriptionSave();
      if (subscriptionSave.status === true) {
        openSnackBar(
          themeT(
            "flits.how_to_earn_credit_page.subscribing_email",
            "Your request to receive a mail subscription from the store is being accepted."
          ),
          "success"
        );
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
      window.location.href = `${
        !window?.flitsRewardPageObjects?.request?.locale?.shop_locale?.primary
          ? `/${
              window?.flitsRewardPageObjects?.request?.locale?.shop_locale?.locale?.split(
                "-"
              )?.[0]
            }`
          : ""
      }/account#/howToEarn`;
    }
  }

  const CallProcessRule = useCallback(
    (creditRules) => {
      const processedRules = UseProcessEarningRules(creditRules, themeT, icon);
      setEarningRules(processedRules);
    },
    [themeT, icon]
  );

  useEffect(() => {
    if (isCustomer && !earningRules) {
      if (creditRules) {
        CallProcessRule(creditRules);
      }
    } else if (!earningRules) {
      if (noLoginRules) {
        CallProcessRule(noLoginRules);
      }
    }
  }, [CallProcessRule, creditRules, isCustomer, noLoginRules, earningRules]);

  if (!isEnable) {
    return null;
  }

  return (
    <>
      <section
        className="flits-reward-page-ways-to-earn"
        id="flits-reward-page-ways-to-earn"
      >
        <div className="flits-reward-page-earn-inner flits-reward-page-section-container">
          <div className="flits-reward-page-header">
            {adminT("how_to_earn.title", "Ways to earn")}
          </div>
          <div className="flits-reward-page-sub-header">
            {adminT(
              "how_to_earn.description",
              "Earn credits for all the activities listed below."
            )}
          </div>
          <div className="flits-reward-page-earn-row">
            {!earningRules || earningRules.length === 0 ? (
              <LogEmptyView />
            ) : (
              earningRules.map((rule, index) => (
                <div
                  className={`flits-reward-page-earn-item ${
                    rule.isEarned || rule.isEarned === "true"
                      ? "flits-reward-page-earned-item"
                      : ""
                  }`}
                  key={index}
                  earned={rule.isEarned ? "true" : undefined}
                >
                  <div className="flits-reward-page-earn-item-box">
                    <div className="flits-reward-page-earn-icon">
                      {rule.icon.type === "code" ? (
                        <span
                          dangerouslySetInnerHTML={{ __html: rule.icon.code }}
                          className="flits-reward-svg-span"
                        />
                      ) : (
                        <img src={rule.icon.url} alt="" />
                      )}
                    </div>
                    <div className="flits-reward-page-earn-title">
                      {rule.title}
                    </div>
                    <div
                      className="flits-reward-page-earn-info"
                      dangerouslySetInnerHTML={{ __html: rule.description }}
                    />
                    {isCustomer ? (
                      <div className="flits-reward-page-earn-redirect">
                        <a
                          href={rule.linkTo}
                          onClick={
                            rule.moduleOn === "subscribe"
                              ? subscribeClick
                              : undefined
                          }
                        >
                          {rule?.linkBtntext ??
                            themeT(
                              "flits.reward_page.how_to_earn_credit_page.redeem_now_button_text",
                              "Redeem now"
                            )}
                          {icon.flits.icons.forward_arrow &&
                          icon.flits.icons.forward_arrow.type === "code" ? (
                            <span
                              dangerouslySetInnerHTML={{
                                __html: icon.flits.icons.forward_arrow.code,
                              }}
                            />
                          ) : (
                            <img
                              src={icon.flits.icons.forward_arrow.url}
                              alt=""
                            />
                          )}
                        </a>
                      </div>
                    ) : null}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
      {ReactDOM.createPortal(
        <SnackBar isActive={isActive} message={message} type={type} />,
        document.body
      )}
    </>
  );
}

export default HowToEarn;
