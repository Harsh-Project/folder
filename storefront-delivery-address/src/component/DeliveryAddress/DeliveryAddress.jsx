import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useMemo } from "react";
import { Suspense } from "react";
import { handleAdd } from "../Events/AddEvent";
import { handleDefault } from "../Events/DefaultEvent";
import { handleEdit } from "../Events/EditEvent";
import { handleDelete } from "../Events/DeleteEvent";
import { Form } from "../Form/Form";

const SuccessAddressEdit = (
  <svg viewBox="0 0 34.19 47.6">
    <path d="M17.09,0A17.11,17.11,0,0,0,0,17.09,25.54,25.54,0,0,0,2.62,27.38a63.15,63.15,0,0,0,5.7,9.77,97.45,97.45,0,0,0,8.27,10.23.7.7,0,0,0,1,0,96.67,96.67,0,0,0,8.26-10.23,62.36,62.36,0,0,0,5.7-9.77,25.57,25.57,0,0,0,2.63-10.29A17.12,17.12,0,0,0,17.09,0Zm7.64,36.33a95.54,95.54,0,0,1-7.64,9.54,97.42,97.42,0,0,1-7.63-9.54C4.18,28.78,1.4,22.13,1.4,17.09a15.7,15.7,0,0,1,31.39,0C32.79,22.13,30,28.78,24.73,36.33Zm5-19.24a12.61,12.61,0,1,1-7.88-11.7.7.7,0,1,1-.52,1.3,11.05,11.05,0,0,0-4.22-.82,11.21,11.21,0,1,0,7.05,2.48.7.7,0,0,1-.11-1,.69.69,0,0,1,1-.1A12.56,12.56,0,0,1,29.71,17.09Zm-6.16-3.47-2.24-2.24a.7.7,0,0,0-.49-.2H11.13a.7.7,0,0,0-.7.7V23.8a.7.7,0,0,0,.7.7H23.05a.7.7,0,0,0,.7-.7V14.11A.7.7,0,0,0,23.55,13.62Zm-8.74-1h4.57v1.58H14.81ZM19.38,23.1H14.81V19.28h4.57Zm3,0H20.77V18.58a.7.7,0,0,0-.7-.7h-6a.71.71,0,0,0-.7.7V23.1H11.83V12.58h1.58v2.28a.71.71,0,0,0,.7.7h6a.7.7,0,0,0,.7-.7v-2l1.59,1.58Zm-3.82-1.54a.7.7,0,0,1-.7.7H16.35a.7.7,0,1,1,0-1.39h1.49A.7.7,0,0,1,18.54,21.56Z"></path>
  </svg>
);

export const DeliveryAddress = () => {
  const getStore = GlobalStore.Get();
  const API = getStore._globalActions.API[0].API;
  const dispatch = useDispatch();
  const defaultAddress = useSelector(
    (state) => state.storeFrontDeliveryAddress.defaultAddress
  );
  const buttondisabled = useSelector(
    (state) => state.storeFrontDeliveryAddress.buttondisabled
  );
  const setDefaultAddress =
    window.deliveryAddressState("setDefaultAddress");
  const setPaginationCountAddress =
    window.deliveryAddressState("setPaginationCountAddress");
  const setAddressCount = window.deliveryAddressState("setAddressCount");
  const addressCount = useSelector(
    (state) => state.storeFrontDeliveryAddress.addressCount
  );
  const setDeliveryAddressData =
    window.deliveryAddressState("setDeliveryAddressData");
  const LoadingWithOutShadow = window.UnoDuoComponent("LoadingWithOutShadow");
  const setAddressSnackBarMode =
    window.deliveryAddressState("setAddressSnackBarMode");
  const setAddressSnackBarMessage =
    window.deliveryAddressState("setAddressSnackBarMessage");
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();
  const SetLocalStorage = getStore._globalActions.Helpers[0].SetLocalStorage;
  const GetLocalStorage = getStore._globalActions.Helpers[0].GetLocalStorage;
  const paginationCountAddress = useSelector(
    (state) => state.storeFrontDeliveryAddress.paginationCountAddress
  );
  const setFormMode = window.deliveryAddressState("setFormMode");
  const setFormData = window.deliveryAddressState("setFormData");
  const [currentPage, setCurrentPage] = useState(
    GetLocalStorage("LastAddressPage") ?? 1
  );

  const AddressCard = window.UnoDuoComponent("AddressCard");
  const NewAddress = window.UnoDuoComponent("NewAddress");
  const DefaultAddressCard =
    window.UnoDuoComponent("DefaultAddressCard");
  const SnackBar = window.UnoDuoComponent("SnackBar");

  const TotalSection = window.UnoDuoComponent("TotalSection");
  const DefaultSection = window.UnoDuoComponent("DefaultSection");
  const CustomPagination =
    window.UnoDuoComponent("CustomPagination");

  const deliveryAddressData = useSelector(
    (state) => state.storeFrontDeliveryAddress.deliveryAddressData
  );
  const formMode = useSelector(
    (state) => state.storeFrontDeliveryAddress.formMode
  );
  const addressSnackBarMessage = useSelector(
    (state) => state.storeFrontDeliveryAddress.addressSnackBarMessage
  );
  const addressSnackBarMode = useSelector(
    (state) => state.storeFrontDeliveryAddress.addressSnackBarMode
  );

  const displayedData = useMemo(() => {
    const startIndex = (currentPage - 1) * 6;
    const endIndex = startIndex + 6;
    return Array.isArray(deliveryAddressData) && deliveryAddressData?.length > 0
      ? deliveryAddressData.slice(startIndex, endIndex)
      : [];
  }, [currentPage, deliveryAddressData]);

  const handlePage = useCallback(
    (page) => {
      SetLocalStorage("LastAddressPage", page);
      setCurrentPage(page);
    },
    [SetLocalStorage]
  );

  const handleAddEvent = () => {
    handleAdd(dispatch, setFormMode, setFormData);
  };

  const handleDefaultEvent = (item) => {
    handleDefault(
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
    );
  };

  const handleDeleteEvent = (item) => {
    handleDelete(
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
    );
  };

  const handleEditEvent = (item, defaultSection) => {
    handleEdit(
      buttondisabled,
      defaultAddress,
      item,
      defaultSection,
      setFormData,
      dispatch,
      setFormMode
    );
  };

  useEffect(() => {
    if (
      (!displayedData || displayedData?.length === 0) &&
      paginationCountAddress > 0
    ) {
      handlePage(paginationCountAddress);
      SetLocalStorage("LastAddressPage", paginationCountAddress);
    }
  }, [displayedData, SetLocalStorage, handlePage, paginationCountAddress]);

  if (
    !CustomPagination ||
    !TotalSection ||
    !AddressCard ||
    !DefaultAddressCard ||
    !NewAddress ||
    !DefaultSection
  ) {
    return null;
  }

  if (formMode) {
    return <Form />;
  }

  if(!deliveryAddressData && parseInt(window?.flitsThemeAppExtensionObjects?.customer?.address_count) !== 0) {
   return <Suspense fallback={<LoadingWithOutShadow />}>
     <DefaultSection>
        <NewAddress handleAddEvent={handleAddEvent} />
        <DefaultAddressCard handleEditEvent={handleEditEvent} />
      </DefaultSection>
      <TotalSection>
        <LoadingWithOutShadow />
      </TotalSection>
   </Suspense>
  }

  return (
    <Suspense fallback={<LoadingWithOutShadow />}>
      <DefaultSection>
        <NewAddress handleAddEvent={handleAddEvent} />
        <DefaultAddressCard handleEditEvent={handleEditEvent} />
      </DefaultSection>
      <TotalSection>
        {displayedData?.length > 0 &&
          displayedData.map((item, index) => (
            <AddressCard
              item={item}
              index={index}
              key={index}
              handleDefaultEvent={handleDefaultEvent}
              handleEditEvent={handleEditEvent}
              handleDeleteEvent={handleDeleteEvent}
            />
          ))}
      </TotalSection>
      <CustomPagination
        data={paginationCountAddress}
        itemsPerPage={6}
        changePage={handlePage}
        defaultPage={currentPage}
      />
      <SnackBar
        mode={addressSnackBarMode}
        message={addressSnackBarMessage}
        svg={SuccessAddressEdit}
      />
    </Suspense>
  );
};
