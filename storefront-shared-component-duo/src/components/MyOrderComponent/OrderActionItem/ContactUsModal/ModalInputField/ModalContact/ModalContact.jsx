import parsePhoneNumber from "libphonenumber-js";
import styles from "./ModalContactModule.module.css";
import React, { Suspense, useCallback, useState } from "react";
import { ParsePhone } from "../../../../../HelperFunction/ParsePhone";
import { useDispatch, useSelector } from "react-redux";
import { FlitsLabel } from "../../../../../Form/FlitsLabel/FlitsLabel"
import { CountrySelect } from "../../../../../CountrySelect/CountrySelect"
import { GlobalStore } from "redux-micro-frontend";

export const ModalContact = (props) => {
  const contactForm = useSelector((state) => state.storeFrontOrder.contactForm);
  const contactError = useSelector(
    (state) => state.storeFrontOrder.contactError
  );
  const getStore = GlobalStore.Get()
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();
  const dispatch = useDispatch();

  const phoneNumber = ParsePhone(
    parsePhoneNumber(contactForm) === undefined ? "" : contactForm
  );
  const [valueNumber, setValueNumber] = useState(phoneNumber.phone ?? null);
  const [inputValueCode, setInputValueCode] = useState(null);

  const setContactError = window.orderState("setContactError");
  const setContactForm = window.orderState("setContactForm");
  const handleCountryChange = useCallback(
    (val) => {
      setInputValueCode(val);
      dispatch(setContactForm(`${val}${valueNumber}`));
    },
    [valueNumber, setContactForm, dispatch]
  );

  const handleContactUpdate = (e) => {
    const cleanedValue = e.target.value.replace(/[^0-9]/g, "");
    setValueNumber(cleanedValue);
    dispatch(setContactForm(`${inputValueCode}${cleanedValue}`));
    if (contactError?.length > 0) {
      dispatch(setContactError(null));
    }
  };
  return (
    <div
      className={`${styles.flits_col_sm_12} ${styles.flits_col_md_6} ${styles.flits_popup_mb_15}`}
    >
      <div
        className={`${styles.flits_phone_with_country_div} ${styles.flits_contact_us_phone_number_country_div}`}
      >
        <div
          className={`${styles.flits_input_wrap} ${styles.flits_input_icon_wrap}`}
        >
          <Suspense fallback={<></>}>
            <FlitsLabel {...props} />
          </Suspense>
          <div className={styles.flits_input_icon_group}>
            <div className={styles.flits_input_icon}>{props?.svg}</div>
            <input
              type="tel"
              className={`${styles.flits_input} ${styles.flits_form_phone}`}
              id="flits-contact-form-phone"
              placeholder={t("flits.order_contact_us.contact_number_placeholder", "1234567890")}
              name="contact[Contact Number]"
              onChange={(e) => handleContactUpdate(e)}
              value={valueNumber}
              data-name="contact[phone]"
              style={{
                paddingLeft: `${
                  ((inputValueCode?.length ?? 0) + 2) * 8 + 10 + 28
                }px`,
              }}
            ></input>
            <input
              type="text"
              value={inputValueCode}
              className={`${styles.flits_input} ${styles.flits_country_code_textbox}`}
              style={{
                width: `${((inputValueCode?.length ?? 0) + 2) * 8 + 10 + 36}px`,
              }}
            ></input>
            <Suspense fallback={<></>}>
              <CountrySelect
                optionValue={phoneNumber}
                handleCountryChange={handleCountryChange}
              />
            </Suspense>
          </div>
        </div>
      </div>
      {contactError && contactError?.length > 0 && (
        <small className={styles.flits_form_alert}>
          <span className={styles.flits_error_icon}></span>
          {contactError}
        </small>
      )}
    </div>
  );
};
