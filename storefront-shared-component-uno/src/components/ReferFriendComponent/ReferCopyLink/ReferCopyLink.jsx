import styles from "./ReferCopyLink.module.css";
import { GlobalStore } from "redux-micro-frontend";
import React, { Suspense } from "react";
import { useState } from "react";
import { SnackBar } from "../../General/SnackBar/SnackBar";

export const ReferCopyLink = ({ referData }) => {
  const [snackBarMode, setSnackBarMode] = useState(null);
  const [message, setMessage] = useState("");
  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;

  const { t } = useTranslationLanguage();

  const handleCopyClick = () => {
    window?.handleCopy(setSnackBarMode, setMessage, t);
  };
  return (
    <>
      <div
        className={`${styles.flits_input_wrap} ${styles.flits_referral_link_input_wrap}`}
      >
        <div className={styles.flits_input_icon_group}>
          <input
            type="text"
            id="refer"
            className={styles.flits_input}
            placeholder=""
            name="referral link"
            value={`https://${
              window?.location?.host
            }/account/register?flits_refer_code=${encodeURIComponent(
              unescape(
                btoa(
                  encodeURIComponent(referData?.customer?.referral_code ?? "")
                )
              )
            )}&flits_inviter_name=${encodeURIComponent(
              unescape(
                btoa(encodeURIComponent(referData?.customer?.name ?? ""))
              )
            )}`}
            readOnly={true}
          />
          <button
            type="button"
            className={`${styles.flits_button} ${styles.flits_copy_btn} ${styles.flits_primary_btn} ${styles.flits_ml_0}`}
            onClick={handleCopyClick}
            id="flits-refer-link-copy"
          >
            {t("flits.refer_friend_page.copy", "Copy")}
          </button>
        </div>
      </div>
      <Suspense fallback={<></>}>
        <SnackBar mode={snackBarMode} message={message} />
      </Suspense>
    </>
  );
};
