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
      autoHideDuration={2000}
      onClose={() => setOpenSnackbar(false)}
      TransitionComponent={Slide}
    >
      <Typography
        style={{
          fontSize: "14px",
          backgroundColor: bg || "black",
          color: "white",
          width: "auto",
          padding: "18px 24px",
          fontWeight: "600",
          fontFamily: "inherit",
        }}
      >
        {message}
      </Typography>
    </Snackbar>
  );
};
