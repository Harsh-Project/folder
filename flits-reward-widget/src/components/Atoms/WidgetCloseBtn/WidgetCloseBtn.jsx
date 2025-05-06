import React from "react";
import { Icon } from "../../Helpers/Icon/Icon";
import "./style.css";

export const WidgetCloseBtn = (props) => {
  return (
    <button
      className={`flits-reward-close-btn ${props.class} ${"flits-widget-popup-close-button-" + window?.flitsThemeAppExtensionObjects?.Metafields?.FLITS_EXTENSION_ONSITE_CONTENT_REWARD_WIDGET?.launcher?.alignment ?? "right"}`}
      onClick={props.rewardClosePopupClick}
    >
      <Icon icon={props.icon} />
    </button>
  );
};
