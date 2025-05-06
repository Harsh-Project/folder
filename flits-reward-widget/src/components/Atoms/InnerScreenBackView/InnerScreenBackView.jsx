import React from "react";
import "./style.css";
import { Icon } from "../../Helpers/Icon/Icon";
export const InnerScreenBackView = (props) => {
  return (
    <div className="flits-widget-inside-header" onClick={props.backButtonClick}>
      <Icon icon={window?.flits_icons?.flits?.icons?.backward_arrow}/>
      <h2>{props.backScreenText}</h2>
    </div>
  );
};
