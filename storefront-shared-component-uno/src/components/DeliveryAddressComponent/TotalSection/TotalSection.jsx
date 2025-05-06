import styles from "./TotalSection.module.css"
import React from 'react'
import { useSelector } from 'react-redux';

export const TotalSection = (props) => {
  const deliveryAddressData = useSelector(
    (state) => state.storeFrontDeliveryAddress.deliveryAddressData
  );
  return (
    <div className={`${styles.flits_address_list} ${styles.flits_address_list_pagination_row} ${styles.list} ${deliveryAddressData?.length > 0 ? styles.flits_hr : ""}`}>
        {props?.children}
    </div>
  )
}
