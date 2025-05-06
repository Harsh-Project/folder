import { getSaveErrMessage } from './getSaveErrMessage';
export const handleDefault = async (
  buttondisabled,
  API,
  t,
  setDefaultAddress,
  setDeliveryAddressData,
  dispatch,
  deliveryAddressData,
  item,
  defaultAddress,
  setAddressSnackBarMessage,
  setAddressSnackBarMode
) => {
  if (buttondisabled) {
    return;
  }
  dispatch(setAddressSnackBarMode("processing"));
  dispatch(setAddressSnackBarMessage(t("flits.address_page.updating_address", "Updating Address...")));
  const updateData = deliveryAddressData.map((item1) => {
    if (item1?.id === item?.id) {
      return defaultAddress;
    } else {
      return item1;
    }
  });


  const formData = {
    form_type: "customer_address",
    utf8: "✓",
     // eslint-disable-next-line no-dupe-keys
    form_type: "edit",
    [`address[first_name]`]:
      item?.firstName && !item?.firstName?.includes("null")
        ? item?.firstName
        : "",
    [`address[last_name]`]:
      item?.lastName && !item?.lastName?.includes("null") ? item?.lastName : "",
    [`address[address1]`]:
      item?.addressLine1 && !item?.addressLine1?.includes("null")
        ? item?.addressLine1
        : "",
    [`address[address2]`]:
      item?.addressLine2 && !item?.addressLine2?.includes("null")
        ? item?.addressLine2
        : "",
    [`address[company]`]:
      item?.company && !item?.company?.includes("null") ? item?.company : "",
    [`address[zip]`]:
      item?.zip && !item?.zip?.includes("null") ? item?.zip : "",
    [`address[phone]`]:
      item?.phone?.includes("null") || !item?.phone ? "" : item?.phone,
    [`address[city]`]: item?.city && !item?.city?.includes("null") ? item?.city :  "",
    [`address[country]`]: item?.country && !item?.country?.includes("null") ? item?.country : "",
    [`address[province]`]: item?.province && !item?.province?.includes("null") ? item?.province : "",
    [`address[default]`]: 1,
    customer_hash:
      window?.flitsThemeAppExtensionObjects?.customer?.customer_hash,
    token: window?.flitsThemeAppExtensionObjects?.customer?.shop_token,
    _method: "PUT",
  };

  const defaultMake = await API.deliveryaddress.default_address(
    formData,
    item?.id
  );
  console.log(defaultMake);

  if(defaultMake?.status === false) {
    dispatch(setAddressSnackBarMode("error"));
    dispatch(setAddressSnackBarMessage(getSaveErrMessage(t, defaultMake)));
    setTimeout(() => {
      dispatch(setAddressSnackBarMode(null));
      dispatch(setAddressSnackBarMessage(""));
    }, 2500);
    return;
  }

  if (defaultMake?.status === true) {
    dispatch(setDeliveryAddressData(updateData));
    dispatch(
      setDefaultAddress({
        ...item,
        check: true,
        needMark: false,
      })
    );
    dispatch(setAddressSnackBarMode("success"));
    dispatch(
      setAddressSnackBarMessage(
        t("flits.address_page.address_updated_successfully", "Delivery address updated successfully")
      )
    );
    setTimeout(() => {
      dispatch(setAddressSnackBarMode(null));
      dispatch(setAddressSnackBarMessage(""));
    }, 2000);
  }
};
