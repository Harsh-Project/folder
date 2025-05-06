import styles from "./PrimaryButtonModule.module.css";
import React from "react";
import { GlobalStore } from "redux-micro-frontend";

export const PrimaryButton = (props) => {
  const getStore = GlobalStore.Get();
  const API = getStore._globalActions.API[0].API;

  const isDisabledOrNot = () => {
    const data = props?.item?.line_items;

    for(let i=0; i<data?.length; i++) {
      if(data[i].available === "true") {
        return false;
      }
    }

    return true
  }

  const handleReOrder = async () => {
    const data = {};
    let j = 0;
    for (let i = 0; i < props?.item?.line_items?.length; i++) {
      if (props?.item?.line_items[i]?.id !== "") {
        data[`items[${j}][id]`] = props?.item?.line_items[i]?.id;
        data[`items[${j}][quantity]`] = props?.item?.line_items[i]?.quantity;
        j++;
      }
    }

    const res = await API.order.reorder(data);
    console.log(res);

    window.location.href = `https://${window.location.host}/${window?.commonEndpoint?.cart ?? "cart"}`;
  };
  return (
    <button
      disabled={isDisabledOrNot()}
      className={`${styles.flits_button} ${styles.flits_primary_btn} ${styles.flits_mt_10} ${styles.fits_reorder_btn}`}
      onClick={handleReOrder}
      type="button"
    >
      {props?.label}
    </button>
  );
};
