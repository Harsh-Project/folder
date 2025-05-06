import styles from "./OrderDetailActionModule.module.css";
import React, { Suspense } from "react";
import { GlobalStore } from "redux-micro-frontend";
import { ContactUsButton } from './ContactUsButton/ContactUsButton';
import { ReOrderButton } from './ReOrderButton/ReOrderButton';

export const OrderDetailAction = ({ item, handleReOrder }) => {
  const getStore = GlobalStore.Get();
  const CheckRequireField =
    getStore._globalActions.Helpers[0].CheckRequireField;
  const requireField = {
    reorder: ["IS_REORDER_ENABLE"],
    contactus: ["IS_ORDER_CONTACT_US_ENABLE"],
  };
  return (
    <div className={styles.flits_order_actions}>
      <div className={styles.flits_order_button_grp}>
        {CheckRequireField(requireField["contactus"]) && (
          <Suspense fallback={<></>}>
            <ContactUsButton item={item} />
          </Suspense>
        )}
        {CheckRequireField(requireField["reorder"]) && (
          <Suspense fallback={<></>}>
            <ReOrderButton item={item} handleReOrder={handleReOrder} />
          </Suspense>
        )}
      </div>
    </div>
  );
};
