import React from "react";
import { useState } from "react";
import { InnerScreenBackView } from "../../../../../components/index";
import LogView from "./LogView";
import "./style.css";

function CreditActivity({ backButtonClick }) {
  const [creditTab, setCreditTab] = useState(true);
  const [referTab, setReferTab] = useState(false);

  const { adminT } =
    window?.flitsThemeAppExtensionObjects?.useTranslationLanguage;
  function creditTabClick() {
    if (!creditTab) {
      setReferTab(false);
      setCreditTab(true);
    }
  }

  function referTabClick() {
    if (!referTab) {
      setCreditTab(false);
      setReferTab(true);
    }
  }

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
          {adminT("points_activity.title", "Rewards activity")}
        </div>
        <div className="flits-widget-activity-tab-wrap">
          {window?.flitsThemeAppExtensionObjects?.scReferOn ? (
            <div className="flits-widget-activity-tab-head">
              <div
                className={`flits-widget-activity-tab ${
                  creditTab ? "active" : ""
                }`}
                onClick={creditTabClick}
              >
                {adminT(
                  "points_activity.credit_activity_section_title",
                  "Rewards"
                )}
              </div>
              <div
                className={`flits-widget-activity-tab ${
                  referTab ? "active" : ""
                }`}
                onClick={referTabClick}
              >
                {adminT(
                  "points_activity.referral_activity_section_title",
                  "Referrals"
                )}
              </div>
            </div>
          ) : null}
          <div className="flits-widget-activity-tab-body">
            {creditTab ? (
              <LogView
                creditHandle="creditData"
                langHandle="credit_log_empty"
                backButtonClick={backButtonClick}
              />
            ) : (
              ""
            )}
            {referTab ? (
              <LogView
                creditHandle="referralData"
                langHandle="referrals_log_empty"
                backButtonClick={backButtonClick}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div className="flits-widget-sticky-footer"></div>
    </div>
  );
}

export default CreditActivity;
