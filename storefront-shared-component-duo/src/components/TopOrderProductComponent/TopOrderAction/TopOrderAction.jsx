import styles from "./TopOrderActionModule.module.css";
import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useSelector } from "react-redux";

export const TopOrderAction = (props) => {
  const { item } = props;
  const getStore = GlobalStore.Get();

  const orderField = useSelector(
    (state) => state.storeFrontTopOrderProduct.orderField
  );
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();

  return (
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
      <div className={styles.flits_product_action_group}>{props?.children}</div>
    </div>
  );
};
