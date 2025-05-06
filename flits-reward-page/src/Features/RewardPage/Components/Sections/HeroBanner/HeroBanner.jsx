import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslationLanguage } from "../../Helpers/UseTranslation";
import { MoneyFormat } from "../../Helpers/MoneyFormet";
import "./style.css";

function HeroBanner(props) {
  // eslint-disable-next-line
  const [customer, setCustomer] = useState(
    window.flitsRewardPageObjects.customer
  );
  const { adminT } = useTranslationLanguage();
  const creditData = useSelector((state) => state.rewardPage.creditData);
  if (creditData) {
    window.flitsRewardAcceptMarketing = creditData?.customer?.accepts_marketing;
  }
  return (
    <>
      <section className="flits-reward-page-hero-banner flits-reward-page-banner">
        <div
          className="flits-reward-page-banner-image"
          style={{
            backgroundImage: `url(${adminT("banner.image")})`,
            backgroundSize: "cover",
            backgroundPosition: "100%",
          }}
        ></div>
        <div className="flits-reward-page-banner-content">
          <div className="flits-reward-page-banner-content-inner">
            <div className="flits-reward-page-header">
              {customer
                ? `${adminT(
                    "banner.member_title",
                    "Welcome to the club {{ customer }}"
                  ).replace(
                    "{{ customer }}",
                    window.flitsRewardPageObjects?.customerFName
                  )}`
                : adminT("banner.guest_title", "Welcome to the club")}
            </div>
            <div className="flits-reward-page-sub-header">
              {customer ? (
                <span
                  dangerouslySetInnerHTML={{
                    __html: adminT(
                      "banner.member_description",
                      "Your credit balance is <strong>{{ credit }}</strong> credits",
                      {
                        credit: MoneyFormat(
                          creditData?.customer?.credits / 100
                        ),
                      }
                    ),
                  }}
                />
              ) : (
                `${adminT(
                  "banner.guest_description",
                  "Become a valued member of our club and start earning rewards every step of the way."
                )}`
              )}
            </div>
            <div className="flits-reward-page-banner-button-section">
              {customer ? (
                <a
                  href={adminT(
                    "banner.member_button1_url",
                    `${
                      window?.flitsRewardPageObjects?.commonEndpoint
                        ?.collection ?? ""
                    }/collections/all`
                  )}
                  className="flits-reward-page-primary-button flits-button flits-hero-banner-shop-now-btn"
                >
                  {adminT("banner.member_button1_title", "Shop now")}
                </a>
              ) : (
                <>
                  <a
                    href={adminT(
                      "banner.guest_button1_url",
                      window?.flitsRewardPageObjects?.commonEndpoint
                        ?.register ?? "/account/register"
                    )}
                    className="flits-reward-page-primary-button flits-button flits-signup-btn"
                  >
                    {adminT("banner.guest_button1_title", "Signup")}
                  </a>
                  <a
                    href={adminT(
                      "banner.guest_button2_url",
                      window?.flitsRewardPageObjects?.commonEndpoint?.login ??
                        "/account/login"
                    )}
                    className="flits-reward-page-secondary-button flits-button flits-signin-btn"
                  >
                    {adminT("banner.guest_button2_title", "Signin")}
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HeroBanner;
