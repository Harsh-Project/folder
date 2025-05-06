import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const LinkSvg = (
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
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
  </svg>
);

export const Link = () => {
  const linkForm = useSelector(
    (state) => state.storeFrontOrder.linkForm
  );
  const linkError = useSelector(
    (state) => state.storeFrontOrder.linkError
  );
  const dispatch = useDispatch();
  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;
  const setLinkForm = window.orderState("setLinkForm");
  const setLinkError = window.orderState("setLinkError");
  const { t } = useTranslationLanguage();
  const ModalLink = window.UnoDuoComponent("ModalLink");

  const handleValueChange = (value) => {
    dispatch(setLinkForm(value));
    if (linkError?.length > 0) {
      dispatch(setLinkError(null));
    }
  };

  return (
    <ModalLink
      svg={LinkSvg}
      type="text"
      name={`contact[${t("flits.order_contact_us.attachment_link_label", "Attachment Link")}]`}
      valueId="link"
      id="flits-contact-form-url"
      placeholder={t("flits.order_contact_us.attachment_link_placeholder", "You can upload files on your drive and paste the link here.")}
      label={t("flits.order_contact_us.attachment_link_label", "Attachment Link")}
      value={linkForm}
      onClickEvent={handleValueChange}
      error={linkError}
    />
  );
};
