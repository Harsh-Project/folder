import styles from "./ReferFriendLogWrapperModule.module.css";
import React, { Suspense } from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useSelector } from "react-redux";
import { BoxEmpty } from "./BoxEmpty";
import { Empty } from '../../General/Empty/Empty';

export const ReferFriendLogWrapper = (props) => {
  const referFriendData = useSelector(
    (state) => state.storeFrontReferFriend.referFriendData
  );
  const getStore = GlobalStore.Get();
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();

  return (
    <>
      <div className={`${styles.flits_container_box}`}>
        {referFriendData?.customer?.credit_log?.length === 0 ? (
          <Suspense fallback={<></>}>
            <Empty
              message1={t("flits.refer_friend_page.blank_screen_line_1_html", "You haven’t made any referrals yet. <br>Invite your friends and earn rewards!")}
              message2={t("flits.refer_friend_page.blank_screen_line_2_html", "Love our products? Then share our link & get rewarded")}
              svgProp={BoxEmpty}
              shopNowButton={t("flits.refer_friend_page.blank_screen_button_text", "Start shopping")}
            />
          </Suspense>
        ) : (
          <div className={styles.flits_refer_friend_transcation_table}>
            <div className={styles.flits_credit_table}>
              <div className={styles.flits_credit_table_header}>
                <p className={styles.flits_credit_table_title}>
                  {t(
                    "flits.refer_friend_page.credit_activity",
                    "Referral History"
                  )}
                </p>
              </div>
              <div className={styles.flits_credit_table_head}>
                <div className={styles.flits_row}>
                  <div className={styles.flits_col_sm_3}>
                    <span>
                      {t(
                        "flits.refer_friend_page.referral_customer_name",
                        "Referred To"
                      )}
                    </span>
                  </div>
                  <div className={styles.flits_col_sm_4}>
                    <span>
                      {t(
                        "flits.refer_friend_page.referral_customer_email",
                        "Referral's Email"
                      )}
                    </span>
                  </div>
                  <div
                    className={`${styles.flits_col_sm_3} ${styles.flits_text_center}`}
                  >
                    <span>{t("flits.refer_friend_page.credit", "Credit")}</span>
                  </div>
                  <div className={styles.flits_col_sm_2}>
                    <span>
                      {t("flits.refer_friend_page.time", "Referred Since")}
                    </span>
                  </div>
                </div>
              </div>
              <div
                className={`${styles.flits_credit_table_body} ${styles.list}`}
              >
                {props?.children}
              </div>
            </div>
            <div className={styles.flits_clearfix}></div>
          </div>
        )}
      </div>
    </>
  );
};
