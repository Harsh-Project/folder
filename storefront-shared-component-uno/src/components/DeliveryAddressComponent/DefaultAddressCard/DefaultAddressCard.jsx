import styles from "./DefaultAddressCard.module.css";
import React, { Suspense, useState } from "react";
import parsePhoneNumber from "libphonenumber-js";
import { GlobalStore } from "redux-micro-frontend";
import { useSelector } from "react-redux";
import { ButtonSection } from "../ButtonSection/ButtonSection";

export const DefaultAddressCard = ({ handleEditEvent }) => {
  const [show, setShow] = useState(false);
  const defaultAddress = useSelector(
    (state) => state.storeFrontDeliveryAddress.defaultAddress
  );
  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;
  const { t } = useTranslationLanguage();

  const handleLeave = () => {
    setShow(false);
  };

  if (!defaultAddress?.id) {
    return null;
  }

  const handleEnter = () => {
    setShow(true);
  };
  return (
    <div
      className={styles.flits_address_card}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className={styles.flits_default_section}>
        <span>{t("flits.address_page.default_address_label", "Default")}</span>
      </div>
      <Suspense fallback={<></>}>
        <ButtonSection
          isEditButton={true}
          isDeleteButton={false}
          isDefaultButton={false}
          show={show}
          defaultSection={true}
          handleEditEvent={handleEditEvent}
        />
      </Suspense>
      <div className={styles.flits_address_section}>
        <ul className={styles.flits_address_details_list}>
          {defaultAddress && (
            <>
              {(defaultAddress?.firstName || defaultAddress?.lastName) && (
                <li>
                  <p
                    className={`${styles.flits_address_name} ${styles.flits_address_list_item}`}
                  >{`${
                    defaultAddress?.firstName !== "null" &&
                    defaultAddress?.firstName
                      ? defaultAddress?.firstName
                      : ""
                  } ${
                    defaultAddress?.lastName !== "null" &&
                    defaultAddress?.lastName
                      ? defaultAddress?.lastName
                      : ""
                  }`}</p>
                </li>
              )}
              {defaultAddress?.company && (
                <li>
                  <p
                    className={`${styles.flits_company_name} ${styles.flits_address_list_item}`}
                  >{`${
                    defaultAddress?.company !== "null" &&
                    defaultAddress?.company
                      ? defaultAddress?.company
                      : ""
                  }`}</p>
                </li>
              )}
              {defaultAddress?.addressLine1 && (
                <li>
                  <p
                    className={`${styles.flits_address1_name} ${styles.flits_address_list_item}`}
                  >{`${
                    defaultAddress?.addressLine1 !== "null" &&
                    defaultAddress?.addressLine1
                      ? defaultAddress?.addressLine1
                      : ""
                  }`}</p>
                </li>
              )}
              {defaultAddress?.addressLine2 && (
                <li>
                  <p
                    className={`${styles.flits_address2_name} ${styles.flits_address_list_item}`}
                  >{`${
                    defaultAddress?.addressLine2 !== "null" &&
                    defaultAddress?.addressLine2
                      ? defaultAddress?.addressLine2
                      : ""
                  }`}</p>
                </li>
              )}
              {(defaultAddress?.zip ||
                defaultAddress?.city ||
                defaultAddress?.provinceCode) && (
                <li>
                  <p
                    className={`${styles.flits_city_name} ${styles.flits_address_list_item}`}
                  >{`${
                    defaultAddress?.zip !== "null" && defaultAddress?.zip
                      ? defaultAddress?.zip
                      : ""
                  } ${
                    defaultAddress?.city !== "null" && defaultAddress?.city
                      ? defaultAddress?.city
                      : ""
                  } ${
                    defaultAddress?.provinceCode !== "null" &&
                    defaultAddress?.provinceCode
                      ? defaultAddress?.provinceCode
                      : ""
                  }`}</p>
                </li>
              )}
              {defaultAddress?.country && (
                <li>
                  <p
                    className={`${styles.flits_country_name} ${styles.flits_address_list_item}`}
                  >{`${
                    defaultAddress?.country !== "null" &&
                    defaultAddress?.country
                      ? defaultAddress?.country
                      : ""
                  }`}</p>
                </li>
              )}
              {defaultAddress?.phone && (
                <li>
                  <p
                    className={`${styles.flits_phone_number} ${styles.flits_address_list_item}`}
                  >{`${
                    defaultAddress?.phone !== "null" &&
                    !defaultAddress?.phone?.includes("null") &&
                    defaultAddress?.phone &&
                    parsePhoneNumber(defaultAddress?.phone)
                      ? defaultAddress?.phone
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
