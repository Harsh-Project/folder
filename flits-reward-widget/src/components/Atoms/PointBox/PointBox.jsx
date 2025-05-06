import React from "react";
import { Icon } from "../../Helpers/Icon/Icon";
import "./style.css";

export const PointBox = (props) => {
  return (
    <div
      className={`flits-reward-point-box ${props.class}`}
      style={{ padding: props.padding }}
    >
      <div
        className="flits-reward-point-box-header"
        onClick={props.rewardPointBoxClick}
      >
        <div className="flits-reward-point-box-icon">
          <Icon icon={props.icon} />
        </div>
        <div className="flits-reward-point-box-text">
          <h4>{props.title}</h4>
        </div>
        <div className="flits-reward-point-box-forward-icon">
          <Icon
            icon={window?.flits_icons?.flits?.icons?.forward_arrow_section}
          />
        </div>
      </div>
      {props?.children}
    </div>
  );
};
