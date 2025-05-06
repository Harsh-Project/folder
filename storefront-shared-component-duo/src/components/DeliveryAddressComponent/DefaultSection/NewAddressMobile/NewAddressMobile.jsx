import styles from "./NewAddressMobileModule.module.css";
import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useDispatch } from "react-redux";
import { RenderSvgString } from "../../../General/RenderSvgString";

export const NewAddressMobile = () => {
  const getStore = GlobalStore.Get();
  const setFormMode = window.deliveryAddressState("setFormMode");
  const { t } =
    getStore._globalActions.Helpers[0].useTranslationLanguage();
  const dispatch = useDispatch();
  const setFormData = window.deliveryAddressState("setFormData");

  const handleAdd = () => {
    dispatch(setFormMode(true));
    dispatch(
      setFormData({
        title: "Add New Address",
        id: "",
        customer_id: "",
        firstName: "",
        lastName: "",
        addressLine1: "",
        addressLine2: "",
        company: "",
        zip: "",
        phone: "",
        check: false,
        city: "",
        country: "",
        province: "",
        needMark: true,
      })
    );
  };
  return (
    <div
      className={`${styles.flits_address_card} ${styles.flits_new_address_card}`}
      onClick={handleAdd}
    >
      <RenderSvgString svgString={window?.DuoIcon?.AddAddress} />

      <p>{t("flits.address_page.add_new_address", "Add New Address")}</p>
    </div>
  );
};
