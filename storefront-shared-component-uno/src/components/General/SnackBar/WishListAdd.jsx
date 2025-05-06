/* eslint-disable jsx-a11y/anchor-is-valid */
import styles from "./SuccessSnackBar.module.css";
import Snackbar from "@mui/material/Snackbar";
import React from "react";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import { GlobalStore } from "redux-micro-frontend";
/* eslint-disable jsx-a11y/anchor-is-valid */
export const WishListAdd = (props) => {
  const getStore = GlobalStore.Get();

  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();
  return (
    <Snackbar
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      sx={{
        right: "0",
        bottom: "0",
        left: "0",
      }}
      open={true}
      message={props?.message}
      TransitionComponent={Slide}
    >
      <Typography
      component={"div"}
        sx={{
          fontSize: "14px",
          color: "black",
          width: "100%",
          padding: "18px 24px",
          fontWeight: "600",
          fontFamily: "inherit",
          minWidth: "288px",
          maxWidth: "568px",
          borderRadius: "2px",
          "@media (max-width: 640px)": {
            padding: "0",
          },
        }}
      >
        <div className={styles.flits_wls_snackbar}>
          <div className={styles.flits_wls_snackbar_header}>
            {t(
              "flits.wishlisted_product_page.product_added_to_wishlist",
              "Product has been added to your wishlist"
            )}
          </div>
          <div className={styles.flits_wls_snackbar_body}>
            <div
              className={styles.flits_wls_snackbar_product_img}
              style={{ backgroundImage: `url(${props?.image})` }}
            ></div>
            <a className={styles.flits_wls_snackbar_product_name}>
              {props?.title}
            </a>
          </div>
        </div>
      </Typography>
    </Snackbar>
  );
};
