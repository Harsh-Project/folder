/* eslint-disable jsx-a11y/anchor-is-valid */
import { GlobalStore } from "redux-micro-frontend";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import styles from "./OrderLineItem.module.css";
import React, { Suspense } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { MoneyFormat } from '../../General/MoneyFormat/MoneyFormat';


export const OrderLineItem = ({ item }) => {
  const getStore = GlobalStore.Get();

  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;
  const { t } = useTranslationLanguage();

  const nameRef = useRef([]);

  useEffect(() => {
    nameRef.current.forEach((productTitleRef, index) => {
      if (productTitleRef) {
        if (productTitleRef._tippy) {
          productTitleRef._tippy.setContent(item[index]?.title);
        } else {
          tippy(productTitleRef, {
            content: item[index]?.title,
            placement: "top",
          });
        }
      }
    });
  }, [item]);
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
                  ref={(element) => (nameRef.current[index] = element)}
                  className={`${styles.flits_link} ${styles.flits_item_title}`}
                >
                  {data?.title}
                </a>
                <p className={styles.flits_item_price}>
                  <Suspense fallback={<></>}>
                    <MoneyFormat price={data?.value_price / 100} />
                  </Suspense>
                </p>
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
