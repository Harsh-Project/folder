import React, { useState, useEffect, useCallback } from "react";
import {
  WpShareBtn,
  FbShareBtn,
  EmailShareBtn,
  NavigatorShareBtn,
} from "../../../../../components/index";
import { ReferralLink } from "../../Helpers/ReferralLink";
import "./style.css";
import { useSelector } from "react-redux";

function ShareBtns(props) {
  const [navigatorAvailable, setNavigatorAvailable] = useState(false);
  const { referralData } = useSelector((state) => state.rewardWidget);
  const { themeT } = window?.flitsThemeAppExtensionObjects?.useTranslationLanguage;
  const shareText = themeT(
    "flits.refer_friend_page.referral_program_invitation_message",
    "You can earn credit for creating an account with {{ shop_name }}. Use this link and get rewarded : {{ link }}"
  )
    ?.replace("{{ shop_name }}", window.flitsThemeAppExtensionObjects.shop_name)
    .replace("{{ link }}", ReferralLink());

  const getNavigator = useCallback(() => {
    var data = {
      title: "Refer Friend",
      text: shareText,
    };
    if (navigator.share && navigator.canShare(data)) {
      setNavigatorAvailable(true);
    } else {
      setNavigatorAvailable(false);
    }
  }, [shareText]);
  useEffect(() => {
    getNavigator();
  }, [getNavigator]);
  return (
    <>
      <div className="flits-social-share-wrap">
        <div className="flits-social-share-text">{`${themeT(
          "flits.refer_friend_page.share_referral_link_title",
          "Share Referral link via"
        )}:`}</div>
        {referralData?.whatsapp_share ? (
          <WpShareBtn
            referralLink={ReferralLink()}
            shareDescription={shareText}
          />
        ) : null}
        {referralData?.facebook_share ? (
          <FbShareBtn
            referralLink={ReferralLink()}
            shareDescription={shareText}
          />
        ) : null}
        <EmailShareBtn
          referralLink={ReferralLink()}
          shareDescription={shareText}
        />
        {navigatorAvailable ? (
          <NavigatorShareBtn
            referralLink={ReferralLink()}
            shareDescription={shareText}
          />
        ) : null}
      </div>
    </>
  );
}

export default ShareBtns;
