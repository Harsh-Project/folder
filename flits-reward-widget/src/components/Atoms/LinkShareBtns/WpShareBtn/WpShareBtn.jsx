import React from "react";
import "../linksharebtn.css";
import { Icon } from "../../../Helpers/Icon/Icon";
export const WpShareBtn = (props) => {
  function wpShare() {
    let encodedDescription = encodeURIComponent(
      unescape(props.shareDescription)
    );
    let url = "https://api.whatsapp.com/send?text=" + encodedDescription;
    window.open(url);
  }
  return (
    <div
      className="flits-wp-share-btn flits-social-share-main"
      onClick={wpShare}
    >
      <Icon icon={window?.flits_icons?.flits?.icons?.whatsapp_logo} />
    </div>
  );
};
