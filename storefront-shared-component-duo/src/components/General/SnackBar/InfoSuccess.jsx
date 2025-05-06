import Snackbar from "@mui/material/Snackbar";
import React from "react";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";

export const InfoSuccess = (props) => {
  return (
    <Snackbar
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      open={true}
      message={props?.message}
      TransitionComponent={Slide}
    >
      <Typography
      component={"div"}
        style={{
          fontSize: "14px",
          backgroundColor: "green",
          color: "white",
          width: "100%",
          padding: "18px 24px",
          fontWeight: "600",
          fontFamily: "inherit",
          minWidth: "288px",
          maxWidth: "568px",
          borderRadius: "2px",
        }}
      >
        {props?.message}
      </Typography>
    </Snackbar>
  );
};
