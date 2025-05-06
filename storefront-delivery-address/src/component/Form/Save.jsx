import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { handleSave } from "../Events/SaveEvent";

export const Save = () => {
  const getStore = GlobalStore.Get();
  const setAddressSnackBarMode =
    window.deliveryAddressState("setAddressSnackBarMode");
  const setAddressSnackBarMessage =
    window.deliveryAddressState("setAddressSnackBarMessage");
  const setFormMode = window.deliveryAddressState("setFormMode");
  const AddressButtonSection = window.UnoDuoComponent("AddressButtonSection");
  const dispatch = useDispatch();
  const { t } =
    getStore._globalActions.Helpers[0].useTranslationLanguage();
  const addressCount = useSelector(
    (state) => state.storeFrontDeliveryAddress.addressCount
  );
  const API = getStore._globalActions.API[0].API;
  const setFormData = window.deliveryAddressState("setFormData");
  const formData = useSelector(
    (state) => state.storeFrontDeliveryAddress.formData
  );
  const defaultAddress = useSelector(
    (state) => state.storeFrontDeliveryAddress.defaultAddress
  );
  const setAddressCount = window.deliveryAddressState("setAddressCount");
  const setPaginationCountAddress =
    window.deliveryAddressState("setPaginationCountAddress");
  const setDefaultAddress =
    window.deliveryAddressState("setDefaultAddress");
  const setDeliveryAddressData =
    window.deliveryAddressState("setDeliveryAddressData");
  const deliveryAddressData = useSelector(
    (state) => state.storeFrontDeliveryAddress.deliveryAddressData
  );

  const handleClick = (e) => {
    handleSave(
      setFormMode,
      setDeliveryAddressData,
      defaultAddress,
      deliveryAddressData,
      setAddressSnackBarMode,
      setAddressSnackBarMessage,
      setAddressCount,
      addressCount,
      setDefaultAddress,
      formData,
      setPaginationCountAddress,
      t,
      API,
      setFormData,
      dispatch
    );
  };
  return (
    <AddressButtonSection
      type={"button"}
      label={t("flits.address_page.save_button", "Save")}
      handleClick={handleClick}
    />
  );
};
