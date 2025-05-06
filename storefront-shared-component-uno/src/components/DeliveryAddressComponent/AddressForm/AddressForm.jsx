import styles from "./AddressForm.module.css";
import React from "react";
import { useSelector } from "react-redux";
import { GlobalStore } from "redux-micro-frontend";

export const AddressForm = (props) => {
  const formData = useSelector(
    (state) => state.storeFrontDeliveryAddress.formData
  );

  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;

  const { t } = useTranslationLanguage();
  return (
    <div className={styles.flits_address_form}>
      <form
        method="post"
        action="/account/addresses"
        id="address_form_new"
        acceptCharset="UTF-8"
      >
        <input type="hidden" name="form_type" value="customer_address"></input>
        <input type="hidden" name="utf8" value="✓"></input>
        <div className={styles.flits_input_wrap}>
          <input
            type="hidden"
            className={styles.flits_input}
            placeholder=""
            name="form_type"
            value="new"
            id="form_type"
          ></input>
        </div>
        <p className={`${styles.flits_h2} ${styles.flits_address_form_title}`}>
          {formData?.title === "Add New Address"
            ? t("flits.address_page.add_new_address", "Add New Address")
            : t("flits.address_page.edit_address", "Edit Address")}
        </p>
        {props?.children}
      </form>
    </div>
  );
};
