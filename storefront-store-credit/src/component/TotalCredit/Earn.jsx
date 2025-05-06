import React from "react";
import { GlobalStore } from "redux-micro-frontend";

export const Earn = (props) => {
  const getStore = GlobalStore.Get();
  const CreditBox = window.UnoDuoComponent("CreditBox");
  const formatMoney = getStore._globalActions.Helpers[0].formatMoney
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;

  const { t } = useTranslationLanguage();
  if (!CreditBox) {
    return null;
  }
  return (
    <CreditBox
      label={t("flits.credit_page.earned_credit", "Earned Credit")}
      value={formatMoney(
        Math.abs(props?.customer?.total_earned_credits),
        window?.flitsThemeAppExtensionObjects?.money_format
      )}
    />
  );
};
