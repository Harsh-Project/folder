import React from "react";
import "./style.css";

export const Icon = (props) => {
  return (
    <>
      {props?.icon?.type === "code" ? (
        <span
          dangerouslySetInnerHTML={{ __html: props.icon.code }}
          className="flits-reward-svg-span"
        />
      ) : (
        <img src={props?.icon?.url} alt="" />
      )}
    </>
  );
};
