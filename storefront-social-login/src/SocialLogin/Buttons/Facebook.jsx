/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import styles from "../SocialLogin.module.css";
import { SocialLoginButtonClick } from "../Helpers/SocialLoginButtonClick";
import { useSelector } from 'react-redux';
import { GlobalStore } from "redux-micro-frontend";
export const Facebook = () => {
  const referalRegisterPage = useSelector(
    (state) => state.storeFrontContainer.referalRegisterPage
    );
    const getStore = GlobalStore.Get()
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();

    return (
        <a
        style={{ order: 1 }}
        onClick={() => SocialLoginButtonClick("facebook",{referalRegisterPage})}
        className={`${styles.flits_social_login_btn} ${styles.flits_social_login_btn_facebook}`}
      >
        <span className={styles.flits_social_login_btn_img}>
          <img
            className={styles.flits_icon_facebook}
            alt="facebook"
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjAiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9IiNGRkZGRkYiID4gICAgPHBhdGggZD0iTTEzLDcuNDI5VjEwaDMuNUwxNiwxM2gtM3Y5SDl2LTlIN3YtM2wyLjAxMiwwLjAwOFY3LjQzNmMwLTIuODU3LDEuMTQzLTQuNDI5LDQuNDI5LTQuNDI5TDE3LDN2M2gtMi41NzEgQzEzLjE0Myw2LDEzLDYuNDI5LDEzLDcuNDI5eiI+PC9wYXRoPjwvc3ZnPg=="
          ></img>
        </span>
        <span className={styles.flits_social_login_btn_text}>{t("flits.social_login_page.facebook", "Facebook")}</span>
      </a>
    );
}