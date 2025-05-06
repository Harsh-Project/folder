/* eslint-disable jsx-a11y/anchor-is-valid */
import { GlobalStore } from "redux-micro-frontend";
import React from "react";
import { SocialLoginButtonClick } from "../Helpers/SocialLoginButtonClick";
import styles from "../SocialLogin.module.css";
import { useSelector } from 'react-redux';

export const Twitter = () => {
  const referalRegisterPage = useSelector(
    (state) => state.storeFrontContainer.referalRegisterPage
  );
  const getStore = GlobalStore.Get()
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();
    return (
        <a
          style={{ order: 3 }}
          onClick={() => SocialLoginButtonClick("twitter",{referalRegisterPage})}
          className={`${styles.flits_social_login_btn} ${styles.flits_social_login_btn_twitter}`}
        >
          <span className={styles.flits_social_login_btn_img}>
            <img
              className={styles.flits_icon_twitter}
              alt="twitter"
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjAiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjYgMjYiIGZpbGw9IiNGRkZGRkYiID48ZyBpZD0ic3VyZmFjZTEiPjxwYXRoIHN0eWxlPSIgIiBkPSJNIDI1Ljg1NTQ2OSA1LjU3NDIxOSBDIDI0LjkxNDA2MyA1Ljk5MjE4OCAyMy45MDIzNDQgNi4yNzM0MzggMjIuODM5ODQ0IDYuNDAyMzQ0IEMgMjMuOTIxODc1IDUuNzUgMjQuNzU3ODEzIDQuNzIyNjU2IDI1LjE0ODQzOCAzLjQ5NjA5NCBDIDI0LjEzMjgxMyA0LjA5NzY1NiAyMy4wMDc4MTMgNC41MzUxNTYgMjEuODEyNSA0Ljc2OTUzMSBDIDIwLjg1NTQ2OSAzLjc1IDE5LjQ5MjE4OCAzLjExMzI4MSAxNy45ODA0NjkgMy4xMTMyODEgQyAxNS4wODIwMzEgMy4xMTMyODEgMTIuNzMwNDY5IDUuNDY0ODQ0IDEyLjczMDQ2OSA4LjM2MzI4MSBDIDEyLjczMDQ2OSA4Ljc3MzQzOCAxMi43NzczNDQgOS4xNzU3ODEgMTIuODY3MTg4IDkuNTU4NTk0IEMgOC41MDM5MDYgOS4zMzk4NDQgNC42MzY3MTkgNy4yNDYwOTQgMi4wNDY4NzUgNC4wNzAzMTMgQyAxLjU5Mzc1IDQuODQ3NjU2IDEuMzM1OTM4IDUuNzUgMS4zMzU5MzggNi43MTQ4NDQgQyAxLjMzNTkzOCA4LjUzNTE1NiAyLjI2MTcxOSAxMC4xNDA2MjUgMy42NzE4NzUgMTEuMDgyMDMxIEMgMi44MDg1OTQgMTEuMDU0Njg4IDIgMTAuODIwMzEzIDEuMjkyOTY5IDEwLjQyNTc4MSBDIDEuMjkyOTY5IDEwLjQ0OTIxOSAxLjI5Mjk2OSAxMC40Njg3NSAxLjI5Mjk2OSAxMC40OTIxODggQyAxLjI5Mjk2OSAxMy4wMzUxNTYgMy4xMDE1NjMgMTUuMTU2MjUgNS41MDM5MDYgMTUuNjQwNjI1IEMgNS4wNjI1IDE1Ljc2MTcxOSA0LjYwMTU2MyAxNS44MjQyMTkgNC4xMjEwOTQgMTUuODI0MjE5IEMgMy43ODEyNSAxNS44MjQyMTkgMy40NTMxMjUgMTUuNzkyOTY5IDMuMTMyODEzIDE1LjczMDQ2OSBDIDMuODAwNzgxIDE3LjgxMjUgNS43MzgyODEgMTkuMzM1OTM4IDguMDM1MTU2IDE5LjM3NSBDIDYuMjQyMTg4IDIwLjc4NTE1NiAzLjk3NjU2MyAyMS42MjEwOTQgMS41MTU2MjUgMjEuNjIxMDk0IEMgMS4wODk4NDQgMjEuNjIxMDk0IDAuNjc1NzgxIDIxLjU5NzY1NiAwLjI2NTYyNSAyMS41NTA3ODEgQyAyLjU4NTkzOCAyMy4wMzkwNjMgNS4zNDc2NTYgMjMuOTA2MjUgOC4zMTI1IDIzLjkwNjI1IEMgMTcuOTY4NzUgMjMuOTA2MjUgMjMuMjUgMTUuOTA2MjUgMjMuMjUgOC45NzI2NTYgQyAyMy4yNSA4Ljc0MjE4OCAyMy4yNDYwOTQgOC41MTU2MjUgMjMuMjM0Mzc1IDguMjg5MDYzIEMgMjQuMjYxNzE5IDcuNTU0Njg4IDI1LjE1MjM0NCA2LjYyODkwNiAyNS44NTU0NjkgNS41NzQyMTkgIj48L3BhdGg+PC9nPjwvc3ZnPg=="
            ></img>
          </span>
          <span className={styles.flits_social_login_btn_text}>{t("flits.social_login_page.twitter", "Twitter")}</span>
        </a>
    );
}