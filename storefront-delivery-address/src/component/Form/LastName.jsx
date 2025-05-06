import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const LastName = () => {
  const microFrontEndData = useSelector(state => state.storeFrontContainer.microFrontEndData)
  const dispatch = useDispatch();

  const getStore = GlobalStore.Get();
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();
  const FlitsLabel = window.UnoDuoComponent("FlitsLabel");
  const AddressLastName = window.UnoDuoComponent("AddressLastName");
  const setFormData = window.deliveryAddressState("setFormData");

  const formData = useSelector(
    (state) => state.storeFrontDeliveryAddress.formData
  );
  const handleChange = (e) => {
    dispatch(setFormData({ ...formData, lastName: e.target.value }));
  };
  return (
    <AddressLastName
      value={formData?.lastName}
      type={"text"}
      id="AddressLastNameNew"
      name={"address[last_name]"}
      placeholder={t("flits.address_page.last_name", "Last Name")}
      handleChange={handleChange}
    >
      <FlitsLabel label={microFrontEndData?.accountSettings?.template === 2 ? t("flits.address_page.last_name", "Last Name") :  `${t("flits.address_page.last_name", "Last Name")} : `} />
    </AddressLastName>
  );
};
