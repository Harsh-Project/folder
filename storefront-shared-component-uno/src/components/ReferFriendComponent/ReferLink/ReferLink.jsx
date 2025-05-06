import styles from "./ReferLink.module.css";
import React, { Suspense } from "react";
import { ReferCopyLink } from "../ReferCopyLink/ReferCopyLink"
import { ReferLinkButtons } from "../ReferLinkButtons/ReferLinkButtons"

export const ReferLink = (props) => {
  const {
    handleFacebookShare,
    handleWhatsappShare,
    handleCopyClick,
    referData,
    handleShare,
  } = props;
  return (
    <div className={styles.flits_refer_link_container}>
      <div className={styles.flits_row}>
        <div className={`${styles.flits_col_md_12} ${styles.flits_mb_15}`}>
          <div className={styles.flits_referral_box_group}>
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
        </div>
      </div>
    </div>
  );
};
