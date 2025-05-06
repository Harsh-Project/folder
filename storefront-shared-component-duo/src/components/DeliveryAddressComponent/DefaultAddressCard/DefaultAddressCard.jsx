import parsePhoneNumber from "libphonenumber-js";
import styles from "./DefaultAddressCardModule.module.css";
import React, { Suspense } from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useSelector } from "react-redux";
import { ButtonSection } from "../ButtonSection/ButtonSection"

export const DefaultAddressCard = ({ handleEditEvent }) => {
  const defaultAddress = useSelector(
    (state) => state.storeFrontDeliveryAddress.defaultAddress
  );
  const getStore = GlobalStore.Get();
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();

  if (!defaultAddress?.id) {
    return null;
  }

  return (
    <div
      className={`${styles.flits_address_card} ${styles.flits_default_address}`}
    >
      <div className={styles.flits_triangle_wrapper}>
        <div className={styles.flits_triangle}>
          <span className={styles.flits_triangle_text}>
            {t("flits.address_page.default_address_label", "Default")}
          </span>
        </div>
      </div>
      <Suspense fallback={<></>}>
        <ButtonSection
          isEditButton={true}
          isDeleteButton={false}
          isDefaultButton={false}
          defaultSection={true}
          handleEditEvent={handleEditEvent}
        />
      </Suspense>
      <div className={styles.flits_address_details}>
        {defaultAddress && (
          <>
            {(defaultAddress?.firstName || defaultAddress?.lastName) && (
              <p
                className={`${styles.flits_address_item} ${styles.flits_address_name}`}
              >{`${
                defaultAddress?.firstName !== "null" &&
                defaultAddress?.firstName
                  ? defaultAddress?.firstName
                  : ""
              } ${
                defaultAddress?.lastName !== "null" && defaultAddress?.lastName
                  ? defaultAddress?.lastName
                  : ""
              }`}</p>
            )}
            {defaultAddress?.company && (
              <p
                className={`${styles.flits_address_item} ${styles.flits_company_name}`}
              >{`${
                defaultAddress?.company !== "null" && defaultAddress?.company
                  ? defaultAddress?.company
                  : ""
              }`}</p>
            )}
            {defaultAddress?.addressLine1 && (
              <p
                className={`${styles.flits_address_item} ${styles.flits_address1_line}`}
              >{`${
                defaultAddress?.addressLine1 !== "null" &&
                defaultAddress?.addressLine1
                  ? defaultAddress?.addressLine1
                  : ""
              }`}</p>
            )}
            {defaultAddress?.addressLine2 && (
              <p
                className={`${styles.flits_address_item} ${styles.flits_address2_line}`}
              >{`${
                defaultAddress?.addressLine2 !== "null" &&
                defaultAddress?.addressLine2
                  ? defaultAddress?.addressLine2
                  : ""
              }`}</p>
            )}
            {(defaultAddress?.zip ||
              defaultAddress?.city ||
              defaultAddress?.provinceCode) && (
              <p
                className={`${styles.flits_address_item} ${styles.flits_city_details}`}
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
            )}
            {defaultAddress?.country && (
              <p
                className={`${styles.flits_address_item} ${styles.flits_country_name}`}
              >{`${
                defaultAddress?.country !== "null" && defaultAddress?.country
                  ? defaultAddress?.country
                  : ""
              }`}</p>
            )}
            {defaultAddress?.phone && (
              <p
                className={`${styles.flits_address_item} ${styles.flits_phone_number}`}
              >{`${
                defaultAddress?.phone !== "null" &&
                !defaultAddress?.phone?.includes("null") &&
                defaultAddress?.phone &&
                parsePhoneNumber(defaultAddress?.phone)
                  ? defaultAddress?.phone
                  : ""
              }`}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};
