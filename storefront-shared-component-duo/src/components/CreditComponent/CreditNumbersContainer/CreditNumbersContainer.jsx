import styles from "./CreditNumbersContainerModule.module.css";
import React, { Suspense } from "react";
import { GlobalStore } from "redux-micro-frontend";
import { EarnCredit } from "./EarnCredit/EarnCredit";
import { SpentCredit } from "./SpentCredit/SpentCredit";
import { CurrentCrdit } from "./CurrentCredit/CurrentCredit";

export const CreditNumbersContainer = ({ handleData }) => {
  const getStore = GlobalStore.Get();

  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();
  return (
    <>
      <div
        className={`${styles.flits_mobile_box_card} ${styles.flits_header_title} ${styles.flits_p_10}`}
      >
        <span
          dangerouslySetInnerHTML={{
            __html: t(
              "flits.credit_page.header_line_html",
              "Save Money <strong>Through Rewards</strong>"
            ),
          }}
        ></span>
      </div>
      <div className={styles.flits_credit_category_container}>
        <div className={styles.flits_credit_category_div}>
          <Suspense fallback={<></>}>
            <EarnCredit handleData={handleData} />
            <SpentCredit handleData={handleData} />
            <CurrentCrdit handleData={handleData} />
          </Suspense>
        </div>
      </div>
    </>
  );
};
