import React from "react";
import styles from "./MyProfileSelectModule.module.css";
import { GlobalStore } from "redux-micro-frontend";

export const MyProfileSelect = (props) => {
  const getStore = GlobalStore.Get();
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();
  return (
    <div className={styles.flits_select_row}>
      <select
        className={`${styles.flits_input} ${
          props?.edit ? styles.flits_input_edit_mode : ""
        }`}
        defaultValue={props?.value}
        name={props?.name ?? ""}
        id={props?.id ?? ""}
        readOnly={props?.readOnly}
        disabled={props?.disabled ?? false}
        onChange={props.onValueChange}
      >
        <option value="none" className={styles.flits_d_none}></option>
        <option value="male">{t("flits.profile_page.male", "Male")}</option>
        <option value="female">
          {t("flits.profile_page.female", "Female")}
        </option>
        <option value="other">{t("flits.profile_page.other", "Other")}</option>
      </select>
      {props?.edit && (
        <div className={styles.flits_select_arrow}>
          <svg
            viewBox="0 0 24 24"
            width="14"
            height="14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            shapeRendering="geometricPrecision"
          >
            <path d="M6 9l6 6 6-6"></path>
          </svg>
        </div>
      )}
    </div>
  );
};
