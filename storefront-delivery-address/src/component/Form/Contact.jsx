import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useSelector } from 'react-redux';

export const Contact = () => {
const microFrontEndData = useSelector(state => state.storeFrontContainer.microFrontEndData)
  const getStore = GlobalStore.Get();
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();
  const FlitsLabel = window.UnoDuoComponent("FlitsLabel");
  const AddressContact = window.UnoDuoComponent("AddressContact");

  return (
    <AddressContact
      type={"tel"}
      name={"address[phone]"}
      placeholder={t("flits.address_page.contact_number", "Contact Number")}
    >
      <FlitsLabel label={microFrontEndData?.accountSettings?.template === 1 ? `${t("flits.address_page.contact_number", "Contact Number")} : ` : t("flits.address_page.contact_number", "Contact Number")} />
    </AddressContact>
  );
};
