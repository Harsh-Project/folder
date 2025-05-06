import React from "react";
import "./style.css";

export const PrimaryButton = (props) => {
  return (
    <button
      className="flits-reward-primary-button"
      onClick={props.onClick}
      id={props.id}
    >
      {props.value}
      <div className="flits-widget-loader flits-button-inside-loader"></div>
    </button>
  );
};
