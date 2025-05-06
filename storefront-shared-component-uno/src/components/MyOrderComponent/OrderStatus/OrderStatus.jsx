import styles from "./OrderStatus.module.css";
import React, { Suspense } from "react";
import { GlobalStore } from "redux-micro-frontend";
import { MoneyFormat } from "../../General/MoneyFormat/MoneyFormat";

export const OrderStatus = ({ item }) => {
  const getStore = GlobalStore.Get();

  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;
  const formetDate = (value) => {
    let orderCreateAt = value.split(" ");

    const translate = t(orderCreateAt[0]);

    return translate + " " + orderCreateAt[1] + " " + orderCreateAt[2];
  };

  const { t } = useTranslationLanguage();
  return (
    <>
      <div
        className={`${styles.flits_order_row} ${styles.flits_order_status_row}`}
      >
        <div className={styles.flits_order_row}>
          <span className={`${styles.flits_label}`}>
            {t("flits.order_page.order_number", "Order no.")}:
          </span>
          <span className={`${styles.flits_value}`}>
            {" " + item?.order_name}
          </span>
        </div>
        <div className={styles.flits_order_row}>
          <span className={`${styles.flits_label}`}>
            {t("flits.order_page.grand_total", "Grand Total")}:
          </span>
          <span className={`${styles.flits_value}`}>
            {" "}
            {
              <Suspense fallbac={<></>}>
                <MoneyFormat price={item?.order_total / 100} />
              </Suspense>
            }
          </span>
        </div>
      </div>
      <div
        className={`${styles.flits_order_row} ${styles.flits_order_detail_row}`}
      >
        <div>
          <div className={styles.flits_order_row}>
            <span className={`${styles.flits_label}`}>
              {`${t("flits.order_page.order_date", "Order placed")}: `}
            </span>
            <span className={`${styles.flits_value}`}>
              {formetDate(item?.order_created_at)}
            </span>
          </div>
          <div className={styles.flits_order_row}>
            <span className={`${styles.flits_label}`}>
              {item?.canceled === "true"
                ? t("flits.order_page.cancel_at", "Cancelled at")
                : t(
                    "flits.order_page.fulfillment_status",
                    "Fulfillment Status"
                  )}
              :
            </span>
            <span className={`${styles.flits_value}`}>
              {" " +
                (item?.canceled === "true"
                  ? formetDate(item?.canceled_date)
                  : item?.order_fulfillment)}
            </span>
          </div>
        </div>
        <div className={styles.flits_text_right}>
          <div className={styles.flits_order_row}>
            <span className={`${styles.flits_label}`}>
              {t("flits.order_page.total_items", "Total items")}:
            </span>
            <span className={`${styles.flits_value}`}>
              {" " + item?.line_items?.length}
            </span>
          </div>
          <div className={styles.flits_order_row}>
            <span className={`${styles.flits_label}`}>
              {t("flits.order_page.payment_status", "Payment")}:
            </span>
            <span className={`${styles.flits_value}`}>
              {" " + item?.order_paid}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
