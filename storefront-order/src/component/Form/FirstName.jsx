import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Name = (
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
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

export const FirstName = () => {
  const firstNameForm = useSelector(
    (state) => state.storeFrontOrder.firstNameForm
  );
  const dispatch = useDispatch();
  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;
  const setFirstNameForm = window.orderState("setFirstNameForm");
  const { t } = useTranslationLanguage();
  const ModalFirstName = window.UnoDuoComponent("ModalFirstName");

  const handleValueChange = (value) => {
    dispatch(setFirstNameForm(value));
  };

  return (
    <ModalFirstName
      svg={Name}
      type="text"
      name={`contact[${t("flits.order_contact_us.first_name_label", "First Name")}]`}
      valueId="firstName"
      id="flits-contact-form-first-name"
      placeholder={t("flits.order_contact_us.first_name_placeholder", "James")}
      label={t("flits.order_contact_us.first_name_label", "First Name")}
      value={firstNameForm}
      onClickEvent={handleValueChange}
    />
  );
};
