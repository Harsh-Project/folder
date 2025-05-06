import styles from "./ContactUsButtonModule.module.css"
import React from "react";
import { useDispatch } from 'react-redux';

export const ContactUsButton = (props) => {
  const dispatch = useDispatch()
  const setForm =
    window.orderState("setForm");

  const handleContactUs = () => {
    dispatch(setForm(true));
  }
  return (
    <button
      type="button"
      onClick={handleContactUs}
      className={`${styles.flits_button} ${styles.flits_secondary_btn} ${styles.flits_contact_us_btn}`}
    >
      {props?.label}
    </button>
  );
};
