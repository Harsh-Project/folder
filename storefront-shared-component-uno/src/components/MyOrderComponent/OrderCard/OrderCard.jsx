import { useSelector } from "react-redux";
import styles from "./OrderCard.module.css";
import React, { Suspense } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";
import { GlobalStore } from "redux-micro-frontend";
import { SkeletonOrder } from '../../Skeleton/SkeletonOrder/SkeletonOrder';
import { OrderStatus } from '../OrderStatus/OrderStatus';
import { OrderLineItem } from '../OrderLineItem/OrderLineItem';
import { OrderActionItem } from '../OrderActionItem/OrderActionItem';

export const OrderCard = (props) => {
  const { item, handleReOrder } = props;
  const [isLoading, setIsLoading] = useState(true);
  const getStore = GlobalStore.Get();
  const GetLocalStorage = getStore._globalActions.Helpers[0].GetLocalStorage;
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();
  const [tippyData, setTippyData] = useState(null);
  const orderData = useSelector((state) => state.storeFrontOrder.orderData);

  const getDate = useCallback(
    (date) => {
      const months = [
        t("flits.months.january", "January"),
        t("flits.months.february", "February"),
        t("flits.months.march", "March"),
        t("flits.months.april", "April"),
        t("flits.months.may", "May"),
        t("flits.months.june", "June"),
        t("flits.months.july", "July"),
        t("flits.months.august", "August"),
        t("flits.months.september", "September"),
        t("flits.months.october", "October"),
        t("flits.months.november", "November"),
        t("flits.months.december", "December"),
      ];

      let datetime = new Date(date);
      let formattedDate =
        datetime.getDate() +
        " " +
        months[datetime.getMonth()] +
        " " +
        datetime.getFullYear();
      let hours = datetime.getHours();
      let minutes = datetime.getMinutes();
      minutes = minutes < 10 ? "0" + minutes : minutes;
      let ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      let formattedTime = hours + ":" + minutes + " " + ampm;
      return formattedDate + ", " + formattedTime;
    },
    [t]
  );

  useEffect(() => {
    if (orderData) {
      setIsLoading(false);
    }
  }, [orderData]);

  useEffect(() => {
    const contactData = GetLocalStorage(
      `contact_us_order_list${window?.flitsThemeAppExtensionObjects?.customer?.customer_id}`
    );
    for (let i = 0; i < contactData?.length; i++) {
      if (contactData[i]?.order_id === item?.order_id) {
        setTippyData(
          t(
            "flits.order_contact_us.already_contacted_message",
            "You have contacted us last on {{ date_time }}",
            { date_time: getDate(contactData[i]?.date) }
          )
        );
        break;
      }
    }
  }, [item?.order_id, t, GetLocalStorage, getDate]);

  if (!orderData && !isLoading) {
    return null;
  }

  if (isLoading) {
    return (
      <Suspense fallback={<></>}>
        <SkeletonOrder />
      </Suspense>
    );
  }
  return (
    <>
      <div className={styles.flits_order_card}>
        <Suspense fallback={<></>}>
          <OrderStatus item={item} />
          <OrderLineItem item={item?.line_items} />
          <OrderActionItem
            item={{ ...item, tippyData: tippyData }}
            handleReOrder={handleReOrder}
          />
        </Suspense>
      </div>
    </>
  );
};
