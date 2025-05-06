import React from "react";
import { useTranslationLanguage } from "../../Helpers/UseTranslation";
import "./style.css";

function HeroItWorks(props) {
  const { adminT } = useTranslationLanguage();
  const isEnable =
    window?.flitsRewardPageObjects?.Metafields
      ?.FLITS_EXTENSION_ONSITE_CONTENT_REWARD_PAGE?.how_it_works?.is_enable;
  if (!isEnable) {
    return null;
  }
  return (
    <>
      <section
        className="flits-reward-page-how-it"
        id="flits-reward-page-how-it"
      >
        <div className="flits-reward-page-how-it-inner flits-reward-page-section-container">
          <div className="flits-reward-page-header">
            {adminT("how_it_works.title", "How it works?")}
          </div>
          <div
            className="flits-reward-page-sub-header"
            dangerouslySetInnerHTML={{
              __html: adminT(
                "how_it_works.description",
                "Become a registered customer to start earning rewards.<br /> Earn rewards for in-store activities, purchases, and more.<br /> Redeem your rewards and save!"
              ),
            }}
          />
          <div className="flits-reward-page-how-it-row">
            <div className="flits-reward-page-how-it-row-item flits-reward-page-how-it-step-one">
              <div className="flits-reward-page-how-it-step-box">1</div>
              <div className="flits-reward-page-how-it-box-title">
                {adminT("how_it_works.step1_title", "SIGN UP?")}
              </div>
              <div className="flits-reward-page-how-it-box-info">
                {adminT(
                  "how_it_works.step1_description",
                  "Create an account on our store."
                )}
              </div>
            </div>
            <div className="flits-reward-page-how-it-row-item flits-reward-page-how-it-step-two">
              <div className="flits-reward-page-how-it-step-box">2</div>
              <div className="flits-reward-page-how-it-box-title">
                {adminT("how_it_works.step2_title", "EARN POINTS")}
              </div>
              <div className="flits-reward-page-how-it-box-info">
                {adminT(
                  "how_it_works.step2_description",
                  "Earn points every time you shop."
                )}
              </div>
            </div>
            <div className="flits-reward-page-how-it-row-item flits-reward-page-how-it-step-three">
              <div className="flits-reward-page-how-it-step-box">3</div>
              <div className="flits-reward-page-how-it-box-title">
                {adminT("how_it_works.step3_title", "REDEEM POINTS")}
              </div>
              <div className="flits-reward-page-how-it-box-info">
                {adminT(
                  "how_it_works.step3_description",
                  "Redeem points for exclusive discounts."
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HeroItWorks;
