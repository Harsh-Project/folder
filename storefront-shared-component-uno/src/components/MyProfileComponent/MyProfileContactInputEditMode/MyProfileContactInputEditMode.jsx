import styles from "./MyProfileContactInputEditMode.module.css";
import { useDispatch } from "react-redux";
import React, { Suspense, useCallback, useState } from "react";
import { ParsePhone } from "../../HelperFunction/ParsePhone";
import { CountrySelect } from '../../CountrySelect/CountrySelect';

export const MyProfileContactInputEditMode = (props) => {
  const phoneNumber = ParsePhone(props?.value);
  const [valueNumber, setValueNumber] = useState(phoneNumber.phone ?? null);
  const [inputValueCode, setInputValueCode] = useState(null);

  const dispatch = useDispatch();

  const setContact = window.profileState("setContact");

  const handleCountryChange = useCallback(
    (val) => {
      setInputValueCode(val);
      dispatch(setContact(`${val}${valueNumber}`));
    },
    [setContact, dispatch, valueNumber]
  );

  const handleContactUpdate = (e) => {
    const cleanedValue = e.target.value.replace(/[^0-9]/g, "");
    setValueNumber(cleanedValue);
    dispatch(setContact(`${inputValueCode}${cleanedValue}`));
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
        className={styles.flits_country_code_textbox}
        value={inputValueCode ? inputValueCode : ""}
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
