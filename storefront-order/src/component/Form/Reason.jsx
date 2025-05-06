import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export const Reason = () => {
  const reasonError = useSelector((state) => state.storeFrontOrder.reasonError);

  const dispatch = useDispatch();
  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;

  const setReasonForm = window.orderState("setReasonForm");
  const setReasonError = window.orderState("setReasonError");

  const { t } = useTranslationLanguage();
  const ModalReason = window.UnoDuoComponent("ModalReason");

  const handleValueChange = (e) => {
    dispatch(setReasonForm(e.target.value));
    if (reasonError?.length > 0) {
      dispatch(setReasonError(null));
    }
  };

  return (
    <ModalReason
      name={`contact[${t("flits.order_contact_us.reason_label", "Reason to Contact")}]`}
      mandatory={true}
      valueId="reasonToContact"
      id="flits-contact-form-reason"
      option={[
        {
          title: t("flits.order_contact_us.order_cancel_related_reason", "Cancel Order"),
          value: t("flits.order_contact_us.order_cancel_related_reason", "Cancel Order"),
        },
        {
          title: t("flits.order_contact_us.order_and_shipping_related_reason", "Order/Shipping"),
          value: t("flits.order_contact_us.order_and_shipping_related_reason", "Order/Shipping"),
        },
        {
          title: t("flits.order_contact_us.return_and_exchange_related_reason", "Return/Exchange"),
          value: t("flits.order_contact_us.return_and_exchange_related_reason", "Return/Exchange"),
        },
        {
          title: t("flits.order_contact_us.product_related_reason", "Product"),
          value: t("flits.order_contact_us.product_related_reason", "Product"),
        },
        {
          title: t("flits.order_contact_us.price_related_reason", "Price"),
          value: t("flits.order_contact_us.price_related_reason", "Price"),
        },
        {
          title: t("flits.order_contact_us.other_reason", "Other"),
          value: t("flits.order_contact_us.other_reason", "Other"),
        },
      ]}
      label={t("flits.order_contact_us.reason_label", "Reason to Contact")}
      reasonError={reasonError}
      onClickEvent={handleValueChange}
    />
  );
};
