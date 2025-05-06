import React, { useEffect } from "react";
import { ReferralSectionCard } from "../ReferralSectionCard/ReferralSectionCard";
import { ReferralLink } from "../../../Helpers/ReferralLink";
import { HowItWorks, ReferralLinkCopyBtn } from "../../../../../../components";
import ShareBtns from "../../ShareBtns/ShareBtns";
import "./ReferralSection.css";
import { useDispatch, useSelector } from "react-redux";
import { setPagesViewClicks } from "../../../../../../redux/reducer/rewardWidgetSlice";

export const ReferralSection = () => {
  const dispatch = useDispatch();
  const pagesViewClicks = useSelector(
    (state) => state.rewardWidget.pagesViewClicks
  );
  const { adminT, themeT } =
    window?.flitsThemeAppExtensionObjects?.useTranslationLanguage;

  function copyBtnClick(e) {
    var input = e.target.parentNode.querySelector(
      'input[name="flits_widget_referral_link"]'
    );
    input.select();
    document.execCommand("copy");
    var svgIcon = window?.flits_icons?.flits?.icons?.true_logo?.code;
    e.target.innerHTML = svgIcon;
    setTimeout(function () {
      e.target.textContent = themeT("flits.refer_friend_page.copy", "Copy");
    }, 3500);
  }

  useEffect(() => {
    if (pagesViewClicks?.fromReferView) {
      let element = document.querySelector(".flits-how-it-works");
      if (element) {
        element.scrollIntoView();
      }
      dispatch(
        setPagesViewClicks({
          ...pagesViewClicks,
          fromReferView: false,
        })
      );
    }
  }, [pagesViewClicks, dispatch]);

  return (
    <div className="flits-widget-point-section flits-default-page-referral-section">
      <div className="flits-widget-section-head">
        <h2>{adminT("refer_friend.title", "Referral")}</h2>
        <p
          dangerouslySetInnerHTML={{
            __html: adminT(
              "refer_friend.description",
              "Refer your friends and family to earn referral rewards."
            ),
          }}
        />
      </div>
      <ReferralSectionCard>
        {window?.flitsThemeAppExtensionObjects?.customerExist ? (
          <>
            <ReferralLinkCopyBtn
              copyBtnClick={copyBtnClick}
              shareLink={ReferralLink()}
            />
            <ShareBtns />
          </>
        ) : null}
      </ReferralSectionCard>
      <div
        className="flits-how-it-works"
        onClick={() => {
          dispatch(
            setPagesViewClicks({
              ...pagesViewClicks,
              howItWorksView: true,
            })
          );
        }}
      >
        {adminT("refer_friend.steps_title", "How referral works?")}
      </div>
      {pagesViewClicks?.howItWorksView ? (
        <HowItWorks
          title={adminT("refer_friend.steps_title", "How referral works?")}
          howItWorksClose={() => {
            dispatch(
              setPagesViewClicks({
                ...pagesViewClicks,
                howItWorksView: false,
              })
            );
          }}
          stepOne={adminT("refer_friend.step1_title", "Copy referral linkd")}
          stepTwo={adminT(
            "refer_friend.step2_title",
            "Share the link with friends"
          )}
          stepThree={adminT(
            "refer_friend.step3_title",
            "You get rewarded when they sign up"
          )}
        />
      ) : null}
    </div>
  );
};
