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
        style={{
          fontSize: "14px",
          backgroundColor: "black",
          color: "white",
          width: "100%",
          padding: "18px 24px",
          fontFamily: "inherit",
          fontWeight: "600",
          minWidth: "288px",
          maxWidth: "568px",
          borderRadius: "2px",
        }}
      component={"div"}
      >
        {props?.message}
      </Typography>
    </Snackbar>
  );
};
