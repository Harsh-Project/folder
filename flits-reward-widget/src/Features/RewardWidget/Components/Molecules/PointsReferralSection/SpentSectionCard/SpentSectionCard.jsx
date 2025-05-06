import React from "react";
import { PointBox } from "../../../../../../components";
import { useDispatch, useSelector } from "react-redux";
import { setPagesViewClicks } from "../../../../../../redux/reducer/rewardWidgetSlice";

export const SpentSectionCard = () => {
  const { adminT } = window?.flitsThemeAppExtensionObjects?.useTranslationLanguage;
  const dispatch = useDispatch();
  const pagesViewClicks = useSelector(
    (state) => state.rewardWidget.pagesViewClicks
  );
  return (
    <PointBox
      title={adminT("reward.spend_reward_card_title", "Ways to redeem")}
      //   subHead={adminT(
      //     "reward.spend_reward_card_description",
      //     "{{ number }} rewards available"
      //   )?.replace("{{ number }}", ruleCounts.totalSpendingRules)}
      rewardPointBoxClick={() => {
        dispatch(
          setPagesViewClicks({
            ...pagesViewClicks,
            defaultView: false,
            redeemView: true,
          })
        );
      }}
      icon={window?.flits_icons?.flits?.icons?.redeem_rules_section}
    />
  );
};
