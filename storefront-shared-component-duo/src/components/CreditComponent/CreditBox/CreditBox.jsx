import styles from "./CreditBoxModule.module.css"
import React, { Suspense } from "react"
import { MoneyFormat } from '../../General/MoneyFormat/MoneyFormat';

export const CreditBox = ({ label, value}) => {
  return (
    <>
      <p className={`${styles.flits_credit_title}`}>{label}</p>
      <p className={`${styles.flits_credit_value}`}><Suspense fallback={<></>}><MoneyFormat price={value}/></Suspense></p>
    </>
  );
};
