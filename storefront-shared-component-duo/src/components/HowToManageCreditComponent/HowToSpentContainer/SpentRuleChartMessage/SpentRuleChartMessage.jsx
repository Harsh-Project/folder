import styles from "./SpentRuleChartMessage.module.css";
import React, { Suspense } from "react";
import { GlobalStore } from "redux-micro-frontend";
import { HowToSpentHeaderChart1 } from "../../HowToSpentHeader/HowToSpentHeaderChart1/HowToSpentHeaderChart1"
import { formatMoney } from "../../../General/formatMoney";
import { useSelector } from "react-redux";

export const SpentRuleChartMessage = () => {
  const getStore = GlobalStore.Get();
  const creditData = useSelector((state) => state.storeFrontCredit.creditData);

  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();
  return (
    <div
      className={`${styles.flits_mobile_box_card} ${styles.flits_chart_box_card}`}
    >
    <Suspense fallback={<></>}>
      <HowToSpentHeaderChart1 />
      </Suspense>
      <div className={styles.flits_current_credit_info}>
        <p
          className={styles.flits_current_balance_title}
          dangerouslySetInnerHTML={{
            __html: t(
              "flits.how_to_spend_credit_page.still_you_have_remaining_credit",
              "You have {{ credit }} credit remaining",
              {
                credit: formatMoney(
                  Math.abs(creditData?.customer?.credits),
                  window?.flitsThemeAppExtensionObjects?.money_format
                ),
              }
            ),
          }}
        ></p>
        <span
          className={styles.flits_spend_credit_tag_line}
          dangerouslySetInnerHTML={{
            __html: t(
              "flits.how_to_spend_credit_page.header_line_html",
              "Spend More <strong>Save More</strong>"
            ),
          }}
        ></span>
      </div>
    </div>
  );
};
