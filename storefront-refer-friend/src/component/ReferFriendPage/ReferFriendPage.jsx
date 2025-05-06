import React from "react";
import { handleShare } from "../Event/Share";
import { ReferFriendContent } from "../ReferFriendContent/ReferFriendContent";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { handleFacebookShare } from "../Event/FaceBookShare";
import { handleWhatsappShare } from "../Event/WhatsAppShare";
import { handleCopy } from '../Event/Copy';

export const ReferFriendPage = (props) => {
  const Loading = window.UnoDuoComponent("Loading");
  const referFriendData = useSelector(
    (state) => state.storeFrontReferFriend.referFriendData
  );
  const ReferFriendContentWrapper =
    window.UnoDuoComponent("ReferFriendContentWrapper");

  useEffect(() => {
    if (!window.handleShare) {
      window.handleShare = handleShare;
      window.handleCopy = handleCopy;
      window.handleFacebookShare = handleFacebookShare;
      window.handleWhatsappShare = handleWhatsappShare;
    }
  }, []);

  if (
    !referFriendData ||
    !ReferFriendContentWrapper
  ) {
    return <Loading />;
  }

  return (
      <ReferFriendContentWrapper>
        <ReferFriendContent />
      </ReferFriendContentWrapper>
  );
};
