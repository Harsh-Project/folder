import styles from "./ContactUsButton.module.css"
import React from "react";
import { GlobalStore } from 'redux-micro-frontend';
import { useDispatch } from 'react-redux';
import { useRef } from "react";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import { useEffect } from "react";

export const ContactUsButton = ({ item }) => {
  const getStore = GlobalStore.Get();
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();
  const dispatch = useDispatch();
  const setForm = window.orderState("setForm");

  const tooltipInstance = useRef(null);

  const handleContactUs = () => {
    dispatch(setForm(item?.order_id));
  };

  useEffect(() => {
    tippy(tooltipInstance.current, {
      content: item?.tippyData,
      placement: "top",
      arrow: true,
      theme: "light",
    });
  }, [item?.tippyData, tooltipInstance]);
  return (
    <button
      type="button"
      onClick={handleContactUs}
      className={`${styles.flits_button} ${styles.flits_secondary_btn} ${styles.flits_contact_us_btn}`}
    >
      {t("flits.order_contact_us.contact_us_button", "Contact Us")}
    </button>
  );
};
