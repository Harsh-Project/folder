import React from "react";
import { Updating } from "../UpdatePasswordSnackBar/Updating";
import { Updated } from "../UpdatePasswordSnackBar/Updated";
import { useSelector } from "react-redux";

export const ChangePasswordSnackBar = ({ mode }) => {
  const snackBarMode = useSelector(
    (state) => state.storeFrontChangePassword.snackBarMode
  );
  if (snackBarMode === "processing") {
    return <Updating />;
  }

  if (snackBarMode === "success") {
    return <Updated />;
  }

  return null;
};
