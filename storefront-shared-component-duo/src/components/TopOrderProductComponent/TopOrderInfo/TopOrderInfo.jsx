import React, { useEffect, useRef } from "react";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import styles from "./TopOrderInfoModule.module.css";
import { useSelector } from "react-redux";

export const TopOrderInfo = ({ item }) => {
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
    <div className={styles.flits_order_item}>
      <a href={orderField[`${item[0]?.product_id}Url`]}>
        <p
          className={`${styles.flits_produt_name} ${styles.flits_link} ${styles.flits_text_ellipsis}`}
          ref={tooltipRef}
        >
          {orderField[`${item[0]?.product_id}Title`]}
        </p>
      </a>
      <div className={styles.flits_product_image_thumbnail}>
        <img
          src={!orderField[`${item[0]?.product_id}Image`] ? "https://cdn.shopify.com/s/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c_200x_crop_center.gif" : `https:${orderField[`${item[0]?.product_id}Image`]}`}
          alt=""
        />
      </div>
      <p className={styles.flits_product_price}>
        {orderField[`${item[0]?.product_id}ValuePrice`]}
      </p>
    </div>
  );
};
