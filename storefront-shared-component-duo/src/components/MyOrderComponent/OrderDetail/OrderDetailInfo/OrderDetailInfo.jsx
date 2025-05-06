import { GlobalStore } from "redux-micro-frontend";
import styles from "./OrderDetailInfoModule.module.css";
import React from "react";
import { RenderSvgString } from "../../../General/RenderSvgString";

export const OrderDetailInfo = ({ item, setOrderMode, orderMode }) => {
  const getStore = GlobalStore.Get();
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();

  const formetDate = (value) => {
    let orderCreateAt = value.split(" ");

    const translate = t(orderCreateAt[0])

    return translate + " " + orderCreateAt[1] + " " + orderCreateAt[2];
  };

  const handleMode = () => {
    setOrderMode(!orderMode);
  };

  const getTotal = () => {
    let total = 0;

    for (let i = 0; i < item?.line_items?.length; i++) {
      total = total + parseInt(item?.line_items[i]?.quantity);
    }

    return total;
  };

  return (
    <div className={styles.flits_order_information}>
      <div className={styles.flits_order_information_row}>
        <div>
          <span className={styles.flits_order_label}>
            {`${t("flits.order_page.order_date", "Order placed")}: `}
          </span>
          <span className={styles.flits_order_date}>
            {formetDate(item?.order_created_at)}
          </span>
        </div>
        <div>
          <span className={styles.flits_order_label}>
            {`${t("flits.order_page.order_number", "Order no.")}: `}
          </span>
          <span
            className={`${styles.flits_order_number} ${styles.flits_order_value}`}
          >
            {item?.order_name}
          </span>
        </div>
        <div>
          <span className={styles.flits_order_label}>
            {`${t("flits.order_page.total_items", "Total items")}: `}
          </span>
          <span
            className={`${styles.flits_order_total_items} ${styles.flits_order_value}`}
          >
            {getTotal()}
          </span>
        </div>
        <div>
          <span className={styles.flits_order_label}>
            {`${t("flits.order_page.payment_status", "Payment")}: `}
          </span>
          <span
            className={`${styles.flits_order_total_items} ${styles.flits_order_value}`}
            style={{ textTransform: "capitalize" }}
          >
            {`${item?.order_paid}(${item?.order_payment_type})`}
          </span>
        </div>
        <div
          className={`${styles.flits_view_order_button} ${
            orderMode ? styles.flits_active : ""
          }`}
          onClick={handleMode}
        >
          <span>
            {!orderMode
              ? t("flits.order_page.show_order_details", "View Order")
              : t("flits.order_page.hide_order_details", "Hide Order")}
          </span>
          <RenderSvgString svgString={window?.DuoIcon?.ViewHideOrder} />
        </div>
      </div>
      <div className={styles.flits_order_information_row}>
        <div>
          <span className={styles.flits_order_label}>
            {`${t("flits.order_page.order_number", "Order no.")}: `}
          </span>
          <span
            className={`${styles.flits_order_number} ${styles.flits_order_value}`}
          >
            {item?.order_name}
          </span>
        </div>
        <div>
          <span className={styles.flits_order_label}>
            {`${t("flits.order_page.total_items", "Total items")}: `}
          </span>
          <span
            className={`${styles.flits_order_total_items} ${styles.flits_order_value}`}
          >
            {getTotal()}
          </span>
        </div>
        <div>
          <span className={styles.flits_order_label}>
            {`${t("flits.order_page.payment_status", "Payment")}: `}
          </span>
          <span
            className={`${styles.flits_order_total_items} ${styles.flits_order_value}`}
            style={{ textTransform: "capitalize" }}
          >
            {`${item?.order_paid}(${item?.order_payment_type})`}
          </span>
        </div>
      </div>
    </div>
  );
};
