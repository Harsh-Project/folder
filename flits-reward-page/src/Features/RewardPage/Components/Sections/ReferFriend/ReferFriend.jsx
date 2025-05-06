import React, { useState } from "react";
import { useTranslationLanguage } from "../../Helpers/UseTranslation";
import { ReferralLink } from "../../Helpers/ReferralLink";
import ShareBtns from "../../Molecules/ShareBtns/ShareBtns";
import "./style.css";

function ReferFriend() {
  // eslint-disable-next-line
  const [customer, setCustomer] = useState(
    window.flitsRewardPageObjects.customer
  );

  const { themeT, adminT } = useTranslationLanguage();
  const isEnable =
    window?.flitsRewardPageObjects?.Metafields
      ?.FLITS_EXTENSION_ONSITE_CONTENT_REWARD_PAGE?.refer_friend?.is_enable;

  function copyBtnClick(e) {
    let input = e.target.parentNode.querySelector(
      'input[name="flits_reward_page_referral_link"]'
    );
    if (input) {
      input.select();
      document.execCommand("copy");
      var svgIcon =
        '<svg class="flits-widget-tick-svg" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M1.16663 7.16669L4.08329 10.0834L12.8333 0.916687" /> </svg>';
      e.target.innerHTML = svgIcon;
      setTimeout(function () {
        e.target.textContent = "Copy";
      }, 3500);
    }
  }

  if (!isEnable) {
    return null;
  }

  if (!window.flitsRewardPageObjects?.scReferOn) {
    return null;
  }

  return (
    <>
      <section
        className="flits-reward-page-refer-friend flits-reward-page-banner"
        id="flits-reward-page-refer-friend"
      >
        <div
          className="flits-reward-page-banner-image"
          style={{
            backgroundImage: `url(${adminT("refer_friend.image")})`,
            backgroundSize: "cover",
            backgroundPosition: "100% 100%",
          }}
        ></div>
        <div className="flits-reward-page-banner-content">
          <div className="flits-reward-page-banner-content-inner">
            <div className="flits-reward-page-header">
              {customer
                ? adminT(
                    "refer_friend.member_title",
                    "Refer us to earn additional rewards"
                  )
                : adminT(
                    "refer_friend.guest_title",
                    "Refer us to earn additional rewards"
                  )}
            </div>
            <div className="flits-reward-page-sub-header">
              {customer
                ? adminT(
                    "refer_friend.member_description",
                    "Spread the word using the links below"
                  )
                : adminT(
                    "refer_friend.guest_description",
                    "Become a member and earn credits & exclusive rewards every time you shop. Start shopping now!"
                  )}
            </div>
            {customer ? (
              <>
                <div className="flits-reward-page-link-copy-btn-main">
                  <input
                    type="text"
                    placeholder=""
                    name="flits_reward_page_referral_link"
                    defaultValue={ReferralLink()}
                    readOnly
                  ></input>
                  <div
                    className="flits-reward-page-link-copy-btn"
                    onClick={copyBtnClick}
                  >
                    {adminT("refer_friend.member_button1_title", "COPY")}
                  </div>
                </div>
                <div className="flits-reward-page-social-share-wrap">
                  <div className="flits-reward-page-social-share-text">
                    {themeT(
                      "flits.refer_friend_page.share_referral_link_title",
                      "Or share referral link via:"
                    )}
                  </div>
                  <ShareBtns />
                </div>
              </>
            ) : (
              <div className="flits-reward-page-banner-button-section">
                <a
                  href={adminT(
                    "refer_friend.guest_button1_url",
                    window?.flitsRewardPageObjects?.commonEndpoint?.register ??
                      "/account/register"
                  )}
                  className="flits-reward-page-primary-button flits-button flits-signup-btn"
                >
                  {adminT("refer_friend.guest_button1_title", "Signup")}
                </a>
                <a
                  href={adminT(
                    "refer_friend.guest_button2_url",
                    window?.flitsRewardPageObjects?.commonEndpoint?.login ??
                      "/account/login"
                  )}
                  className="flits-reward-page-secondary-button flits-button flits-signin-btn"
                >
                  {adminT("refer_friend.guest_button2_title", "Signin")}
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default ReferFriend;
