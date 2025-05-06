export const handleSubmit = (
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
) => {
  let AnalyticsLocalStorageData =
    GetLocalStorage("analyticCartAndContactData") || [];
  const analyticItem = {
    status: "pending",
    data: {
      action: "save_analytics_event",
      customer_id: window?.flitsThemeAppExtensionObjects?.customer?.customer_id,
      user_id: window?.flitsThemeAppExtensionObjects?.Metafields?.SHOP_ID,
      app_name: window?.flitsThemeAppExtensionObjects?.Metafields?.APP_PROXY,
      token: window?.flitsThemeAppExtensionObjects?.customer?.shop_token,
      timestamp: Date.now(),
      customer_hash:
        window?.flitsThemeAppExtensionObjects?.customer?.customer_hash,
      event_data: [
        {
          data: {
            event_name: "contactUs",
            dimensions: {
              page_type: "account",
              order_id: item?.order_id,
            },
            measures: {
              items_count: item?.line_items?.length,
            },
          },
        },
      ],
    },
  };

  AnalyticsLocalStorageData.push(analyticItem);
  let returnOrNot = false;

  const phoneNumber = parsePhoneNumber(contactForm);
  let validOrNot = true;

  if (phoneNumber) {
    validOrNot = phoneNumber.isValid();
  }

  const isValidLinkOrNot = (data) => {
    let testData =
      /\b((http|https):\/\/?)[^\s()<>]+(?:\([\w\d]+\)|([^[:punct:]\s]|\/?))/g;
    if (testData.test(data)) {
      return true;
    }
    return false;
  };

  if (!validOrNot) {
    dispatch(
      setContactError(
        t(
          "flits.order_contact_us.invalid_contact_number_warning",
          "Please enter a valid contact number"
        )
      )
    );
    returnOrNot = true;
  }

  if (linkForm?.length > 0 && !isValidLinkOrNot(linkForm)) {
    dispatch(
      setLinkError(
        t(
          "flits.order_contact_us.invalid_attachment_link_warning",
          "Please enter a valid attachment link"
        )
      )
    );
    returnOrNot = true;
  }

  if (!emailForm) {
    dispatch(
      setEmailError(
        t("flits.order_contact_us.email_required_warning", "Email is required")
      )
    );
    returnOrNot = true;
  }

  if (!messageForm) {
    dispatch(
      setMessageError(
        t(
          "flits.order_contact_us.message_required_warning",
          "Message is required"
        )
      )
    );
    returnOrNot = true;
  }

  if (!reasonForm) {
    dispatch(
      setReasonError(
        t(
          "flits.order_contact_us.reason_required_warning",
          "Please select a reason"
        )
      )
    );
    returnOrNot = true;
  }

  if (
    emailForm?.length > 0 &&
    !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(emailForm)
  ) {
    dispatch(
      setEmailError(
        t(
          "flits.order_contact_us.invalid_email_warning",
          "Please enter a valid email address"
        )
      )
    );
    returnOrNot = true;
  }

  if (returnOrNot) {
    return;
  }

  const form = document.getElementById("flits-contact-form");
  if (form) {
    let itemAvailable = false;
    let currentContactFormDetail =
      GetLocalStorage(
        `contact_us_order_list${window?.flitsThemeAppExtensionObjects?.customer?.customer_id}`
      ) || [];
    const obj = {
      emailForm,
      contactForm,
      linkForm,
      messageForm,
      order_id: item?.order_id,
      reasonForm,
      firstNameForm,
      lastNameForm,
      date: new Date(),
    };

    for (let i = 0; i < currentContactFormDetail?.length; i++) {
      if (item?.order_id === currentContactFormDetail[i]?.order_id) {
        currentContactFormDetail[i] = obj;
        itemAvailable = true;
        break;
      }
    }
    if (itemAvailable === false) {
      currentContactFormDetail.push(obj);
    }
    SetLocalStorage(
      `contact_us_order_list${window?.flitsThemeAppExtensionObjects?.customer?.customer_id}`,
      currentContactFormDetail
    );
    SetLocalStorage(
      `contactModal${window?.flitsThemeAppExtensionObjects?.customer?.customer_id}`,
      true
    );
    SetLocalStorage("analyticCartAndContactData", AnalyticsLocalStorageData);
    form.setAttribute("data-shopify-captcha", true);
    function submitForm(forms) {
      forms.submit();
      // setModal(false);
    }
    window?.Shopify?.captcha === undefined
      ? submitForm(form)
      : window.Shopify.captcha.protect(form, () => {
          submitForm(form);
        });
  }
};
