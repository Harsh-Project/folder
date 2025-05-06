import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import { LoginAgain } from "../LoginAgain/LoginAgain";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react";

export const UpdatePasswordDuo = ({ item }) => {
  const [snackBarMode, setSnackBarMode] = useState(null);
  const [loginAgain, setLoginAgain] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const getStore = GlobalStore.Get();

  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;
  const API = getStore._globalActions.API[0].API;
  const ChangePasswordPrimaryButton = window.UnoDuoComponent(
    "ChangePasswordPrimaryButton"
  );
  const SnackBar = window.UnoDuoComponent("SnackBar")
  const ChangePasswordSuccessSvg = window.UnoDuoComponent(
    "ChangePasswordSuccessSvg"
  );
  const ChangePasswordError = window.UnoDuoComponent("ChangePasswordError");
  const setPasswordError = window.updatePasswordState("setPasswordError");

  const newPassword = useSelector(
    (state) => state.storeFrontChangePassword.newPassword
  );
  const confirmNewPassword = useSelector(
    (state) => state.storeFrontChangePassword.confirmNewPassword
  );
  const passwordError = useSelector(
    (state) => state.storeFrontChangePassword.passwordError
  );

  const { t } = useTranslationLanguage();

  const handleClickChange = async () => {
    if (!newPassword || !confirmNewPassword) {
      dispatch(
        setPasswordError(
          t(
            "flits.update_password_page.password_empty_message",
            "The password is empty"
          )
        )
      );
      return;
    }

    if (newPassword !== confirmNewPassword) {
      dispatch(
        setPasswordError(
          t(
            "flits.update_password_page.password_not_match",
            "Passwords didn't match. Try again."
          )
        )
      );
      return;
    }

    if (newPassword?.length < 6 || newPassword?.length > 40) {
      dispatch(
        setPasswordError(
          t(
            "flits.update_password_page.password_hint_message",
            "Password must be between 6 to 40 characters"
          )
        )
      );
      return;
    }

    setSnackBarMode("processing");
    setMessage(
      t("flits.update_password_page.updating_password", "Updating password...")
    );

    const formData = {
      password: newPassword,
      password_confirmation: confirmNewPassword,
      customer_hash:
        window?.flitsThemeAppExtensionObjects?.customer?.customer_hash,
      token: window?.flitsThemeAppExtensionObjects?.customer?.shop_token,
    };

    const update_password = await API.changepassword.update_password(formData);
    console.log(update_password);

    if (update_password?.status === true) {
      setLoginAgain(true);
      setSnackBarMode("success");
      setMessage(
        t(
          "flits.update_password_page.password_updated_successfully",
          "Your password for account {{ email }} has been successfully updated",
          {
            email: window?.flitsThemeAppExtensionObjects?.customer?.email,
          }
        )
      );
      setTimeout(() => {
        setSnackBarMode(null);
        setMessage("");
      }, 2500);
    }
  };

  if (!ChangePasswordPrimaryButton) return null;

  return (
    <>
      {passwordError && passwordError?.length > 0 && (
        <ChangePasswordError errorMessage={passwordError} />
      )}
      <ChangePasswordPrimaryButton
        type={item?.type}
        onClickEvent={handleClickChange}
        label={t(item?.label)}
        name={item?.name}
      />
      <SnackBar
        mode={snackBarMode}
        message={message}
        svg={ChangePasswordSuccessSvg}
      />
      {loginAgain && (
        <LoginAgain newPassword={newPassword} setLoginAgain={setLoginAgain} />
      )}
    </>
  );
};
