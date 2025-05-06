import React from "react";
import "../linksharebtn.css";
import { Icon } from "../../../Helpers/Icon/Icon";
export const FbShareBtn = (props) => {
  function fbShare() {
    let url =
      "https://www.facebook.com/sharer/sharer.php?u=" +
      encodeURIComponent(unescape(props.referralLink)) +
      "&quote=" +
      props.shareDescription;
    window.open(url);
  }
  return (
    <div
      className="flits-fb-share-btn flits-social-share-main"
      onClick={fbShare}
    >
      <Icon icon={window?.flits_icons?.flits?.icons?.facebook_logo} />
    </div>
  );
};
