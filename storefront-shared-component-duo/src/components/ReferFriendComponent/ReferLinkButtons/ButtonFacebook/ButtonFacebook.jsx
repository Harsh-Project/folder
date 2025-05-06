import React from "react";
import { GlobalStore } from "redux-micro-frontend"
import styles from "./ButtonFacebookModule.module.css";
import { RenderSvgString } from "../../../General/RenderSvgString";

export const ButtonFacebook = () => {
  const getStore = GlobalStore.Get()
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage()
  return (
    <div
      onClick={() => window?.handleFacebookShare(t)}
      className={`${styles.flits_button_icon} ${styles.flits_facebook_button} ${styles.flits_button_icon_wrap} ${styles.flits_share_btn}`}
    >
      <RenderSvgString svgString={window?.DuoIcon?.FaceBook} />
    </div>
  );
};
