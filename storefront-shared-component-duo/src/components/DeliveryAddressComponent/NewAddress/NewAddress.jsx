import styles from "./NewAddressModule.module.css";
import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import { RenderSvgString } from "../../General/RenderSvgString";

export const NewAddress = ({ handleAddEvent }) => {
  const getStore = GlobalStore.Get();
  const { t } =
    getStore._globalActions.Helpers[0].useTranslationLanguage();

  return (
    <div
      className={`${styles.flits_address_card} ${styles.flits_new_address_card}`}
      onClick={handleAddEvent}
    >
      <RenderSvgString svgString={window?.DuoIcon?.AddAddress} />
      <p>{t("flits.address_page.add_new_address","Add New Address")}</p>
    </div>
  );
};
