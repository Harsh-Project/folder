import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export const Message = () => {
  const dispatch = useDispatch();
  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;
  const { t } = useTranslationLanguage();
  const ModalMessage = window.UnoDuoComponent("ModalMessage");
  const messageForm = useSelector((state) => state.storeFrontOrder.messageForm);
  const messageError = useSelector(
    (state) => state.storeFrontOrder.messageError
  );

  const setMessageForm = window.orderState("setMessageForm");
  const setMessageError = window.orderState("setMessageError");

  const handleValueChange = (e) => {
    dispatch(setMessageForm(e.target.value));
    if (messageError?.length > 0) {
      dispatch(setMessageError(null));
    }
  };

  return (
    <ModalMessage
      messageError={messageError}
      name={`contact[${t("flits.order_contact_us.message_label", "Message")}]`}
      mandatory={true}
      valueId="message"
      placeholder={t("flits.order_contact_us.message_placeholder", "Hello Support Team, when can I expect my order?")}
      id="flits-contact-form-message"
      label={t("flits.order_contact_us.message_label", "Message")}
      onClickEvent={handleValueChange}
      messageForm={messageForm}
    />
  );
};
