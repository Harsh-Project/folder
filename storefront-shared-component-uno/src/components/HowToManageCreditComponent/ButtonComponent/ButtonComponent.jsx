/* eslint-disable jsx-a11y/anchor-is-valid */

import styles from "./ButtonComponent.module.css";
import React from "react";
import { GlobalStore } from "redux-micro-frontend";

export const ButtonComponent = (props) => {
  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;

  const { t } = useTranslationLanguage();

  return (
    <li className={styles.flits_nav_item}>
      <a
        className={`${styles.flits_nav_pil_link} ${
          props?.activeButton === props?.rule
            ? styles.flits_nav_pil_link_active
            : ""
        }`}
        name={props?.name}
        onClick={props?.onClick}
        type={props?.type}
      >
        {t(props?.label)}
      </a>
    </li>
  );
};
