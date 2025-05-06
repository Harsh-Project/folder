import Snackbar from "@mui/material/Snackbar";
import React from "react";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";

export const ProcessingSnackBar = (props) => {
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
          backgroundColor: "black",
          color: "white",
          width: "100%",
          textAlign: "left",
          padding: "18px 24px",
          fontWeight: "600",
          minWidth: "288px",
          fontFamily: "inherit",
          maxWidth: "568px",
          borderRadius: "2px",
        }}
      >
        {props?.message}
      </Typography>
    </Snackbar>
  );
};
