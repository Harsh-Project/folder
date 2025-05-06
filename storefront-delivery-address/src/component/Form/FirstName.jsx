import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const FirstName = () => {
  const dispatch = useDispatch();
  const microFrontEndData = useSelector(state => state.storeFrontContainer.microFrontEndData)

  const getStore = GlobalStore.Get();
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();
  const FlitsLabel = window.UnoDuoComponent("FlitsLabel");
  const AddressFirstName = window.UnoDuoComponent("AddressFirstName");
  const setFormData = window.deliveryAddressState("setFormData");

  const formData = useSelector(
    (state) => state.storeFrontDeliveryAddress.formData
  );
  const handleChange = (e) => {
    dispatch(setFormData({ ...formData, firstName: e.target.value }));
  };
  return (
    <AddressFirstName
      value={formData?.firstName}
      type={"text"}
      id="AddressFirstNameNew"
      name={"address[first_name]"}
      placeholder={t("flits.address_page.first_name", "First Name")}
      handleChange={handleChange}
    >
      <FlitsLabel label={microFrontEndData?.accountSettings?.template === 2 ? `${t("flits.address_page.first_name", "First Name")}` : `${t("flits.address_page.first_name", "First Name")} : `} />
    </AddressFirstName>
  );
};
