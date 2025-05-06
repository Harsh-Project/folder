import React from "react";
import { PointBox } from "../../../../../../components";
import { useDispatch, useSelector } from "react-redux";
import { setPagesViewClicks } from "../../../../../../redux/reducer/rewardWidgetSlice";

export const EarnSectionCard = () => {
  const { adminT } = window?.flitsThemeAppExtensionObjects?.useTranslationLanguage;
  const dispatch = useDispatch();
  const pagesViewClicks = useSelector(
    (state) => state.rewardWidget.pagesViewClicks
  );
  return (
    <PointBox
      title={adminT("reward.earn_reward_card_title", "Ways to earn")}
      //   subHead={adminT(
      //     "reward.earn_reward_card_description",
      //     "{{ number }} rewards available"
      //   )?.replace("{{ number }}", ruleCounts.totalEarningRules)}
      rewardPointBoxClick={() => {
        dispatch(
          setPagesViewClicks({
            ...pagesViewClicks,
            defaultView: false,
            earningView: true,
          })
        );
      }}
      icon={window?.flits_icons?.flits?.icons?.reward_rules_section}
    />
  );
};
