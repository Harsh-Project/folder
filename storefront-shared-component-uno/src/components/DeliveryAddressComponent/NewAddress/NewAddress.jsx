import styles from "./NewAddress.module.css";
import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import { RenderSvgString } from "../../General/RenderSvgString";

export const NewAddress = ({ handleAddEvent }) => {
  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;
  const { t } = useTranslationLanguage();
  return (
    <div
      className={`${styles.flits_address_card} ${styles.flits_new_address}`}
      onClick={handleAddEvent}
    >
      <div className={styles.flits_add_icon}><RenderSvgString svgString={window?.UnoIcon?.AddAddress} 
/></div>
      <p className={styles.flits_add_text}>
        {t("flits.address_page.add_new_address", "Add New Address")}
      </p>
    </div>
  );
};
