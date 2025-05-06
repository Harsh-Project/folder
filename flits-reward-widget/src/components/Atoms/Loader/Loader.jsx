import React from "react";
import "./style.css";

export const Loader = (props) => {
  return (
    <div
      className={
        props.active
          ? ["flits-widget-loader-wrap", "active"].join(" ")
          : "flits-widget-loader-wrap"
      }
    >
      <div className="flits-widget-loader"></div>
    </div>
  );
};
