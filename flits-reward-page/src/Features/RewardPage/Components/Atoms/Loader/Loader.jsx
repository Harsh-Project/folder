import React from "react";
import "./style.css";

export const Loader = (props) => {
  return (
    <div
      className={
        props.active
          ? ["flits-reward-page-loader-wrap", "active"].join(" ")
          : "flits-reward-page-loader-wrap"
      }
    >
      <div className="flits-reward-page-loader"></div>
    </div>
  );
};
