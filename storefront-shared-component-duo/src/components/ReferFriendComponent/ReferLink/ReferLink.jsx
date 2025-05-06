import styles from "./ReferLinkModule.module.css";
import React, { Suspense } from "react";
import { ReferCopyLink } from '../ReferCopyLink/ReferCopyLink';
import { ReferLinkButtons } from '../ReferLinkButtons/ReferLinkButtons';

export const ReferLink = (props) => {
  const {
    mobileNeed,
    handleFacebookShare,
    handleWhatsappShare,
    handleCopyClick,
    referData,
    handleShare,
  } = props;
  return (
    <div
      className={`${styles.flits_link_share_container} ${
        mobileNeed ? styles.flits_need_mobile : ""
      }`}
    >
      <Suspense fallback={<></>}>
        <ReferCopyLink
          referData={referData}
          handleCopyClick={handleCopyClick}
        />
        <ReferLinkButtons
          handleShare={handleShare}
          handleFacebookShare={handleFacebookShare}
          handleWhatsappShare={handleWhatsappShare}
        />
      </Suspense>
    </div>
  );
};
