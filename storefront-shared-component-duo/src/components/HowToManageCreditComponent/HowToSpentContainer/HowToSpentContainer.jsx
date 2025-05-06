import styles from "./HowToSpentContainerModule.module.css";
import React, { Suspense } from "react";
import { SpentRuleContainer } from "./SpentRuleContainer/SpentRuleContainer"
import { HowItWorkContainer } from "./HowItWorkContainer/HowItWorkContainer"
import { SpentRuleChartMessage } from "./SpentRuleChartMessage/SpentRuleChartMessage"

export const HowToSpentContainer = ({ item }) => {
  return (
    <>
      <div className={styles.flits_desktop}>
        <Suspense fallback={<></>}>
          <SpentRuleContainer item={item} />
          <HowItWorkContainer />
        </Suspense>
      </div>
      <div className={styles.flits_mobile}>
        <Suspense fallback={<></>}>
          <SpentRuleChartMessage />
          <SpentRuleContainer item={item} />
        </Suspense>
      </div>
    </>
  );
};
