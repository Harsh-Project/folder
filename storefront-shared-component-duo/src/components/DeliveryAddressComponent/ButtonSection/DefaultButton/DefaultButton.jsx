import styles from "./DefaultButtonModule.module.css";
import React from "react";
import { GlobalStore } from "redux-micro-frontend";

export const DefaultButton = (props) => {
  const { item, handleDefaultEvent } = props;
  const getStore = GlobalStore.Get();
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();

  return (
    <li
      onClick={() => {
        handleDefaultEvent(item);
      }}
      className={`${styles.flits_action_item} ${styles.flits_address_default_btn}`}
    >
      {t("flits.address_page.mark_as_default_button","Mark as Default")}
    </li>
  );
};
