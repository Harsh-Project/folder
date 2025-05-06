import React from "react";
import { Icon } from "../../Helpers/Icon/Icon";
import "./style.css";

export const RewardRedeemBox = (props) => {
  let earnedIcon = window?.flits_icons?.flits?.icons?.true_logo;
  return (
    <div
      className={`flits-reward-redeem-box ${
        props.isEarned || props.isEarned === "true" ? "flits-earned-box" : ""
      }`}
      key={props.index}
    >
      <div className="flits-reward-redeem-box-text-icon-wrap">
        <div className="flits-reward-redeem-box-icon">
            <Icon icon={props.icon} />
        </div>
        <div className="flits-reward-redeem-box-text">
          <h4 dangerouslySetInnerHTML={{ __html: props.title }} />
          <p dangerouslySetInnerHTML={{ __html: props.description }} />
        </div>
      </div>
      {props.btn_text !== "none" && props.linkTo !== "none" ? (
        <a
          className={`flits-reward-redeem-box-btn ${window?.flitsThemeAppExtensionObjects?.customer?.birthday?.length > 0 && props?.moduleOn === "birthdate" ? "flits-earned-box" : ""}`}
          onClick={props.RewardRedeemBtnClick}
          href={props.linkTo}
        >
          {props.isEarned || props.isEarned === "true" ? (
            <Icon icon={earnedIcon} />
          ) : (
            props.btn_text
          )}
        </a>
      ) : (
        ""
      )}
    </div>
  );
};
