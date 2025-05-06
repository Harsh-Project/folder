import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { ButtonShare } from "./ButtonShare/ButtonShare"
import { ButtonFacebook } from "./ButtonFacebook/ButtonFacebook"
import { ButtonWhatsapp } from "./ButtonWhatsapp/ButtonWhatsapp"

export const ReferLinkButtons = ({
  handleShare,
  handleFacebookShare,
  handleWhatsappShare,
}) => {
  const referFriendData = useSelector(
    (state) => state.storeFrontReferFriend.referFriendData
  );
  const checkIsSharingOptionEnable = (sharingValue) => {
    return typeof sharingValue ==="string" ? Boolean(parseInt(sharingValue)) : sharingValue
  }
  return (
    <>
      <Suspense fallback={<></>}>
        <ButtonShare handleShare={handleShare} />
      </Suspense>
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
    </>
  );
};
