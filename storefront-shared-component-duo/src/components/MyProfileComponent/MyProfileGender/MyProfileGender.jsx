import styles from "./MyProfileGenderModule.module.css";
import React, { Suspense } from "react";
import { MyProfileSelect } from "../MyProfileSelect/MyProfileSelect";
import { GlobalStore } from "redux-micro-frontend";

export const MyProfileGender = (props) => {
  const getStore = GlobalStore.Get();
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();
  const handleChange = (e) => {
    props?.onValueChange(e);
  };
  return (
    <>
      <div
        className={`${styles.flits_gender_input_row} ${styles.flits_gender_radio} ${styles.flits_desktop}`}
      >
        <div className={styles.flits_input_row}>
          <input
            type="radio"
            className={styles.flits_input}
            id="flits-gender-male"
            name={props?.name}
            value="male"
            onClick={handleChange}
            disabled={props?.disabled}
            checked={props?.value === "male"}
          ></input>
          <label className={styles.flits_input_label}>
            {t("flits.profile_page.male", "Male")}
          </label>
        </div>
        <div className={styles.flits_input_row}>
          <input
            type="radio"
            className={styles.flits_input}
            id="flits-gender-female"
            name={props?.name}
            onClick={handleChange}
            value="female"
            disabled={props?.disabled}
            checked={props?.value === "female"}
          ></input>
          <label className={styles.flits_input_label}>
            {t("flits.profile_page.female", "Female")}
          </label>
        </div>
        <div className={styles.flits_input_row}>
          <input
            type="radio"
            className={styles.flits_input}
            id="flits-gender-other"
            name={props?.name}
            onClick={handleChange}
            value="other"
            disabled={props?.disabled}
            checked={props?.value === "other"}
          ></input>
          <label className={styles.flits_input_label}>
            {t("flits.profile_page.other", "Other")}
          </label>
        </div>
      </div>
      <div className={styles.flits_mobile}>
        <Suspense fallback={<></>}>
          <MyProfileSelect {...props} />
        </Suspense>
      </div>
    </>
  );
};
