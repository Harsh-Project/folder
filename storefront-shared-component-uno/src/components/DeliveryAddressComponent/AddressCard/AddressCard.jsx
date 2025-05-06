import styles from "./AddressCard.module.css";
import parsePhoneNumber from "libphonenumber-js";
import React, { Suspense, useState } from "react";
import { useSelector } from "react-redux";
import { ButtonSection } from '../ButtonSection/ButtonSection';

export const AddressCard = ({
  item,
  index,
  handleDefaultEvent,
  handleEditEvent,
  handleDeleteEvent,
}) => {
  const [show, setShow] = useState(false);
  const defaultAddress = useSelector(
    (state) => state.storeFrontDeliveryAddress.defaultAddress
  );

  const handleLeave = () => {
    setShow(false);
  };

  const handleEnter = () => {
    setShow(true);
  };

  if (item?.id === defaultAddress?.id) {
    return null;
  }
  return (
    <div
      className={styles.flits_address_card}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <Suspense fallback={<></>}>
        <ButtonSection
          item={item}
          isEditButton={true}
          isDeleteButton={true}
          isDefaultButton={true}
          show={show}
          index={index}
          handleDefaultEvent={handleDefaultEvent}
          handleEditEvent={handleEditEvent}
          handleDeleteEvent={handleDeleteEvent}
        />
      </Suspense>
      <div className={styles.flits_address_section}>
        <ul className={styles.flits_address_details_list}>
          {item && (
            <>
              {(item?.firstName || item?.lastName) && (
                <li>
                  <p
                    className={`${styles.flits_address_name} ${styles.flits_address_list_item}`}
                  >{`${
                    item?.firstName !== "null" && item?.firstName
                      ? item?.firstName
                      : ""
                  } ${
                    item?.lastName !== "null" && item?.lastName
                      ? item?.lastName
                      : ""
                  }`}</p>
                </li>
              )}
              {item?.company && (
                <li>
                  <p
                    className={`${styles.flits_company_name} ${styles.flits_address_list_item}`}
                  >{`${
                    item?.company !== "null" && item?.company
                      ? item?.company
                      : ""
                  }`}</p>
                </li>
              )}
              {item?.addressLine1 && (
                <li>
                  <p
                    className={`${styles.flits_address1_name} ${styles.flits_address_list_item}`}
                  >{`${
                    item?.addressLine1 !== "null" && item?.addressLine1
                      ? item?.addressLine1
                      : ""
                  }`}</p>
                </li>
              )}
              {item?.addressLine2 && (
                <li>
                  <p
                    className={`${styles.flits_address2_name} ${styles.flits_address_list_item}`}
                  >{`${
                    item?.addressLine2 !== "null" && item?.addressLine2
                      ? item?.addressLine2
                      : ""
                  }`}</p>
                </li>
              )}
              {(item?.zip || item?.city || item?.provinceCode) && (
                <li>
                  <p
                    className={`${styles.flits_city_name} ${styles.flits_address_list_item}`}
                  >{`${item?.zip !== "null" && item?.zip ? item?.zip : ""} ${
                    item?.city !== "null" && item?.city ? item?.city : ""
                  } ${
                    item?.provinceCode !== "null" && item?.provinceCode
                      ? item?.provinceCode
                      : ""
                  }`}</p>
                </li>
              )}
              {item?.country && (
                <li>
                  <p
                    className={`${styles.flits_country_name} ${styles.flits_address_list_item}`}
                  >{`${
                    item?.country !== "null" && item?.country
                      ? item?.country
                      : ""
                  }`}</p>
                </li>
              )}
              {item?.phone && (
                <li>
                  <p
                    className={`${styles.flits_phone_number} ${styles.flits_address_list_item}`}
                  >{`${
                    item?.phone !== "null" &&
                    !item?.phone?.includes("null") &&
                    item?.phone &&
                    parsePhoneNumber(item?.phone)
                      ? item?.phone
                      : ""
                  }`}</p>
                </li>
              )}
            </>
          )}
        </ul>
      </div>
    </div>
  );
};
