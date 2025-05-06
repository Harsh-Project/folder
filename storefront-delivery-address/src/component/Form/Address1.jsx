import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const Address1 = () => {
  const dispatch = useDispatch();
  const microFrontEndData = useSelector(state => state.storeFrontContainer.microFrontEndData)

  const getStore = GlobalStore.Get();
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();
  const FlitsLabel = window.UnoDuoComponent("FlitsLabel");
  const AddressLine1 = window.UnoDuoComponent("AddressLine1");
  const setFormData = window.deliveryAddressState("setFormData");

  const formData = useSelector(
    (state) => state.storeFrontDeliveryAddress.formData
  );
  const handleChange = (e) => {
    dispatch(setFormData({ ...formData, addressLine1: e.target.value }));
  };
  return (
    <AddressLine1
      value={formData?.addressLine1}
      type={"text"}
      id="AddressAddress1New"
      name={"address[address1]"}
      placeholder={t("flits.address_page.address1", "Address Line 1")}
      handleChange={handleChange}
    >
      <FlitsLabel label={microFrontEndData?.accountSettings?.template === 1 ? `${t("flits.address_page.address1", "Address Line 1")} : ` : t("flits.address_page.address1", "Address Line 1")} />
    </AddressLine1>
  );
};
