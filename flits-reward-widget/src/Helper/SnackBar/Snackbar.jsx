import React from "react";
import "./style.css";

function SnackBar({ message, isActive, type }) {
  return (
    <div
      className={
        isActive
          ? ["flits-widget-otp-snackbar", "show", type].join(" ")
          : "flits-widget-otp-snackbar"
      }
    >
      {message}
    </div>
  );
}

export default SnackBar;
