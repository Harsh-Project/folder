import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const Default = () => {
  const dispatch = useDispatch();

  const getStore = GlobalStore.Get();
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();
  const MarkDefault = window.UnoDuoComponent("MarkDefault");
  const setFormData = window.deliveryAddressState("setFormData");
  const formData = useSelector(
    (state) => state.storeFrontDeliveryAddress.formData
  );
  const handleChange = (e) => {
    dispatch(setFormData({ ...formData, check: e.target.checked }));
  };
  return (
    <MarkDefault
      value={formData?.check}
      type={"checkbox"}
      id="address_default_address_new"
      name={"address[default]"}
      label={t("flits.address_page.mark_as_default_checkbox", "Mark as Default Address")}
      handleChange={handleChange}
      needMark={formData?.needMark}
    />
  );
};
