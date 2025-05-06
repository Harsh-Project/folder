import React from "react";
import { GlobalStore } from "redux-micro-frontend";

export const Current = (props) => {
  const getStore = GlobalStore.Get();
  const CreditBox = window.UnoDuoComponent("CreditBox");
  const formatMoney = getStore._globalActions.Helpers[0].formatMoney;
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;
  const { t } = useTranslationLanguage();
  if (!CreditBox) {
    return null;
  }
  return (
    <CreditBox
      label={t("flits.credit_page.current_credit", "Current Credit")}
      value={`${parseFloat(props?.customer?.credits) <0 ? "- " : ""} ${formatMoney(
        Math.abs(props?.customer?.credits),
        window?.flitsThemeAppExtensionObjects?.money_format
      )}`}
    />
  );
};
