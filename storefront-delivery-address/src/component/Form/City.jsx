import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const City = () => {
  const microFrontEndData = useSelector(state => state.storeFrontContainer.microFrontEndData)
  const dispatch = useDispatch();

  const getStore = GlobalStore.Get();
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();
  const FlitsLabel = window.UnoDuoComponent("FlitsLabel");
  const AddressCity = window.UnoDuoComponent("AddressCity");
  const setFormData = window.deliveryAddressState("setFormData");

  const formData = useSelector(
    (state) => state.storeFrontDeliveryAddress.formData
  );
  const handleChange = (e) => {
    dispatch(setFormData({ ...formData, city: e.target.value }));
  };
  return (
    <AddressCity
      value={formData?.city}
      type={"text"}
      id="AddressCityNew"
      name={"address[city]"}
      placeholder={t("flits.address_page.city", "City")}
      handleChange={handleChange}
    >
      <FlitsLabel label={microFrontEndData?.accountSettings?.template === 2 ? t("flits.address_page.city", "City") : `${t("flits.address_page.city", "City")} : `} />
    </AddressCity>
  );
};
