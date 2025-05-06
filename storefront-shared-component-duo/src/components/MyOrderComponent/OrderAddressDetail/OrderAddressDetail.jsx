import { GlobalStore } from "redux-micro-frontend";
import Collapsible from "react-collapsible";
import styles from "./OrderAddressDetailModule.module.css";
import React from "react";

export const OrderAddressDetail = ({ orderMode, item, addressMode }) => {
  const getStore = GlobalStore.Get();
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();

  return (
    <Collapsible open={orderMode && addressMode}>
      <div className={styles.flits_address_breakdown}>
        <div className={styles.flits_address_row}>
          <p className={`${styles.flits_strong} ${styles.flits_mr_5}`}>
            {`${t("flits.order_page.shipping_address", "Shipping Address")}: `}
          </p>
          <p>{`${item?.order_shipping_address?.name} ${item?.order_shipping_address?.company} ${item?.order_shipping_address?.address1} ${item?.order_shipping_address?.address2} ${item?.order_shipping_address?.zip} ${item?.order_shipping_address?.city} ${item?.order_shipping_address?.province_code} ${item?.order_shipping_address?.country}`}</p>
        </div>
        <div className={styles.flits_address_row}>
          <p className={`${styles.flits_strong} ${styles.flits_mr_5}`}>
            {`${t("flits.order_page.billing_address", "Billing Address")}: `}
          </p>
          <p>{`${item?.order_billing_address?.name} ${item?.order_billing_address?.company} ${item?.order_billing_address?.address1} ${item?.order_billing_address?.address2} ${item?.order_billing_address?.zip} ${item?.order_billing_address?.city} ${item?.order_billing_address?.province_code} ${item?.order_billing_address?.country}`}</p>
        </div>
      </div>
    </Collapsible>
  );
};
