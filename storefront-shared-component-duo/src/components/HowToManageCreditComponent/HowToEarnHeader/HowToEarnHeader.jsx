import styles from "./HowToEarnHeaderModule.module.css";
import React, { Suspense } from "react";
import { HowToEarnHeaderImage } from "./HowToEarnHeaderImage/HowToEarnHeaderImage"
import { HowToEarnHeaderTitle } from "./HowToEarnHeaderTitle/HowToEarnHeaderTitle"
import { HowToEarnHeaderChart } from "./HowToEarnHeaderChart/HowToEarnHeaderChart"

export const HowToEarnHeader = () => {
  return (
    <div className={styles.flits_account_box_header}>
      <Suspense fallback={<></>}>
      <HowToEarnHeaderChart />
      <HowToEarnHeaderTitle />
      <HowToEarnHeaderImage />
      </Suspense>
    </div>
  );
};
