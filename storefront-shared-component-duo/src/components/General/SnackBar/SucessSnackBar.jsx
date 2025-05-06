import Snackbar from "@mui/material/Snackbar";
import React from "react";
import styles from "./SuccessSnackBarModule.module.css";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";

export const SuccessSnackBar = (props) => {
  return (
    <Snackbar
      anchorOrigin={{ horizontal: "center", vertical: "top" }}
      open={true}
      sx={{ height: "100%", width: "100%", background: "rgba(255,255,255,.5)" }}
      message={props?.message}
      TransitionComponent={Slide}
    >
      <Typography
      component={"div"}
        style={{
          fontSize: "14px",
          backgroundColor: "white",
          color: "black",
          fontWeight: "600",
          fontFamily: "inherit",
          minWidth: "288px",
          borderRadius: "2px",
        }}
      >
        <div
          className={`${styles.flits_snackbar_popup_box} ${styles.flits_change_password_popup} ${styles.flits_template}`}
        >
          <div className={styles.flits_snackbar_header}>{props?.svg}</div>
          <div className={styles.flits_snackbar_body}>{props?.message}</div>
        </div>
      </Typography>
    </Snackbar>
  );
};
