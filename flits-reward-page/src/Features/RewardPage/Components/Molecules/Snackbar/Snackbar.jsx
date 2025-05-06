import React from "react";
import "./style.css";

function SnackBar({ message, isActive, type }) {
  return (
    <div
      className={
        isActive
          ? ["flits-reward-page-snackbar", "show", type].join(" ")
          : "flits-reward-page-snackbar"
      }
    >
      {message}
    </div>
  );
}

export default SnackBar;
