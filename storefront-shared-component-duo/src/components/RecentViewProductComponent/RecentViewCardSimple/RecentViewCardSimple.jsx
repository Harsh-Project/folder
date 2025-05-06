import styles from "./RecentViewCardSimpleModule.module.css";
import React, { Suspense, useEffect, useRef } from "react";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import { MoneyFormat } from "../../General/MoneyFormat/MoneyFormat";

export const RecentViewCardSimple = (props) => {
  const { productData } = props;

  const tooltipRef = useRef(null);
  useEffect(() => {
    if (tooltipRef.current) {
      tippy(tooltipRef.current, {
        content: productData?.title,
        placement: "top",
        arrow: true,
        theme: "light",
      });
    }
  }, [productData?.title]);

  return (
    <div
      data-flits-product-handle={productData?.handle}
      data-flits-product-id={productData?.id}
      className={`${styles.flits_product_item_cart} ${styles.flits_produt_cart} ${styles.flits_wishlist_card}`}
    >
      <div className={styles.flits_product_item_main}>
        <div className={styles.flits_product_item}>
          <a href={`${window?.commonEndpoint?.product ?? ""}/products/${productData?.handle}`}>
            <p
              className={`${styles.flits_product_name} ${styles.flits_link} ${styles.flits_text_ellipsis}`}
              ref={tooltipRef}
            >
              {productData?.title}
            </p>
          </a>
          <a
            href={`${window?.commonEndpoint?.product ?? ""}/products/${productData?.handle}`}
            className={styles.flits_product_image_thumbnail}
          >
            <img
              src={
                !productData?.variants[0]?.image
                  ? `https://cdn.shopify.com/s/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c_200x_crop_center.gif`
                  : `https:${productData?.variants[0]?.image}`
              }
              alt={productData?.variants[0]?.title}
            />
          </a>
          <p className={styles.flits_product_price}>
            <Suspense fallback={<></>}>
              <MoneyFormat
                price={parseFloat(productData?.variants[0]?.price) / 100}
              />
            </Suspense>
          </p>
        </div>
        <div className={`${styles.flits_product_action_group}`}>
          {props?.children}
        </div>
      </div>
    </div>
  );
};
