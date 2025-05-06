import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const Postal = () => {
  const dispatch = useDispatch();
  const microFrontEndData = useSelector(state => state.storeFrontContainer.microFrontEndData)

  const getStore = GlobalStore.Get();
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();
  const FlitsLabel = window.UnoDuoComponent("FlitsLabel");
  const AddressZip = window.UnoDuoComponent("AddressZip");
  const setFormData = window.deliveryAddressState("setFormData");

  const formData = useSelector(
    (state) => state.storeFrontDeliveryAddress.formData
  );
  const handleChange = (e) => {
    dispatch(setFormData({ ...formData, zip: e.target.value }));
  };
  return (
    <AddressZip
      value={formData?.zip}
      type={"text"}
      id="AddressZipNew"
      name={"address[zip]"}
      placeholder={t("flits.address_page.zip", "Postal/Zip Code")}
      handleChange={handleChange}
    >
      <FlitsLabel label={microFrontEndData?.accountSettings?.template === 2 ? `${t("flits.address_page.zip", "Postal/Zip Code")}` : `${t("flits.address_page.zip", "Postal/Zip Code")} : `} />
    </AddressZip>
  );
};
