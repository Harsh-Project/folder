import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const Country = () => {
  const dispatch = useDispatch();

  const getStore = GlobalStore.Get();
  const microFrontEndData = useSelector(state => state.storeFrontContainer.microFrontEndData)
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();
  const FlitsLabel = window.UnoDuoComponent("FlitsLabel");
  const AddressCountry = window.UnoDuoComponent("AddressCountry");
  const setFormData = window.deliveryAddressState("setFormData");
  const countryData = useSelector(
    (state) => state.storeFrontDeliveryAddress.countryData
  );
  const provinceData = useSelector(
    (state) => state.storeFrontDeliveryAddress.provinceData
  );

  const formData = useSelector(
    (state) => state.storeFrontDeliveryAddress.formData
  );
  const handleChange = (e) => {
    const provinceSet = provinceData[e.target.value];
    let province = "";

    if (!provinceSet || provinceSet?.length === 0) {
      province = "";
    }

    if (provinceSet?.length > 0) {
      province = provinceSet[0]?.code;
    }
    dispatch(
      setFormData({ ...formData, country: e.target.value, province: province })
    );
  };
  return (
    <AddressCountry
      value={formData?.country}
      countryData={countryData}
      id="AddressCountryNew"
      name={"address[country]"}
      placeholder={t("flits.address_page.country", "Country")}
      handleChange={handleChange}
    >
      <FlitsLabel label={microFrontEndData?.accountSettings?.template === 2 ? t("flits.address_page.country", "Country"): `${t("flits.address_page.country", "Country")} : `} />
    </AddressCountry>
  );
};
