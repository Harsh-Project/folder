/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import styles from "./TopOrderInfo.module.css";
import { useSelector } from "react-redux";
import { GlobalStore } from "redux-micro-frontend";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import { useEffect } from "react";
import { useRef } from "react";

export const TopOrderInfo = ({ item }) => {
  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;
  const { t } = useTranslationLanguage();
  const orderField = useSelector(
    (state) => state.storeFrontTopOrderProduct.orderField
  );

  const tooltipRef = useRef(null);
  const tooltipInstance = useRef(null);

  useEffect(() => {
    if (tooltipInstance.current) {
      tooltipInstance.current.destroy();
    }

    tooltipInstance.current = tippy(tooltipRef.current, {
      content: orderField[`${item[0]?.product_id}Title`],
      arrow: true,
      placement: "top",
      theme: "light",
    });

    return () => {
      if (tooltipInstance.current) {
        tooltipInstance.current.destroy();
      }
    };
  }, [orderField, item]);
  return (
    <div className={styles.flits_top_product_left_info}>
      <a className={styles.flits_product_image}>
        <img
          src={
            !orderField[`${item[0]?.product_id}Image`]
              ? "https://cdn.shopify.com/s/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c_200x_crop_center.gif"
              : `https:${orderField[`${item[0]?.product_id}Image`]}`
          }
          alt=""
        />
      </a>
      <div className={styles.flits_product_info}>
        <a
          ref={tooltipRef}
          className={`${styles.flits_product_name} ${styles.flits_link}`}
          href={orderField[`${item[0]?.product_id}Url`]}
        >
          {orderField[`${item[0]?.product_id}Title`]}
        </a>
        <p className={`${styles.flits_product_price} ${styles.flits_mt_10}`}>
          {orderField[`${item[0]?.product_id}ValuePrice`]}
        </p>
        <p
          className={`${styles.flits_product_item_count} ${styles.flits_mt_10}`}
        >
          <span>{`${t(
            "flits.top_ordered_products_page.number_of_order",
            "Total quantity ordered till now"
          )}:`}</span>
          <span className={`${styles.flits_product_count}`}>
            {` ${orderField[`${item[0]?.product_id}TotalQuantity`]}`}
          </span>
        </p>
      </div>
    </div>
  );
};
