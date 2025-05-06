import styles from "./HowToSpentHeaderModule.module.css";
import React, { Suspense } from "react";
import { HowToSpentHeaderChart1 } from './HowToSpentHeaderChart1/HowToSpentHeaderChart1';
import { HowToSpentHeaderTitle } from './HowToSpentHeaderTitle/HowToSpentHeaderTitle';
import { HowToSpentHeaderChart2 } from './HowToSpentHeaderChart2/HowToSpentHeaderChart2';

export const HowToSpentHeader = () => {
  return (
    <div className={styles.flits_account_box_header}>
    <Suspense fallback={<></>}>
      <HowToSpentHeaderChart1 />
      <HowToSpentHeaderTitle />
      <HowToSpentHeaderChart2 />
      </Suspense>
    </div>
  );
};
