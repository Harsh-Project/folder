import parsePhoneNumber from "libphonenumber-js";
import styles from "./AddressCardModule.module.css";
import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { ButtonSection } from "../ButtonSection/ButtonSection";

export const AddressCard = ({
  item,
  index,
  handleDefaultEvent,
  handleEditEvent,
  handleDeleteEvent,
}) => {
  const defaultAddress = useSelector(
    (state) => state.storeFrontDeliveryAddress.defaultAddress
  );

  if (item?.id === defaultAddress?.id) {
    return null;
  }
  return (
    <div
      className={`${styles.flits_address_card} ${styles.flits_default_address}`}
    >
      <Suspense fallback={<></>}>
        <ButtonSection
          item={item}
          isEditButton={true}
          isDeleteButton={true}
          isDefaultButton={true}
          index={index}
          handleDefaultEvent={handleDefaultEvent}
          handleEditEvent={handleEditEvent}
          handleDeleteEvent={handleDeleteEvent}
        />
      </Suspense>
      <div className={styles.flits_address_details}>
        {item && (
          <>
            {(item?.firstName || item?.lastName) && (
              <p
                className={`${styles.flits_address_item} ${styles.flits_address_name}`}
              >{`${
                item?.firstName !== "null" && item?.firstName
                  ? item?.firstName
                  : ""
              } ${
                item?.lastName !== "null" && item?.lastName
                  ? item?.lastName
                  : ""
              }`}</p>
            )}
            {item?.company && (
              <p
                className={`${styles.flits_address_item} ${styles.flits_company_name}`}
              >{`${
                item?.company !== "null" && item?.company ? item?.company : ""
              }`}</p>
            )}
            {item?.addressLine1 && (
              <p
                className={`${styles.flits_address_item} ${styles.flits_address1_line}`}
              >{`${
                item?.addressLine1 !== "null" && item?.addressLine1
                  ? item?.addressLine1
                  : ""
              }`}</p>
            )}
            {item?.addressLine2 && (
              <p
                className={`${styles.flits_address_item} ${styles.flits_address2_line}`}
              >{`${
                item?.addressLine2 !== "null" && item?.addressLine2
                  ? item?.addressLine2
                  : ""
              }`}</p>
            )}
            {(item?.zip || item?.city || item?.provinceCode) && (
              <p
                className={`${styles.flits_address_item} ${styles.flits_city_details}`}
              >{`${item?.zip !== "null" && item?.zip ? item?.zip : ""} ${
                item?.city !== "null" && item?.city ? item?.city : ""
              } ${
                item?.provinceCode !== "null" && item?.provinceCode
                  ? item?.provinceCode
                  : ""
              }`}</p>
            )}
            {item?.country && (
              <p
                className={`${styles.flits_address_item} ${styles.flits_country_name}`}
              >{`${
                item?.country !== "null" && item?.country ? item?.country : ""
              }`}</p>
            )}
            {item?.phone && (
              <p
                className={`${styles.flits_address_item} ${styles.flits_phone_number}`}
              >{`${
                item?.phone !== "null" &&
                !item?.phone?.includes("null") &&
                item?.phone &&
                parsePhoneNumber(item?.phone)
                  ? item?.phone
                  : ""
              }`}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};
