import styles from "./FromAdminCardModule.module.css";
import React from "react";
import { GlobalStore } from "redux-micro-frontend";

export const FromAdminCard = ({ item }) => {
  const getStore = GlobalStore.Get();
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();
  return (
    <div className={styles.flits_rule_card} stFconyle={{ height: "180px" }}>
      <p className={styles.flits_rule_title}>
        {t(
          item?.title[0],
          item?.title[1],
          item?.title?.length > 2 ? item?.title[2] : null
        )}
      </p>
      <p className={styles.flits_rule_description}>
        {t(
          item?.description[0],
          item?.description[1],
          item?.description?.length > 2 ? item?.description[2] : null
        )}
      </p>
      <div className={styles.flits_rule_footer}>
        <div className={styles.flits_rule_image}>
          <img
            alt=""
            src={`data:image/svg+xml;base64,${
              window?.HowToManageCreditIcon["admin_rule"]?.icon
            }`}
          ></img>
        </div>
      </div>
    </div>
  );
};
