import React from "react";
import { useSelector } from "react-redux";
import { Icon } from "../../components/Helpers/Icon/Icon";
import { MoneyFormat } from "../RewardWidget/Components/Helpers/MoneyFormet";

export const ShowCreditSection = () => {
  const { creditData } = useSelector((state) => state.rewardWidget);
  const { adminT } =
    window?.flitsThemeAppExtensionObjects?.useTranslationLanguage;
  return (
    <div className="flits-show-credit-wrapper">
      <div className="flits-show-credit-icon-section">
        <div className="flits-show-credit-icon">
          <Icon icon={window?.flits_icons?.flits?.icons?.credit_balance}></Icon>
        </div>
        <h4>{adminT("banner.member_card_title", "Your rewards")}</h4>
      </div>
      <h2
        className="flits-show-credit-value"
        dangerouslySetInnerHTML={{
          __html: MoneyFormat((creditData?.customer?.credits ?? 0) / 100),
        }}
      ></h2>
    </div>
  );
};
