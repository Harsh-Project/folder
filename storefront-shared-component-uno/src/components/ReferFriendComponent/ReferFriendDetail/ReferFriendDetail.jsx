import styles from "./ReferFriendDetail.module.css";
import React, { Suspense } from "react";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import { useRef } from "react";
import { useEffect } from "react";
import { RenderSvgString } from "../../General/RenderSvgString";
import { MoneyFormat } from '../../General/MoneyFormat/MoneyFormat';
import { GlobalStore } from 'redux-micro-frontend';

export const ReferFriendDetail = ({ item }) => {
  const getStore = GlobalStore.Get();

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const { t }=getStore._globalActions.Helpers[0].useTranslationLanguage()

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
    <li className={`${styles.flits_credit_log_item}`}>
      <div className={`${styles.flits_row} ${styles.flits_credit_log_detail}`}>
        <div
          className={`${styles.flits_col_md_3} ${styles.flits_credit_right_border}`}
        >
          <p
            ref={nameRef}
            className={`${styles.flits_referral_customer_name} ${styles.flits_text_nowrap}`}
          >
            {item?.referrer_customer?.name === "--" ? t("flits.refer_friend_page.customer_deleted", "Customer Deleted") : item?.referrer_customer?.name}
          </p>
        </div>
        <div
          className={`${styles.flits_col_md_3} ${styles.flits_credit_right_border}`}
        >
          <p
            ref={emailRef}
            className={`${styles.flits_referral_customer_name} ${styles.flits_text_nowrap}`}
          >
            {item?.referrer_customer?.email === "--" ? t("flits.refer_friend_page.customer_deleted", "Customer Deleted") : item?.referrer_customer?.email}
          </p>
        </div>
        <div
          className={`${styles.flits_col_md_3} ${styles.flits_credit_right_border}`}
        >
          <div>
            <div
              className={`${styles.flits_credit_icon} ${styles.flits_earn_credit_icon_round}`}
            >
              {item?.credits < 0 ? <RenderSvgString svgString={window?.UnoIcon?.MinusIcon}/> : <RenderSvgString svgString={window?.UnoIcon?.PlusIcon}/>}
            </div>
            <p
              className={`${styles.flits_referral_customer_name} ${styles.flits_text_nowrap}`}
            >
              <Suspense fallback={<></>}><MoneyFormat price={Math.abs(item?.credits) / 100} /></Suspense>
            </p>
          </div>
        </div>
        <div className={`${styles.flits_col_md_3}`}>
          <p
            className={`${styles.flits_referral_customer_name} ${styles.flits_text_nowrap}`}
          >
            {item?.created_at}
          </p>
        </div>
      </div>
    </li>
  );
};
