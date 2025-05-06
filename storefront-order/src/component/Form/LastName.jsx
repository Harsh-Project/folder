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

export const LastName = () => {
  const lastNameForm = useSelector(
    (state) => state.storeFrontOrder.lastNameForm
  );
  const dispatch = useDispatch();
  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;
  const setLastNameForm = window.orderState("setLastNameForm");
  const { t } = useTranslationLanguage();
  const ModalLastName = window.UnoDuoComponent("ModalLastName");

  const handleValueChange = (value) => {
    dispatch(setLastNameForm(value));
  };

  return (
    <ModalLastName
      svg={Name}
      type="text"
      name={`contact[${t("flits.order_contact_us.last_name_label", "Last Name")}]`}
      valueId="lastName"
      id="flits-contact-form-last-name"
      placeholder={t("flits.order_contact_us.last_name_placeholder", "Grey")}
      label={t("flits.order_contact_us.last_name_label", "Last Name")}
      value={lastNameForm}
      onClickEvent={handleValueChange}
    />
  );
};
