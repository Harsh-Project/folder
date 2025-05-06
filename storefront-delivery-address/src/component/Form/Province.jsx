import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const Province = () => {
  const dispatch = useDispatch();

  const getStore = GlobalStore.Get();
  const microFrontEndData = useSelector(state => state.storeFrontContainer.microFrontEndData)
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();
  const FlitsLabel = window.UnoDuoComponent("FlitsLabel");
  const AddressProvince = window.UnoDuoComponent("AddressProvince");
  const setFormData = window.deliveryAddressState("setFormData");
  const provinceData = useSelector(
    (state) => state.storeFrontDeliveryAddress.provinceData
  );
  const formData = useSelector(
    (state) => state.storeFrontDeliveryAddress.formData
  );
  const handleChange = (e) => {
    dispatch(setFormData({ ...formData, province: e.target.value }));
  };
  return (
    <AddressProvince
    provinceData={provinceData}
    formData={formData}
      value={formData?.province}
      id="AddressProvinceNew"
      name={"address[province]"}
      placeholder={t("flits.address_page.province", "Province")}
      handleChange={handleChange}
    >
      <FlitsLabel label={microFrontEndData?.accountSettings?.template === 2 ? t("flits.address_page.province", "Province") : `${t("flits.address_page.province", "Province")} : `} />
    </AddressProvince>
  );
};
