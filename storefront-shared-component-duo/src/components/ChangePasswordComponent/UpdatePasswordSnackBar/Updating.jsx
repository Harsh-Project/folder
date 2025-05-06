import Snackbar from "@mui/material/Snackbar";
import React from "react";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import { GlobalStore } from "redux-micro-frontend";

export const Updating = () => {
  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;

  const { t } = useTranslationLanguage();
  return (
    <Snackbar
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      open={true}
      message={t("flits.update_password_page.updating_password","Updating password...")}
      autoHideDuration={10000}
      TransitionComponent={Slide}
    >
      <Typography
        style={{
          fontSize: "14px",
          backgroundColor: "black",
          color: "white",
          width: "288px",
          padding: "18px 24px",
          fontWeight: "600",
          fontFamily: "inherit",
        }}
      >
        {t("flits.update_password_page.updating_password","Updating password...")}
      </Typography>
    </Snackbar>
  );
};
