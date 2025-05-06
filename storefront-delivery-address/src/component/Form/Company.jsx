import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const Company = () => {
  const microFrontEndData = useSelector(state => state.storeFrontContainer.microFrontEndData)
  const dispatch = useDispatch();

  const getStore = GlobalStore.Get();
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();
  const FlitsLabel = window.UnoDuoComponent("FlitsLabel");
  const AddressCompany = window.UnoDuoComponent("AddressCompany");
  const setFormData = window.deliveryAddressState("setFormData");

  const formData = useSelector(
    (state) => state.storeFrontDeliveryAddress.formData
  );
  const handleChange = (e) => {
    dispatch(setFormData({ ...formData, company: e.target.value }));
  };
  return (
    <AddressCompany
      value={formData?.company}
      type={"text"}
      id="AddressCompanyNew"
      name={"address[company]"}
      placeholder={t("flits.address_page.company", "Company")}
      handleChange={handleChange}
    >
      <FlitsLabel label={microFrontEndData?.accountSettings?.template === 2 ? `${t("flits.address_page.company", "Company")}` : `${t("flits.address_page.company", "Company")} : `} />
    </AddressCompany>
  );
};
