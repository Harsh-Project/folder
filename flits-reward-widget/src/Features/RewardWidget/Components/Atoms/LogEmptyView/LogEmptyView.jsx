/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./style.css";
import { Icon } from "../../../../../components";

function LogEmptyView(props) {
  const { langConfig } = props;
  return (
    <>
      <div className="flits-widget-empty-img">
        <Icon icon={props?.icon}></Icon>
      </div>
      <div className="flits-widget-empty-content">
        <h2
          dangerouslySetInnerHTML={{
            __html: langConfig?.empty_head ?? "",
          }}
        ></h2>
        <p
          dangerouslySetInnerHTML={{
            __html: langConfig?.empty_subhead ?? "",
          }}
        ></p>
        {!langConfig?.empty_link_text ? null : (
          <a
            onClick={props?.rewardViewClick}
            dangerouslySetInnerHTML={{
              __html: langConfig?.empty_link_text ?? "",
            }}
          ></a>
        )}
      </div>
    </>
  );
}
export default LogEmptyView;
