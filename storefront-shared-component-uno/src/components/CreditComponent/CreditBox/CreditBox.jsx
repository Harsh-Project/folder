import styles from "./CreditBox.module.css"
import React from "react"

export const CreditBox = ({ label, value}) => {
  return (
    <>
      <p className={`${styles.flits_credit_title}`}>{label}</p>
      <p className={`${styles.flits_credit_value}`} dangerouslySetInnerHTML={{__html: value}}></p>
    </>
  );
};
