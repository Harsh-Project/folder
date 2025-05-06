import styles from "./ChangePasswordInputModule.module.css";
import React from "react";
import { GlobalStore } from "redux-micro-frontend";

export const ChangePasswordInput = (props) => {
  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;

  const { t } = useTranslationLanguage();
  return (
    <input
      type={props?.type}
      className={`${styles.flits_input} ${
        props?.error ? styles.flits_input_error : ""
      }`}
      placeholder={props?.placeholder ? t(props?.placeholder, "") : ""}
      name={props?.name ?? ""}
      value={props?.value}
      onChange={(e) => {
        props.onValueChange(e.target.value);
      }}
      minLength={props?.minlength}
      autoComplete={props?.autocomplete}
      maxLength={props?.maxlength}
    />
  );
};
