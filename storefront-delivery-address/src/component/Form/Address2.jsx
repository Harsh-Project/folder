import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const Address2 = () => {
  const dispatch = useDispatch();

  const getStore = GlobalStore.Get();
  const microFrontEndData = useSelector(state => state.storeFrontContainer.microFrontEndData)
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();
  const FlitsLabel = window.UnoDuoComponent("FlitsLabel");
  const AddressLine2 = window.UnoDuoComponent("AddressLine2");
  const setFormData = window.deliveryAddressState("setFormData");

  const formData = useSelector(
    (state) => state.storeFrontDeliveryAddress.formData
  );
  const handleChange = (e) => {
    dispatch(setFormData({ ...formData, addressLine2: e.target.value }));
  };
  return (
    <AddressLine2
      value={formData?.addressLine2}
      type={"text"}
      id="AddressAddress2New"
      name={"address[address2]"}
      placeholder={t("flits.address_page.address2", "Address Line 2")}
      handleChange={handleChange}
    >
      <FlitsLabel label={microFrontEndData?.accountSettings?.template === 2 ? t("flits.address_page.address2", "Address Line 2") :`${t("flits.address_page.address2", "Address Line 2")} : `} />
    </AddressLine2>
  );
};
