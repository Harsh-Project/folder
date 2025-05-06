import styles from "./NumberEditTopOrder.module.css";
import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { GlobalStore } from 'redux-micro-frontend';

export const NumberEditTopOrder = (props) => {
  const getStore = GlobalStore.Get();
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage()
  const orderField = useSelector(
    (state) => state.storeFrontTopOrderProduct.orderField
  );
  const { mode, dispatch, message } = props
  const [count, setCount] = useState(parseInt(orderField[`${props?.item[0]?.product_id}Quantity`]));

  const handlePlus = () => {
    if(count + 1 > parseInt(orderField[`${props?.item[0]?.product_id}Inventory`]) && parseInt(orderField[`${props?.item[0]?.product_id}Inventory`]) > 0) {
      dispatch(mode("information"))
      dispatch(message(t("flits.general.cant_add_more_quantity", "You have reached the maximum limit. You cannot add any more items.")))
      setTimeout(() => {
        dispatch(mode(null))
        dispatch(message(""))
      }, 2500)
    }
    if(parseInt(orderField[`${props?.item[0]?.product_id}Inventory`]) > 0) {
      props?.onClickEvent(Math.min(parseInt(orderField[`${props?.item[0]?.product_id}Inventory`]), count + 1));
      setCount(Math.min(parseInt(orderField[`${props?.item[0]?.product_id}Inventory`]), count + 1));}
      else {
        props?.onClickEvent(count + 1);
        setCount(count + 1)
      }
  };

  const handleMinus = () => {
    props?.onClickEvent(Math.max(1, count - 1));
    setCount(Math.max(1, count - 1));
  };

  const handleInputChange = (e) => {
    const cleanedValue = e.target.value.replace(/[^0-9]/g, "");
    let update = cleanedValue === "" ? 1 : parseInt(cleanedValue) === 0 ? 1 : parseInt(cleanedValue)
    if(update > parseInt(orderField[`${props?.item[0]?.product_id}Inventory`]) && parseInt(orderField[`${props?.item[0]?.product_id}Inventory`]) > 0) {
      update = parseInt(orderField[`${props?.item[0]?.product_id}Inventory`])
      dispatch(mode("information"))
      dispatch(message(t("flits.general.cant_add_more_quantity")))
      setTimeout(() => {
        dispatch(mode(null))
        dispatch(message(""))
      }, 2500)
    }
    props?.onClickEvent(update);
    setCount(update);
  }

  return (
    <div className={`${styles.flits_product_quantity} ${props?.item?.length > 1 ? styles.flits_fw : styles.w_100} ${orderField[`${props?.item[0]?.product_id}Availabel`] === false ? styles.flits_disabled : ""}`}>
      <input
        type="text"
        className={styles.flits_input}
        placeholder=""
        name="product_quantity_input"
        value={count}
        onChange={handleInputChange}
        min="1"
        max="1982"
      />
      <span
        className={styles.flits_quantity_btn}
        data-flits-qty-btn="plus"
        onClick={handlePlus}
      >
        +
      </span>
      <span
        className={styles.flits_quantity_btn}
        data-flits-qty-btn="minus"
        onClick={handleMinus}
      >
        -
      </span>
    </div>
  );
};
