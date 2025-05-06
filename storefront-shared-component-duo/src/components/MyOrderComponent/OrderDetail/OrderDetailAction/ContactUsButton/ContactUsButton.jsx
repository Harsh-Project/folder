import styles from "./ContactUsButtonModule.module.css";
import tippy from "tippy.js"; 
import "tippy.js/dist/tippy.css";
import React, { useCallback, useEffect, useRef } from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useDispatch } from "react-redux";

export const ContactUsButton = ({ item }) => {
  const getStore = GlobalStore.Get();
  const GetLocalStorage = getStore._globalActions.Helpers[0].GetLocalStorage;
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();
  const dispatch = useDispatch();
  const setForm = window.orderState("setForm");
  const tippyElementInstance = useRef(null);
  let tippyInstance = useRef(null);
  const getDate = useCallback((date) => {
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
  },[t]);
  const getTooltipContent = useCallback(() => {
    const contactData = GetLocalStorage(
      `contact_us_order_list${window?.flitsThemeAppExtensionObjects?.customer?.customer_id}`
    );
    for (let i = 0; i < contactData?.length; i++) {
      if (contactData[i]?.order_id === item?.order_id) {
          return t(
            "flits.order_contact_us.already_contacted_message",
            "You have contacted us last on {{ date_time }}",
            { date_time: getDate(contactData[i]?.date) }
          )
      }
    }
    return "";
  },[item, GetLocalStorage, getDate, t])
  useEffect(() => {
    const tooltip = getTooltipContent();
    if(tippyInstance.current){
      tippyInstance.current.destroy();
      tippyInstance.current = null;
    }
    if(tooltip !== ""){
      tippyInstance.current = tippy(tippyElementInstance.current, {
        content: tooltip,
        placement: "top",
        arrow: true,
        theme: "light",
      });
    }
  });
  const handleContactUs = () => {
    dispatch(setForm(item?.order_id));
  };


  return (
    <button
      type="button"
      ref={tippyElementInstance}
      onClick={handleContactUs}
      data-flits-order-id={item?.order_id}
      className={`flits_contact_us_button ${styles.flits_button} ${styles.flits_secondary_btn} ${styles.flits_mx_15} ${styles.flis_my_10} ${styles.flits_contact_us_btn}`}
    >
      {t("flits.order_contact_us.contact_us_button", "Contact Us")}
    </button>
  );
};
