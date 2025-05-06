import React from "react";
import "../linksharebtn.css";
import { Icon } from "../../../Helpers/Icon/Icon";
export const NavigatorShareBtn = (props) => {
  function navigatorShare() {
    //let encodedDescription = encodeURIComponent(unescape(props.shareDescription));
    let encodedDescription = props.shareDescription;
    var data = {
      title: "Refer Friend",
      text: encodedDescription,
    };
    if (navigator.share && navigator.canShare(data)) {
      navigator.share(data);
    } else {
      alert(
        `Navigator share is not supported by your browser. ${encodedDescription}`
      );
    }
  }
  return (
    <div
      className="flits-wp-share-btn flits-social-share-main"
      onClick={navigatorShare}
    >
      <Icon icon={window?.flits_icons?.flits?.icons?.navigation_share_logo} />
    </div>
  );
};
