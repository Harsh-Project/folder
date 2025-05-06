import { getSaveErrMessage } from "./getSaveErrMessage";

export const handleDelete = async (
  dispatch,
  item,
  t,
  API,
  setAddressCount,
  setAddressSnackBarMode,
  setPaginationCountAddress,
  setDeliveryAddressData,
  setAddressSnackBarMessage,
  deliveryAddressData,
  addressCount
) => {
  dispatch(setAddressSnackBarMode("processing"));
  dispatch(setAddressSnackBarMessage(t("flits.address_page.deleting_address", "Deleting Address...",)));
  const id = item?.id;
  const updateAddressData = deliveryAddressData.filter(
    (data) => data?.id !== id
  );
  dispatch(setAddressCount(addressCount - 1));
  dispatch(setPaginationCountAddress(Math.ceil((addressCount - 2) / 6)));
  const addressRemove = await API.deliveryaddress.delete_address(id);
  console.log(addressRemove);

  if(addressRemove?.status === false) {
    dispatch(setAddressSnackBarMode("error"));
    dispatch(setAddressSnackBarMessage(getSaveErrMessage(t, addressRemove)));
    setTimeout(() => {
      dispatch(setAddressSnackBarMode(null));
      dispatch(setAddressSnackBarMessage(""));
    }, 2500);
    return;
  }
  if (addressRemove?.status === true) {
    dispatch(setAddressSnackBarMode("successInfo"));
    dispatch(setDeliveryAddressData(updateAddressData));
    dispatch(
      setAddressSnackBarMessage(
        t("flits.address_page.address_deleted_successfully", "Address deleted successfully")
      )
    );
    setTimeout(() => {
      dispatch(setAddressSnackBarMode(null));
      dispatch(setAddressSnackBarMessage(""));
    }, 2500);
  }
};
