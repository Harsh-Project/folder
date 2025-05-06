import { PrimaryButton } from "../../components";
import "./style.css";
import React from "react";

function BannerSection() {
  const { adminT } =
    window?.flitsThemeAppExtensionObjects?.useTranslationLanguage;
  function registerClick() {
    window.location.href = adminT(
      "banner.guest_card_button_url",
      window?.commonEndpoint?.register ?? "/account/register"
    );
  }
  return (
    <div className="flits-widget-common-box-wrapper flits-fadeslideOut-animation">
      <h2 className="flits-widget-login-header">
        {adminT("banner.guest_card_title", "Become a member")}
      </h2>
      <p className="flits-widget-login-subhead">
        {adminT(
          "banner.guest_card_description",
          "Find new ways to earn and save while you shop, making every step of your journey more exciting!"
        )}
      </p>
      <PrimaryButton
        value={adminT("banner.guest_card_button_title", "Join now")}
        onClick={registerClick}
      />
      <div className="flits-widget-login-link">
        <p>
          {adminT("banner.guest_card_prompt_text", "Already have an account?")}
          <a href={adminT("banner.guest_card_link_url", window?.commonEndpoint?.login ?? "/account/login")}>
            {adminT("banner.guest_card_link_text", "Sign in")}
          </a>
        </p>
      </div>
    </div>
  );
}
export default BannerSection;
