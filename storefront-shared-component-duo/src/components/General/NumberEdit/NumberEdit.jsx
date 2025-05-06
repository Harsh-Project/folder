import styles from "./NumberEditModule.module.css";
import React, { useState } from "react";
import { GlobalStore } from 'redux-micro-frontend';
import { RenderSvgString } from "../RenderSvgString";

export const NumberEdit = (props) => {
  const getStore = GlobalStore.Get();
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage()
  const { mode, dispatch, message } = props
  const [count, setCount] = useState(1);

  const handlePlus = () => {
    if(count + 1 > parseInt(props?.item?.inventory_quantity) && parseInt(props?.item?.inventory_quantity) > 0) {
      dispatch(mode("information"))
      dispatch(message(t("flits.general.cant_add_more_quantity", "You have reached the maximum limit. You cannot add any more items.")))
      setTimeout(() => {
        dispatch(mode(null))
        dispatch(message(""))
      }, 2500)
    }
    if(parseInt(props?.item?.inventory_quantity) > 0) {
    props?.onClickEvent(Math.min(parseInt(props?.item?.inventory_quantity), count + 1));
    setCount(Math.min(parseInt(props?.item?.inventory_quantity), count + 1));
    }
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
    if(update > parseInt(props?.item?.inventory_quantity) && parseInt(props?.item?.inventory_quantity) > 0) {
      update = parseInt(props?.item?.inventory_quantity)
      dispatch(mode("information"))
      dispatch(message(t("flits.general.cant_add_more_quantity")))
      setTimeout(() => {
        dispatch(mode(null))
        dispatch(message(""))
      }, 2500)
    }
    props?.onClickEvent(update);
    setCount(update);
  };

  return (
    <div
      className={`${styles.flits_product_quantity} ${
        props?.item?.available === false ? styles.flits_disabled : ""
      }`}
    >
      <input
        type="text"
        className={styles.flits_input}
        placeholder=""
        name="product_quantity_input"
        value={count}
        disabled={!props?.item?.available}
        onChange={handleInputChange}
        min="1"
        max="99001028"
      />
      <span
        className={styles.flits_quantity_btn}
        data-flits-qty-btn="plus"
        onClick={() => {
          if (props?.item?.available) handlePlus();
        }}
      >
        <RenderSvgString svgString={window?.DuoIcon?.PlusWishList} />
      </span>
      <span
        className={styles.flits_quantity_btn}
        data-flits-qty-btn="minus"
        onClick={() => {
          if (props?.item?.available) handleMinus();
        }}
      >
        <RenderSvgString svgString={window?.DuoIcon?.MinusWishList} />
      </span>
    </div>
  );
};
