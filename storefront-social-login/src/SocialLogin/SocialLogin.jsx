import { useEffect } from "react";
import ReactDOM from "react-dom";

import { useSelector } from "react-redux";
import { GlobalStore } from "redux-micro-frontend";

import { Loader } from "./Loader/Loader";
import React from "react";
import { SubmitLoginForm } from "./Helpers/SubmitLoginForm";
import { SocialLoginDiv } from "./SocialLoginDiv";
import { SetupRedirectUrlAfterLogin } from "./Helpers/SetupRedirectUrlAfterLogin";

export const SocialLogin = () => {
  const socialLoginURLData = useSelector(
    (state) => state.storeFrontContainer.SocialLoginURLData
  );
  const redirectURLAfterLogin = useSelector(
    (state) => state.storeFrontContainer.redirectURLAfterLogin
  );

  const getStore = GlobalStore.Get();

  const API = getStore._globalActions.API[0].API;

  useEffect(() => {
    SetupRedirectUrlAfterLogin(redirectURLAfterLogin);
  }, [redirectURLAfterLogin]);

  useEffect(() => {
    if (socialLoginURLData.isNeedToLogin) {
      const doLogin = async () => {
        SubmitLoginForm(socialLoginURLData.email, socialLoginURLData.password);
      };
      doLogin();
    }
  }, [socialLoginURLData, API]);

  if (socialLoginURLData.isNeedToLogin) {
    return ReactDOM.createPortal(<Loader />, document.body);
  }

  let formElements = ["form#create_customer", "form#customer_login"];

  return (
    <>
      {formElements.map((item, index) => {
        const dom = document.querySelector(item);
        if (!dom) {
          return null;
        }
        return ReactDOM.createPortal(<SocialLoginDiv />, dom);
      })}
    </>
  );
};
