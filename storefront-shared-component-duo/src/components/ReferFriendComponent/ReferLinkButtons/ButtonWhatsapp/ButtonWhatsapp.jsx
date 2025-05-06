import React from "react";
import styles from "./ButtonWhatsappModule.module.css";
import { RenderSvgString } from "../../../General/RenderSvgString";
import { GlobalStore } from "redux-micro-frontend";

export const ButtonWhatsapp = () => {
  const getStore = GlobalStore.Get()
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage()
  return (
    <div
      onClick={() => window?.handleWhatsappShare(t)}
      className={`${styles.flits_button_icon} ${styles.flits_whatsapp_button} ${styles.flits_button_icon_wrap} ${styles.flits_share_btn}`}
    >
      <RenderSvgString svgString={window?.DuoIcon?.Whatsapp} />
    </div>
  );
};
