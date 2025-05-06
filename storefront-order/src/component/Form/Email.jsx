import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const EmailSvg = (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="css-i6dzq1"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

export const Email = () => {
  const emailForm = useSelector((state) => state.storeFrontOrder.emailForm);
  const emailError = useSelector((state) => state.storeFrontOrder.emailError);
  const dispatch = useDispatch();
  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;
  const setEmailForm = window.orderState("setEmailForm");
  const setEmailError = window.orderState("setEmailError");
  const { t } = useTranslationLanguage();
  const ModalEmail = window.UnoDuoComponent("ModalEmail");

  const handleValueChange = (value) => {
    dispatch(setEmailForm(value));
    if (emailError?.length > 0) {
      dispatch(setEmailError(null));
    }
  };

  return (
    <ModalEmail
      svg={EmailSvg}
      type="text"
      name={`contact[email]`}
      mandatory={true}
      valueId="email"
      id="flits-contact-form-email"
      placeholder={t("flits.order_contact_us.email_placeholder", "abc@xyz.com")}
      label={t("flits.order_contact_us.email_label", "Email")}
      value={emailForm}
      error={emailError}
      onClickEvent={handleValueChange}
    />
  );
};
