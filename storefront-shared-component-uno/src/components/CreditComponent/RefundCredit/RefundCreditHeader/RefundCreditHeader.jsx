import React from "react";
import styles from "./RefundCreditHeader.module.css";
import { MoneyFormat } from "../../../General/MoneyFormat/MoneyFormat";
import { RenderSvgString } from "../../../General/RenderSvgString";
import { GlobalStore } from "redux-micro-frontend";

export const RefundCreditHeader = ({ refundCredit }) => {
  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;
  const { t } = useTranslationLanguage();
  return (
      <div className={styles.flits_refund_tab_header}>
        <div className={styles.flits_refund_credit_svg_section}>
          <div className={styles.flits_refund_svg}>
            <RenderSvgString svgString={window?.UnoIcon?.RefundCredit} />
          </div>
          <div className={styles.flits_refund_svg_text}>
            <span className={styles.flits_refund_svg_text_1}>
              {t(
                "flits.credit_page.refund_credit_header_text_1",
                "Store credit"
              )}
            </span>
            <span className={styles.flits_refund_svg_text_2}>
              {t(
                "flits.credit_page.refund_credit_header_text_2",
                "Refund balance"
              )}
            </span>
          </div>
        </div>
        <div className={styles.flits_refund_credit_header_divider}></div>
        <div className={styles.flits_refund_credit}>
          {parseFloat(refundCredit ?? 0) < 0 ? "-" : ""}
          <MoneyFormat price={Math.abs(refundCredit ?? 0) / 100} />
        </div>
      </div>
  );
};
