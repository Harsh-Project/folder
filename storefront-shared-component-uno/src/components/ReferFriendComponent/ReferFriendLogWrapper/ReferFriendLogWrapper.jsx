import styles from "./ReferFriendLogWrapper.module.css";
import React, { Suspense } from "react";
import { formatMoney } from "../../General/formatMoney";
import { GlobalStore } from "redux-micro-frontend";
import { useSelector } from "react-redux";
import { Empty } from '../../General/Empty/Empty';

export const ReferFriendLogWrapper = (props) => {
  const referFriendData = useSelector(
    (state) => state.storeFrontReferFriend.referFriendData
  );
  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;

  function getTotal(data) {
    if (!Array.isArray(data)) {
      return 0;
    }

    let credits = 0;

    for (let i = 0; i < data?.length; i++) {
      credits = credits + data[i].credits;
    }

    return credits;
  }

  const { t } = useTranslationLanguage();
  return (
    <div
      className={`${styles.flits_credit_box} ${styles.flits_refer_friend_box}`}
    >
      {referFriendData?.customer?.credit_log?.length === 0 ? (
        <Suspense fallback={<></>}>
          <Empty
            isPositionRelative={true}
            message1={t("flits.refer_friend_page.blank_screen_line_1_html", "You haven’t made any referrals yet. <br>Invite your friends and earn rewards!")}
            message2={t("flits.refer_friend_page.blank_screen_line_2_html", "Love our products? Then share our link & get rewarded")}
            shopNowButton={t("flits.refer_friend_page.blank_screen_button_text", "Start shopping")}

          />
        </Suspense>
      ) : (
        <div className={styles.flits_refer_credit_table_div}>
          <p
            className={`${styles.flits_h5} ${styles.flits_credit_activity_title}`}
          >
            {t("flits.refer_friend_page.credit_activity", "Referral History")}
          </p>
          <p
            dangerouslySetInnerHTML={{
              __html: `${t(
                "flits.refer_friend_page.earned_credit",
                "Earned Credit"
              )}: ${formatMoney(
                Math.abs(getTotal(props?.referData?.customer?.credit_log)),
                window?.flitsThemeAppExtensionObjects?.money_format
              )}`,
            }}
            className={`${styles.flits_h5} ${styles.flits_credit_activity_title} ${styles.flits_mb_0}`}
          ></p>
          <ul
            className={`${styles.flits_credit_log_list} ${styles.flits_credit_log_header}`}
          >
            <li
              className={`${styles.flits_credit_log_item} ${styles.flits_credit_log_title} ${styles.flits_refer_credit_log_item_template}`}
            >
              <div
                className={`${styles.flits_row} ${styles.flits_credit_log_detail}`}
              >
                <div
                  className={`${styles.flits_col_md_3} ${styles.flits_credit_right_border}`}
                >
                  <p
                    className={`${styles.flits_referral_customer_name} ${styles.flits_text_nowrap}`}
                  >
                    {t(
                      "flits.refer_friend_page.referral_customer_name",
                      "Referred To"
                    )}
                  </p>
                </div>
                <div
                  className={`${styles.flits_col_md_3} ${styles.flits_credit_right_border}`}
                >
                  <p
                    className={`${styles.flits_referral_customer_name} ${styles.flits_text_nowrap}`}
                  >
                    {t(
                      "flits.refer_friend_page.referral_customer_email",
                      "Referral's Email"
                    )}
                  </p>
                </div>
                <div
                  className={`${styles.flits_col_md_3} ${styles.flits_credit_right_border}`}
                >
                  <p
                    className={`${styles.flits_referral_customer_name} ${styles.flits_text_nowrap}`}
                  >
                    {t("flits.refer_friend_page.credit", "Credit")}
                  </p>
                </div>
                <div className={`${styles.flits_col_md_3}`}>
                  <p
                    className={`${styles.flits_referral_customer_name} ${styles.flits_text_nowrap}`}
                  >
                    {t("flits.refer_friend_page.time", "Referred Since")}
                  </p>
                </div>
              </div>
            </li>
          </ul>
          {props?.children}
        </div>
      )}
    </div>
  );
};
