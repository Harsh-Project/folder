import Snackbar from "@mui/material/Snackbar";
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";

export const SaveSnackBar = ({ message, open, bg }) => {
  const [openSnackbar, setOpenSnackbar] = useState(open ? open : false);

  return (
    <Snackbar
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      open={openSnackbar}
      message={message}
      autoHideDuration={10000}
      onClose={() => setOpenSnackbar(false)}
      TransitionComponent={Slide}
    >
      <Typography
        style={{
          fontSize: "14px",
          backgroundColor: bg || "black",
          color: "white",
          width: "288px",
          padding: "18px 24px",
          fontFamily: "inherit",
          fontWeight: "600",
        }}
      >
        {message}
      </Typography>
    </Snackbar>
  );
};
