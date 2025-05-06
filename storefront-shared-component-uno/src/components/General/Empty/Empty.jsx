import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import styles from "./Empty.module.css";
import { RenderSvgString } from "../RenderSvgString";

export const Empty = (props) => {
  const { isPositionRelative, message1, message2, shopNowButton } = props;
  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;

  const { t } = useTranslationLanguage();

  return (
    <div
      className={`${styles.flits_empty_section} ${
        isPositionRelative ? styles.flits_relative : ""
      }`}
    >
      <div className={styles.flits_empty_icon_box}>
        <RenderSvgString svgString={window?.UnoIcon?.EmptyBox} />
      </div>
      <p
        dangerouslySetInnerHTML={{ __html: message1 && message1 }}
        className={styles.flits_empty_text_message}
      ></p>
      <p
        dangerouslySetInnerHTML={{ __html: message2 && message2 }}
        className={styles.flits_empty_text_message}
      ></p>
      <a
        type=""
        className={`${styles.flits_button} ${styles.flits_primary_btn} ${styles.flits_mt_10} ${styles.flits_ml_0}`}
        href={`${window?.commonEndpoint?.collection ?? ""}/collections/all`}
      >
        {shopNowButton ??
          (!props?.isRefund
            ? t("flits.buttons.shop_now", "View Products")
            : t("flits.credit_page.refund_shop_now", "Continue shopping"))}
      </a>
    </div>
  );
};
