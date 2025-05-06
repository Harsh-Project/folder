import Snackbar from "@mui/material/Snackbar";
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";

export const MyProfileSnackBar = ({ message, open }) => {
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
          backgroundColor: "red",
          color: "white",
          width: "288px",
          padding: "18px 24px",
          fontWeight: "600",
        }}
      >
        {message}
      </Typography>
    </Snackbar>
  );
};
