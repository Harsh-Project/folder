import { GlobalStore } from "redux-micro-frontend";
import styles from "./ReferFriendHowItWorkModule.module.css";
import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { RenderSvgString } from "../../General/RenderSvgString";
import { DonutChartCustom } from '../../General/DonutChartCustom/DonutChartCustom';
import { ReferLink } from '../ReferLink/ReferLink';

export const ReferFriendHowToWork = () => {
  const getStore = GlobalStore.Get();
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();
  const creditData = useSelector((state) => state.storeFrontCredit.creditData);
  const ruleData = useSelector(
    (state) => state.storeFrontHowToManageCredit.ruleData
  );
  const referFriendData = useSelector(
    (state) => state.storeFrontReferFriend.referFriendData
  );

  const getTotalEarnRule = () => {
    let x = 0;

    for (let i = 0; i < ruleData?.length; i++) {
      if (ruleData[i]?.tab_to_append === "flits_earning_rules") {
        x = x + 1;
      }
    }

    return x;
  };

  const getEarnedRule = () => {
    let x = 0;

    for (let i = 0; i < ruleData?.length; i++) {
      if (ruleData[i]?.is_earned) {
        x = x + 1;
      }
    }

    return x;
  };
  let earnCredit = Math.abs(creditData?.customer?.total_earned_credits) / 100;
  let saveValue = (getEarnedRule() * 100) / getTotalEarnRule();

  const data = [
    {
      name: "refer-earn-credit",
      value: isNaN(saveValue) ? 0 : saveValue,
      color: "#25d872",
    },
  ];
  return (
    <div className={`${styles.flits_account_box_header}`}>
      <div className={styles.flits_chart_container}>
        <p className={`${styles.flits_chart_title} ${styles.flits_p_top}`}>
          {t("flits.refer_friend_page.chart1_header", "Your Earned Credit")}
        </p>
        <div
          className={`${styles.flits_credit_chart} ${styles.flits_refer_friend_save_chart}`}
        >
          <Suspense fallback={<></>}>
            <DonutChartCustom
              settings={{
                seriesData: data.sort((a, b) => a.value - b.value),
                title: earnCredit,
                textStyle: {
                  fontWeight: "bold",
                  color: "#25d872",
                },
              }}
            />
          </Suspense>
        </div>
      </div>
      <div className={styles.flits_total_referral_box}>
        <div className={styles.flits_referral_count}>
          <p>
            {t(
              "flits.refer_friend_page.unlock_referral_rewards",
              "Unlock your referral Rewards"
            )}
          </p>
          <p className={styles.flits_referral_count}>
            <span>{`${t(
              "flits.refer_friend_page.total_referral",
              "Total Referrals"
            )}: `}</span>
            <span className={styles.flits_total_referral}>
              {referFriendData?.reached_referral_limit}
            </span>
          </p>
        </div>
        <div className={styles.flits_referral_img}><RenderSvgString svgString={window?.DuoIcon?.DuoReferFriendPageSvg} /></div>
      </div>
      <Suspense fallback={<></>}>
        <ReferLink referData={referFriendData} mobileNeed={true} />
      </Suspense>
    </div>
  );
};
