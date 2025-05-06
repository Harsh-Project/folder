import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import styles from "./ReferFriendDetailModule.module.css";
import React, { Suspense, useEffect, useRef } from "react";
import { GlobalStore } from "redux-micro-frontend";
import { MoneyFormat } from '../../General/MoneyFormat/MoneyFormat';

export const ReferFriendDetail = ({ item }) => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);

  const getStore = GlobalStore.Get();
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();

  useEffect(() => {
    if (nameRef.current) {
      tippy(nameRef.current, {
        content: item?.referrer_customer?.name === "--" ? t("flits.refer_friend_page.customer_deleted", "Customer Deleted") : item?.referrer_customer?.name,
        placement: "top",
      });
    }

    if (emailRef.current) {
      tippy(emailRef.current, {
        content: item?.referrer_customer?.email === "--" ? t("flits.refer_friend_page.customer_deleted", "Customer Deleted") : item?.referrer_customer?.email,
        placement: "top",
      });
    }
  }, [item]);
  return (
    <div className={styles.flits_credit_table_item}>
      <div
        className={`${styles.flits_row} ${styles.flits_d_flex} ${styles.flits_align_items_center}`}
      >
        <div
          className={`${styles.flits_col_sm_3} ${styles.flits_d_flex} ${styles.flits_align_items_center} ${styles.flits_justify_content_between}`}
        >
          <span
            className={`${styles.flits_referral_customer_name} ${styles.flits_text_ellipsis}`}
            ref={nameRef}
          >
            {item?.referrer_customer?.name === "--" ? t("flits.refer_friend_page.customer_deleted", "Customer Deleted") : item?.referrer_customer?.name}
          </span>
        </div>
        <div className={`${styles.flits_col_sm_4} ${styles.flits_d_flex}`}>
          <span
            className={`${styles.flits_text_ellipsis} ${styles.flits_referral_customer_email}`}
            ref={emailRef}
          >
            {item?.referrer_customer?.email === "--" ? t("flits.refer_friend_page.customer_deleted", "Customer Deleted") : item?.referrer_customer?.email}
          </span>
        </div>
        <div className={`${styles.flits_col_sm_3}`}>
          <span
            className={`${styles.flits_crdr} ${
              item?.credits < 0 ? styles.flits_dr : styles.flits_cr
            } ${styles.flits_referral_customer_credit}`}
          >
            <span
              className={`${styles.flits_crdr_sign} ${
                item?.credits < 0 ? styles.flits_dr : styles.flits_cr
              }`}
            >
              {item?.credits > 0 ? "+" : "-"}
            </span>
            <Suspense fallback={<></>}>
              <MoneyFormat price={Math.abs(item?.credits) / 100} />
            </Suspense>
          </span>
        </div>
        <div className={styles.flits_col_sm_2}>
          <span
            className={`${styles.flits_strong} ${styles.flits_referral_customer_credit_date}`}
          >
            {item?.created_at}
          </span>
        </div>

        <div className={styles.flits_col_xs_8}>
          <div
            className={`${styles.flits_d_flex} ${styles.flits_align_items_center}`}
          >
            <span className={`${styles.flits_nowrap} ${styles.flits_mr_5}`}>
              {`${t(
                "flits.refer_friend_page.referral_customer_name",
                "Referred To"
              )} : `}
            </span>
            <span
              className={`${styles.flits_text_ellipsis} ${styles.flits_referral_customer_name} ${styles.flits_strong}`}
            >
              {item?.referrer_customer?.name === "--" ? t("flits.refer_friend_page.customer_deleted", "Customer Deleted") : item?.referrer_customer?.name}
            </span>
          </div>
          <div
            className={`${styles.flits_d_flex} ${styles.flits_align_items_center} ${styles.flits_credit_table_row_column}`}
          >
            <span
              className={`${styles.flits_referral_customer_credit_date} ${styles.flits_nowrap} ${styles.flits_mr_10}`}
            >
              {item?.created_at}
            </span>
            <span
              className={`${styles.flits_referral_customer_email} ${styles.flits_text_ellipsis}`}
            >
              {item?.referrer_customer?.email === "--" ? t("flits.refer_friend_page.customer_deleted", "Customer Deleted") : item?.referrer_customer?.email}
            </span>
          </div>
        </div>
        <div className={styles.flits_col_xs_4}>
          <span
            className={`${styles.flits_crdr} ${
              item?.credits < 0 ? styles.flits_dr : styles.flits_cr
            }`}
          >
            <span
              className={`${styles.flits_crdr_sign} ${
                item?.credits < 0 ? styles.flits_dr : styles.flits_cr
              }`}
            >
              {item?.credits > 0 ? "+" : "-"}
            </span>
            <Suspense fallback={<></>}>
              <MoneyFormat price={Math.abs(item?.credits) / 100} />
            </Suspense>
          </span>
        </div>
      </div>
    </div>
  );
};
