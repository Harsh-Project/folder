import { GlobalStore } from "redux-micro-frontend";
import styles from "./OrderGrandTotalModule.module.css";
import React, { Suspense } from "react";
import { MoneyFormat } from '../../General/MoneyFormat/MoneyFormat';

export const OrderGrandTotal = ({ item }) => {
  const getStore = GlobalStore.Get();
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();

  return (
    <div className={styles.flits_grand_total}>
      <div>
        <p>{t("flits.order_page.grand_total", "Grand Total")}</p>
      </div>
      <p className={styles.flits_strong}><Suspense fallback={<></>}><MoneyFormat price={item?.order_total /100} /></Suspense></p>
    </div>
  );
};
