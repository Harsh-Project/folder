import styles from "./ButtonShareModule.module.css";
import React from "react";
import { RenderSvgString } from "../../../General/RenderSvgString";
import { GlobalStore } from "redux-micro-frontend";

export const ButtonShare = () => {
  const getStore = GlobalStore.Get()
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage()
  if (navigator.share === undefined) {
    return null;
  }
  return (
    <div
      onClick={() => window?.handleShare(t)}
      className={`${styles.flits_button_icon} ${styles.flits_navigation_button} ${styles.flits_button_icon_wrap} ${styles.flits_share_btn}`}
    >
      <RenderSvgString svgString={window?.DuoIcon?.Share} />
    </div>
  );
};
