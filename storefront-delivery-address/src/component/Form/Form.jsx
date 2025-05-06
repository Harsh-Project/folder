import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import { handleCanel } from "../Events/CancelEvent";
import { FirstName } from "./FirstName";
import { LastName } from "./LastName";
import { Postal } from "./Postal";
import { Address1 } from "./Address1";
import { Address2 } from "./Address2";
import { City } from "./City";
import { Country } from "./Country";
import { Company } from "./Company";
import { Contact } from "./Contact";
import { Default } from "./Default";
import { Province } from "./Province";
import { Save } from "./Save";
import { useDispatch, useSelector } from "react-redux";
import { handleSave } from "../Events/SaveEvent";
import parsePhoneNumber from "libphonenumber-js";

const SuccessAddressEdit = (
  <svg viewBox="0 0 34.19 47.6">
    <path d="M17.09,0A17.11,17.11,0,0,0,0,17.09,25.54,25.54,0,0,0,2.62,27.38a63.15,63.15,0,0,0,5.7,9.77,97.45,97.45,0,0,0,8.27,10.23.7.7,0,0,0,1,0,96.67,96.67,0,0,0,8.26-10.23,62.36,62.36,0,0,0,5.7-9.77,25.57,25.57,0,0,0,2.63-10.29A17.12,17.12,0,0,0,17.09,0Zm7.64,36.33a95.54,95.54,0,0,1-7.64,9.54,97.42,97.42,0,0,1-7.63-9.54C4.18,28.78,1.4,22.13,1.4,17.09a15.7,15.7,0,0,1,31.39,0C32.79,22.13,30,28.78,24.73,36.33Zm5-19.24a12.61,12.61,0,1,1-7.88-11.7.7.7,0,1,1-.52,1.3,11.05,11.05,0,0,0-4.22-.82,11.21,11.21,0,1,0,7.05,2.48.7.7,0,0,1-.11-1,.69.69,0,0,1,1-.1A12.56,12.56,0,0,1,29.71,17.09Zm-6.16-3.47-2.24-2.24a.7.7,0,0,0-.49-.2H11.13a.7.7,0,0,0-.7.7V23.8a.7.7,0,0,0,.7.7H23.05a.7.7,0,0,0,.7-.7V14.11A.7.7,0,0,0,23.55,13.62Zm-8.74-1h4.57v1.58H14.81ZM19.38,23.1H14.81V19.28h4.57Zm3,0H20.77V18.58a.7.7,0,0,0-.7-.7h-6a.71.71,0,0,0-.7.7V23.1H11.83V12.58h1.58v2.28a.71.71,0,0,0,.7.7h6a.7.7,0,0,0,.7-.7v-2l1.59,1.58Zm-3.82-1.54a.7.7,0,0,1-.7.7H16.35a.7.7,0,1,1,0-1.39h1.49A.7.7,0,0,1,18.54,21.56Z"></path>
  </svg>
);

export const Form = () => {
  const getStore = GlobalStore.Get();
  const setFormMode = window.deliveryAddressState("setFormMode");
  const AddressForm = window.UnoDuoComponent("AddressForm");
  const FormField = window.UnoDuoComponent("FormField");
  const setAddressSnackBarMode =
    window.deliveryAddressState("setAddressSnackBarMode");
  const setAddressSnackBarMessage =
    window.deliveryAddressState("setAddressSnackBarMessage");
  const AddressButtonSection =
    window.UnoDuoComponent("AddressButtonSection");
  const dispatch = useDispatch();
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();
  const addressCount = useSelector(
    (state) => state.storeFrontDeliveryAddress.addressCount
  );
  const API = getStore._globalActions.API[0].API;
  const formData = useSelector(
    (state) => state.storeFrontDeliveryAddress.formData
  );
  const defaultAddress = useSelector(
    (state) => state.storeFrontDeliveryAddress.defaultAddress
  );

  const SnackBar = window.UnoDuoComponent("SnackBar");
  const addressSnackBarMessage = useSelector(
    (state) => state.storeFrontDeliveryAddress.addressSnackBarMessage
  );
  const addressSnackBarMode = useSelector(
    (state) => state.storeFrontDeliveryAddress.addressSnackBarMode
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
  const setFormData = window.deliveryAddressState("setFormData");

  const handleClick = () => {
    handleCanel(setFormMode, setFormData, dispatch);
  };

  const handleSaveClick = () => {
    const phoneNumber = parsePhoneNumber(formData?.phone);
    const validOrNot = phoneNumber === undefined ? null : phoneNumber.isValid();

    if (!validOrNot && phoneNumber !== undefined) {
      dispatch(setAddressSnackBarMessage(
        t(
          "flits.address_page.invalid_contact_number",
          "Contact number is not valid"
        )
      ));
      dispatch(setAddressSnackBarMode("information"));

      setTimeout(() => {
        dispatch(setAddressSnackBarMode(null));
        dispatch(setAddressSnackBarMessage(""));
      }, 2500);

      return;
    }
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
      dispatch,
      parsePhoneNumber
    );
  };
  return (
    <>
      <AddressForm>
        <FormField
          Company={Company}
          Default={Default}
          Province={Province}
          Postal={Postal}
          Address1={Address1}
          City={City}
          handleSaveClick={handleSaveClick}
          Country={Country}
          Contact={Contact}
          AddressButtonSection={AddressButtonSection}
          Address2={Address2}
          handleResetClick={handleClick}
          FirstName={FirstName}
          Save={Save}
          LastName={LastName}
        />
      </AddressForm>
      <SnackBar
        mode={addressSnackBarMode}
        message={addressSnackBarMessage}
        svg={SuccessAddressEdit}
      />
    </>
  );
};
