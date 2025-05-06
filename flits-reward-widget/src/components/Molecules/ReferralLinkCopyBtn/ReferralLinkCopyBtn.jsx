import React from "react";
import "./style.css";

export const ReferralLinkCopyBtn = (props) => {
  const { themeT } = window?.flitsThemeAppExtensionObjects?.useTranslationLanguage;
  return (
    <div className="flits-link-copy-btn-main">
      <input
        type="text"
        placeholder=""
        name="flits_widget_referral_link"
        defaultValue={props.shareLink}
        readOnly
      ></input>
      <div className="flits-link-copy-btn" onClick={props.copyBtnClick}>
        {themeT("flits.refer_friend_page.copy", "Copy")}
      </div>
    </div>
  );
};
