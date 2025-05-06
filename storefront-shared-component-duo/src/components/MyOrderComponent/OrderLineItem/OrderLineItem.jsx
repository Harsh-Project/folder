import { GlobalStore } from "redux-micro-frontend";
/* eslint-disable jsx-a11y/anchor-is-valid */

import styles from "./OrderLineItemModule.module.css";
import React from "react";

export const OrderLineItem = ({ item }) => {
  const getStore = GlobalStore.Get();

  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;

  const { t } = useTranslationLanguage();
  return (
    <div className={`${styles.flits_order_row} ${styles.flits_line_items_row}`}>
      <div className={styles.flits_order_item_row}>
        {item?.map((data, index) => {
          return (
            <div className={styles.flits_order_item} key={index}>
              <div className={styles.flits_item_img}>
                <a>
                  <img src={data?.image} alt="" />
                </a>
                <span
                  className={`${styles.flits_badge} ${styles.flits_badge_primary}`}
                >
                  {data?.quantity}
                </span>
                {data?.available === "false" && (
                  <div className={styles.flits_ribbion_overlay}>
                    <span
                      className={`${styles.flits_bottom_full} ${styles.flits_ribbion} ${styles.flits_red}`}
                    >
                      {t("flits.order_page.sold_out", "Sold Out")}
                    </span>
                  </div>
                )}
                {data?.publish_at === "" && (
                  <div className={styles.flits_ribbion_overlay}>
                    <span
                      className={`${styles.flits_bottom_full} ${styles.flits_ribbion} ${styles.flits_red}`}
                    >
                      {t("flits.order_page.product_unavailable", "Unavailable")}
                    </span>
                  </div>
                )}
              </div>
              <div
                className={`${styles.flits_item_details} ${styles.flits_left}`}
              >
                <a
                  href={data?.url}
                  className={`${styles.flits_link} ${styles.flits_item_title}`}
                  data-tippy-content="mango"
                >
                  {data?.title}
                </a>
                <p className={styles.flits_item_price}>{data?.value_price}</p>
                {!data?.id && (
                  <p className={styles.flits_item_price}>
                    {t("flits.order_page.product_unavailable", "Unavailable")}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
