import styles from "./TopOrderCardModule.module.css";
import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { GlobalStore } from "redux-micro-frontend";
import { TopOrderInfo } from "../TopOrderInfo/TopOrderInfo";

export const TopOrderCard = (props) => {
  const { item } = props;
  const getStore = GlobalStore.Get();
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();
  const orderField = useSelector(
    (state) => state.storeFrontTopOrderProduct.orderField
  );

  return (
    <>
      <div
        className={`${styles.flits_product_card} ${styles.flits_top_order_card} ${styles.flits_desktop}`}
      >
        <Suspense fallback={<></>}>
          <TopOrderInfo item={item} />
        </Suspense>
        {props?.children}
      </div>
      <div
        className={`${styles.flits_product_card} ${styles.flits_top_order_card} ${styles.flits_mobile}`}
      >
        <div className={styles.flits_order_details}>
          <div className={styles.flits_product_quantity_header}>
            <span>{`${t(
              "flits.top_ordered_products_page.number_of_order",
              "Total quantity ordered till now"
            )}:`}</span>
            <span className={`${styles.flits_product_quantity}`}>
              {` ${orderField[`${item[0]?.product_id}TotalQuantity`]}`}
            </span>
          </div>
          <div className={styles.flits_order_main_details}>
            <Suspense fallback={<></>}>
              <TopOrderInfo item={item} />
            </Suspense>
            {props?.children}
          </div>
        </div>
      </div>
    </>
  );
};
