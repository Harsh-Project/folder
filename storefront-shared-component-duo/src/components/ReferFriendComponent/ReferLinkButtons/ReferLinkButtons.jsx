import styles from "./ReferLinkButtonsModule.module.css";
import React, { Suspense } from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useSelector } from "react-redux";
import { ButtonShare } from "./ButtonShare/ButtonShare";
import { ButtonFacebook } from "./ButtonFacebook/ButtonFacebook"
import { ButtonWhatsapp } from "./ButtonWhatsapp/ButtonWhatsapp"

export const ReferLinkButtons = ({
  handleShare,
  handleFacebookShare,
  handleWhatsappShare,
}) => {
  const getStore = GlobalStore.Get();
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();
  const referFriendData = useSelector(
    (state) => state.storeFrontReferFriend.referFriendData
  );
  const checkIsSharingOptionEnable = (sharingValue) => {
    return typeof sharingValue ==="string" ? Boolean(parseInt(sharingValue)) : sharingValue
  }
  if(!referFriendData?.facebook_share && !referFriendData?.whatsapp_share && !navigator.share) {
    return null
  }
  return (
    <div className={styles.flits_link_share_btn_box}>
      <p>
        {t(
          "flits.refer_friend_page.share_referral_link_title",
          "Share referral link via"
        )}
      </p>
      <div className={styles.flits_share_btn_grp}>
        {checkIsSharingOptionEnable(referFriendData?.facebook_share) && (
          <Suspense fallback={<></>}>
            <ButtonFacebook handleFacebookShare={handleFacebookShare} />
          </Suspense>
        )}
        {checkIsSharingOptionEnable(referFriendData?.whatsapp_share) && (
          <Suspense fallback={<></>}>
            <ButtonWhatsapp handleWhatsappShare={handleWhatsappShare} />
          </Suspense>
        )}
        <Suspense fallback={<></>}>
          <ButtonShare handleShare={handleShare} />
        </Suspense>
      </div>
    </div>
  );
};
