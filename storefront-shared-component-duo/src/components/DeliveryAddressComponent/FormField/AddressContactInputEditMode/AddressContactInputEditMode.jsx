import styles from "./AddressContactInputEditModeModule.module.css";
import { useDispatch, useSelector } from "react-redux";
import React, { Suspense, useCallback, useState } from "react";
import parsePhoneNumber from "libphonenumber-js";
import { ParsePhone } from "../../../HelperFunction/ParsePhone";
import { CountrySelect } from '../../../CountrySelect/CountrySelect';

export const AddressContactInputEditMode = (props) => {
  const formData = useSelector(
    (state) => state.storeFrontDeliveryAddress.formData
  );
  const phoneNumber = ParsePhone(
    parsePhoneNumber(formData?.phone) === undefined ? "" : formData?.phone ?? ""
  );
  const [valueNumber, setValueNumber] = useState(
    phoneNumber?.phone !== formData?.phone && phoneNumber?.phone
      ? phoneNumber?.phone
      : null
  );
  const [inputValueCode, setInputValueCode] = useState(null);

  const dispatch = useDispatch();

  const setFormData = window.deliveryAddressState("setFormData");

  const handleCountryChange = useCallback(
    (val) => {
      setInputValueCode(val);
      dispatch(setFormData({ ...formData, phone: `${val}${valueNumber}` }));
    },
    [setFormData, formData, dispatch, valueNumber]
  );

  const handleContactUpdate = (e) => {
    const cleanedValue = e.target.value.replace(/[^0-9]/g, "");
    setValueNumber(cleanedValue);
    dispatch(
      setFormData({ ...formData, phone: `${inputValueCode}${cleanedValue}` })
    );
  };
  return (
    <>
      <input
        type={props?.type}
        className={`${styles.flits_input} ${styles.flits_input_edit_mode}`}
        placeholder={props?.placeholder ?? ""}
        name={props?.name ?? ""}
        value={valueNumber}
        onChange={(e) => handleContactUpdate(e)}
        disabled={props?.disabled}
        readOnly={props?.readOnly ?? false}
        style={{
          paddingLeft: `${((inputValueCode?.length ?? 0) + 2) * 8}px`,
        }}
      />
      <input
        type="text"
        className={`${styles.flits_input} ${styles.flits_country_code_textbox}`}
        value={inputValueCode}
        disabled={props?.edit}
        style={{ width: `${((inputValueCode?.length ?? 0) + 2) * 8 + 10}px` }}
      />
      <Suspense fallback={<></>}>
        <CountrySelect
          optionValue={phoneNumber}
          handleCountryChange={handleCountryChange}
        />
      </Suspense>
    </>
  );
};
