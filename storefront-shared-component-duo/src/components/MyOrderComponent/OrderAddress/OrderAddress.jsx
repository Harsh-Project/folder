import { GlobalStore } from "redux-micro-frontend";
import styles from "./OrderAddressModule.module.css";
import React from "react";
import { RenderSvgString } from "../../General/RenderSvgString";

export const OrderAddress = ({ item, setAddressMode, addressMode, orderMode }) => {
  
  const getStore = GlobalStore.Get();
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();

  const formetDate = (value) => {
    let orderCreateAt = value.split(" ");

    const translate = t(orderCreateAt[0])

    return translate + " " + orderCreateAt[1] + " " + orderCreateAt[2];
  };
  
  const handleClick = () => {
    setAddressMode(!addressMode);
  };

  if(!orderMode) {
    return null;
  }
  
  return (
    <div className={styles.flits_order_address}>
      <div className={styles.flits_order_address_row}>
        <div
          className={`${styles.flits_address_view_button} ${
            addressMode ? styles.flits_active : ""
          }`}
          onClick={handleClick}
        >
          <span>{t("flits.order_page.address","Address")}</span>
          <RenderSvgString svgString={window?.DuoIcon?.ViewHideOrder} />
        </div>
        <div>
          <span className={styles.flits_order_label}>
          {`${item?.canceled === "true" ? t("flits.order_page.cancel_at", "Cancelled at") : t("flits.order_page.fulfillment_status", "Fulfillment Status")}: `}
          </span>
          <span
            className={`${styles.flits_order_total_items} ${styles.flits_order_value}`}
          >
            {item?.canceled === "true" ? formetDate(item?.canceled_date) : item?.order_fulfillment}
          </span>
        </div>
      </div>
    </div>
  );
};
