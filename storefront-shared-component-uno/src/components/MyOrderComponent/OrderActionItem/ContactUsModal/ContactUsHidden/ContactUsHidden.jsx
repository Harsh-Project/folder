import parsePhoneNumber from "libphonenumber-js";
import React from "react";
import { useSelector } from "react-redux";
import { GlobalStore } from "redux-micro-frontend";

export const ContactUsHidden = ({ item }) => {
  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;
  const { t } = useTranslationLanguage();
  const {
    emailForm,
    firstNameForm,
    lastNameForm,
    messageForm,
    linkForm,
    reasonForm,
  } = useSelector((state) => state.storeFrontOrder);
  const { contactForm } = useSelector((state) => state.storeFrontOrder);
  return (
    <form method="post" id="flits-contact-form" action="/contact#contact-form">
      <input type="hidden" name="form_type" value="contact" />
      <input type="hidden" name="utf8" value="✓" />
      <input
        type="hidden"
        name="contact[Message received from Contact Us form of Customer Account Page]"
      />
      <input
        type="hidden"
        id="contact-form-customer-reason"
        name={`contact[${t(
          "flits.order_contact_us.reason_label",
          "Reason to Contact"
        )}]`}
        value={reasonForm}
      />
      <input
        type="hidden"
        id="contact-form-customer-name"
        name="contact[Customer Name]"
        value={`${firstNameForm} ${lastNameForm}`}
      />
      <input
        type="hidden"
        id="contact-form-customer-link"
        name="contact[View Customer in Shopify]"
        value={`https://${window.location.host}/admin/customers/${window?.flitsThemeAppExtensionObjects?.customer?.customer_id}`}
      />
      <input
        type="hidden"
        id="contact-form-customer-email"
        name={`contact[email]`}
        value={`${emailForm}`}
      />
      <input
        type="hidden"
        id="contact-form-customer-phone"
        name="contact[Contact Number]"
        value={parsePhoneNumber(contactForm) === undefined ? "" : contactForm}
      />
      <input
        type="hidden"
        id="contact-form-order-link"
        name="contact[View Order in Shopify]"
        value={`https://${window.location.host}/admin/orders/${item?.order_id}`}
      ></input>
      <input
        type="hidden"
        id="contact-form-order-date"
        name="contact[Order Date]"
        value={item?.order_create_at_contact_us}
      />
      <input
        type="hidden"
        id="contact-form-order-number"
        name="contact[Order Number]"
        value={item?.order_name.replace(/#/g, "")}
      />
      <input
        type="hidden"
        id="contact-form-order-name"
        name="contact[Order Name]"
        value={item?.order_name}
      />
      <input
        type="hidden"
        id="contact-form-order-total"
        name="contact[Order Total Price]"
        value={item?.order_total/100}
      />
      <input
        type="hidden"
        id="contact-form-order-payment-status"
        name="contact[Order Payment Status]"
        value={item?.order_paid}
      />
      <input
        type="hidden"
        id="contact-form-order-fulfillment-status"
        name="contact[Order Fulfillment Status]"
        value={item?.order_fulfillment}
      />
      <input
        type="hidden"
        id="contact-form-customer-message"
        name="contact[Message]"
        value={messageForm}
      />
      <input
        type="hidden"
        id="contact-form-customer-url"
        name={`contact[${t(
          "flits.order_contact_us.attachment_link_label",
          "Attachment Link"
        )}]`}
        value={linkForm}
      />
    </form>
  );
};
