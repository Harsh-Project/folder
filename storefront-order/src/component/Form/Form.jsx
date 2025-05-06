import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import { FirstName } from "./FirstName";
import { LastName } from "./LastName";
import { Reason } from "./Reason";
import { Message } from "./Message";
import { Link } from "./Link";
import { Email } from "./Email";
import { Contact } from "./Contact";
import { handleClose } from "./Close";
import { handleSubmit } from "./Submit";
import { useState } from "react";
import parsePhoneNumber from "libphonenumber-js";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const Form = ({ item }) => {
  const getStore = GlobalStore.Get();
  const ContactUsModal = window.UnoDuoComponent("ContactUsModal");
  const [modal, setModal] = useState(true);
  const SetLocalStorage = getStore._globalActions.Helpers[0].SetLocalStorage;
  const GetLocalStorage = getStore._globalActions.Helpers[0].GetLocalStorage;
  const dispatch = useDispatch();
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();
  const setForm = window.orderState("setForm");
  const setReasonError = window.orderState("setReasonError");
  const setContactError = window.orderState("setContactError");
  const setEmailError = window.orderState("setEmailError");
  const setMessageError = window.orderState("setMessageError");
  const setFirstNameForm = window.orderState("setFirstNameForm");

  const firstNameForm = useSelector(
    (state) => state.storeFrontOrder.firstNameForm
  );
  const lastNameForm = useSelector(
    (state) => state.storeFrontOrder.lastNameForm
  );
  const setLastNameForm = window.orderState("setLastNameForm");
  const setReasonForm = window.orderState("setReasonForm");
  const setMessageForm = window.orderState("setMessageForm");
  const linkForm = useSelector((state) => state.storeFrontOrder.linkForm);
  const contactForm = useSelector((state) => state.storeFrontOrder.contactForm);
  const emailForm = useSelector((state) => state.storeFrontOrder.emailForm);
  const reasonForm = useSelector((state) => state.storeFrontOrder.reasonForm);
  const messageForm = useSelector((state) => state.storeFrontOrder.messageForm);
  const setLinkForm = window.orderState("setLinkForm");
  const setLinkError = window.orderState("setLinkError");
  const setContactForm = window.orderState("setContactForm");
  const setEmailForm = window.orderState("setEmailForm");

  const handleClickClose = () => {
    handleClose(
      dispatch,
      setLastNameForm,
      setModal,
      setLinkForm,
      setContactForm,
      setEmailForm,
      setFirstNameForm,
      setForm,
      setMessageForm,
      setReasonForm,
      setContactError,
      setEmailError,
      setReasonError,
      setMessageError,
      setLinkError
    );
  };

  const handleClickSave = () => {
    handleSubmit(
      GetLocalStorage,
      firstNameForm,
      item,
      linkForm,
      lastNameForm,
      setModal,
      dispatch,
      SetLocalStorage,
      setContactError,
      reasonForm,
      t,
      emailForm,
      setMessageError,
      setReasonError,
      messageForm,
      setEmailError,
      contactForm,
      parsePhoneNumber,
      setLinkError
    );
  };
  return (
    <ContactUsModal
      Contact={Contact}
      Email={Email}
      FirstName={FirstName}
      LastName={LastName}
      Reason={Reason}
      messageForm={messageForm}
      item={item}
      handleClose={handleClickClose}
      Message={Message}
      handleSubmit={handleClickSave}
      Link={Link}
      modal={modal}
    />
  );
};
