import styles from "./SelectTopOrder.module.css";
import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import { RenderSvgString } from "../../General/RenderSvgString";
import { useSelector } from 'react-redux';

export const SelectTopOrder = ({ item, handleChange }) => {
  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;
    const orderField = useSelector(
      (state) => state.storeFrontTopOrderProduct.orderField
    );
    const available = orderField[`${item[0]?.product_id}Availabel`]
    const productTitle = orderField[`${item[0]?.product_id}ProductTitle`]
  const { t } = useTranslationLanguage();

  if(item?.length === 1 && item[0]?.product_title === "Default Title") {
    return null;
  }
  return (
    <div className={styles.flits_select_row}>
      <select
      defaultValue={(available === "true" || available === true)
              ? productTitle
              : `${productTitle?.replace(" - Sold Out", "")} - ${t("flits.buttons.sold_out",
              "Sold Out")}`}
        onChange={handleChange}
        className={`${styles.flits_input} ${styles.flits_variant_select}`}
      >
        {item?.map((data, index) => (
          <option {...data} key={index}>
            {(data?.available === "true" || data?.available === true)
              ? data?.product_title
              : `${data?.product_title?.replace(" - Sold Out", "")} - ${t("flits.buttons.sold_out","Sold Out")}`}
          </option>
        ))}
      </select>
      <div className={styles.flits_select_arrow}><RenderSvgString svgString={window?.UnoIcon?.DownArrow} 
/></div>
    </div>
  );
};
