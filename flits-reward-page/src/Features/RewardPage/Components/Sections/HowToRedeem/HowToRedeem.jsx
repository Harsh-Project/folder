import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ProcessSpentRules } from "../../Helpers/ProcessSpentRules";
import LogEmptyView from "../../Atoms/LogEmptyView/LogEmptyView";
import { useTranslationLanguage } from "../../Helpers/UseTranslation";
import "./style.css";

export const HowToRedeem = () => {
  // eslint-disable-next-line
  const isCustomer = window.flitsRewardPageObjects.customer ? true : false;
  const [spentRules, setSpentRules] = useState(null);

  const { themeT, adminT } = useTranslationLanguage();
  const icon = useSelector((state) => state.rewardPage.icons);

  const noLoginRules = useSelector((state) => state.rewardPage.noLoginRules);
  const creditRules = useSelector(
    (state) => state.rewardPage.customerCreditRules
  );
  const isEnable =
    window?.flitsRewardPageObjects?.Metafields
      ?.FLITS_EXTENSION_ONSITE_CONTENT_REWARD_PAGE?.how_to_redeem?.is_enable;

  const CallSpentRule = useCallback(
    (creditRules) => {
      const processedRules = ProcessSpentRules(creditRules, themeT, icon);
      setSpentRules(processedRules);
    },
    [icon, themeT]
  );

  useEffect(() => {
    if (isCustomer && !spentRules) {
      if (creditRules) {
        CallSpentRule(creditRules);
      }
    } else if(!spentRules) {
      if (noLoginRules) {
        CallSpentRule(noLoginRules);
      }
    }
  }, [CallSpentRule, creditRules, isCustomer, noLoginRules, spentRules]);

  if (!isEnable) {
    return null;
  }

  return (
    <>
      <section
        className="flits-reward-page-ways-to-redeem"
        id="flits-reward-page-ways-to-redeem"
      >
        <div className="flits-reward-page-redeem-inner flits-reward-page-section-container">
          <div className="flits-reward-page-header">
            {adminT("how_to_redeem.title", "How to redeem")}
          </div>
          <div className="flits-reward-page-sub-header">
            {adminT(
              "how_to_redeem.description",
              "Reap the benefits of your hard earned rewards. Redeem and lower your shopping expenses!"
            )}
          </div>
          <div className="flits-reward-page-redeem-row">
            {!spentRules || spentRules?.length === 0 ? (
              <LogEmptyView />
            ) : (
              spentRules.map((rule, index) => (
                <div className="flits-reward-page-redeem-item" key={index}>
                  <div className="flits-reward-page-redeem-icon">
                    {rule.icon.type === "code" ? (
                      <span
                        dangerouslySetInnerHTML={{ __html: rule.icon.code }}
                        className="flits-reward-svg-span"
                      />
                    ) : (
                      <img src={rule.icon.url} alt="" />
                    )}
                  </div>
                  <div
                    className="flits-reward-page-redeem-title"
                    dangerouslySetInnerHTML={{
                      __html: rule?.title,
                    }}
                  />
                  <div
                    className="flits-reward-page-redeem-info"
                    dangerouslySetInnerHTML={{ __html: rule.description }}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};
