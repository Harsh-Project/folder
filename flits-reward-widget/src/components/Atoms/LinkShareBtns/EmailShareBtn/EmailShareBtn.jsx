import React from "react";
import "../linksharebtn.css";
import { Icon } from "../../../Helpers/Icon/Icon";
export const EmailShareBtn = (props) => {
  function emailShare() {
    let subject = "Refer And earn";
    let encodedDescription = encodeURIComponent(
      unescape(props.shareDescription)
    );
    let mailtoLink = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(encodedDescription)}`;
    window.location.href = mailtoLink;
  }
  return (
    <div
      className="flits-wp-share-btn flits-social-share-main"
      onClick={emailShare}
    >
      <Icon icon={window?.flits_icons?.flits?.icons?.email_logo} />
    </div>
  );
};
