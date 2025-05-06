import React from "react";
import { Icon } from "../../Helpers/Icon/Icon";
import "./style.css";

export const WidgetOpenBtn = (props) => {
  return (
    <button
      className={`flits-reward-button ${props.class} ${"flits-widget-popup-" + window?.flitsThemeAppExtensionObjects?.Metafields?.FLITS_EXTENSION_ONSITE_CONTENT_REWARD_WIDGET?.launcher?.alignment ?? "right"}`}
      onClick={props.rewardOpenPopupClick}
    >
      <span className="flits-reward-button-icon">
        <Icon icon={props.icon} />
      </span>
      <span className="flits-reward-button-text">{props.text}</span>
    </button>
  );
};
