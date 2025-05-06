import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useDispatch, useSelector } from "react-redux";

export const ConfirmNewPassword = ({ item }) => {
  const microFrontEndData = useSelector(state => state.storeFrontContainer.microFrontEndData)
  const dispatch = useDispatch();
  const confirmNewPassword = useSelector(
    (state) => state.storeFrontChangePassword.confirmNewPassword
  );
  const newPassword = useSelector(
    (state) => state.storeFrontChangePassword.newPassword
  );

  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;
  const ChangePasswordInput = window.UnoDuoComponent("ChangePasswordInput");
  const ChangePasswordLabel = window.UnoDuoComponent("ChangePasswordLabel");
  const setConfirmNewPassword = window.updatePasswordState("setConfirmNewPassword");
  const ChangePasswordRow = window.UnoDuoComponent("ChangePasswordRow");
  const setPasswordError = window.updatePasswordState("setPasswordError");

  const passwordError = useSelector(
    (state) => state.storeFrontChangePassword.passwordError
  );

  const { t } = useTranslationLanguage();

  const handleChange = (value) => {
    dispatch(setConfirmNewPassword(value));
    dispatch(setPasswordError(null));
  };

  if (!ChangePasswordRow || !ChangePasswordLabel || !ChangePasswordInput)
    return null;

  return (
    <ChangePasswordRow>
      <ChangePasswordLabel label={microFrontEndData?.accountSettings?.template === 2
            ? t(item?.label)
            : `${t(item?.label)} : `} />
      <ChangePasswordInput
        onValueChange={handleChange}
        minlength={item?.minlength}
        value={confirmNewPassword}
        autocomplete={item?.autocomplete}
        maxlength={item?.maxlength}
        type={item?.type}
        name={item?.name}
        error={
          newPassword?.length > 0 &&
          !confirmNewPassword &&
          passwordError?.length > 0
        }
        placeholder={item?.placeholder}
      />
    </ChangePasswordRow>
  );
};
