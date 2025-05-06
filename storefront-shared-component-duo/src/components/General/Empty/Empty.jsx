import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import styles from "./EmptyModule.module.css";
import { RenderSvgString } from "../RenderSvgString";

export const Empty = (props) => {
  const { message1, needMT15, message2, needShadow, svgProp, shopNowButton } =
    props;
  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;

  const { t } = useTranslationLanguage();

  return (
    <div
      className={`${styles.flits_empty_container} ${
        needShadow === false ? styles.flits_without_boxshadow : ""
      } ${needMT15 ? styles.flits_mt_15 : ""}`}
    >
      <div className={styles.flits_empty_icon_box}>
        {svgProp ? (
          svgProp
        ) : (
          <RenderSvgString svgString={window?.DuoIcon?.EmptyBox} />
        )}
      </div>
      <div className={styles.flits_empty_text_div}>
        <p
          className={`${styles.flits_empty_text} ${styles.flits_mb_20}`}
          dangerouslySetInnerHTML={{ __html: message1 }}
        ></p>
        <p
          className={`${styles.flits_empty_text} ${styles.flits_strong}`}
          dangerouslySetInnerHTML={{ __html: message2 }}
        ></p>
      </div>
      <a
        type=""
        className={`${styles.flits_button} ${styles.flits_empty_button} ${styles.flits_primary_btn} ${styles.flits_mt_20}`}
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
