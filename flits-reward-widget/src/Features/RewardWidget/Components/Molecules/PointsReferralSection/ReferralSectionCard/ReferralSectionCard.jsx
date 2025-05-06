import React from "react";
import { PointBox } from "../../../../../../components";
import { useDispatch, useSelector } from "react-redux";
import { setPagesViewClicks } from "../../../../../../redux/reducer/rewardWidgetSlice";

export const ReferralSectionCard = (props) => {
  const dispatch = useDispatch();
  const pagesViewClicks = useSelector(
    (state) => state.rewardWidget.pagesViewClicks
  );
  const { adminT } = window?.flitsThemeAppExtensionObjects?.useTranslationLanguage;
  return (
    <PointBox
      title={adminT(
        "refer_friend.card_title",
        "Referral rewards"
      )}
      rewardPointBoxClick={() => {
        dispatch(
          setPagesViewClicks({
            ...pagesViewClicks,
            defaultView: false,
            referRuleView: true,
          })
        );
      }}
      icon={window?.flits_icons?.flits?.icons?.refer_rules_section}
    >
      {props?.children}
    </PointBox>
  );
};
