import styles from "./DeleteButton.module.css";
import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useSelector } from "react-redux";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import { useEffect } from "react";
import { useRef } from "react";
import { RenderSvgString } from "../../../General/RenderSvgString";

export const DeleteButton = (props) => {
  const { item, handleDeleteEvent } = props;
  const getStore = GlobalStore.Get();
  const buttondisabled = useSelector(
    (state) => state.storeFrontDeliveryAddress.buttondisabled
  );
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;
  const { t } = useTranslationLanguage();

  const handleDelete = async () => {
    if (buttondisabled) {
      return;
    }
    if (!window?.confirm(t("flits.address_page.delete_confirmation_message", "Are you sure you want to delete this address?"))) {
      return;
    }

    handleDeleteEvent(item);
  };

  const buttonRef = useRef(null);

  useEffect(() => {
    if (buttonRef.current) {
      tippy(buttonRef.current, {
        content: t("flits.address_page.delete_button", "Delete"),
        placement: "left",
        arrow: true,
        theme: "light",
      });
    }
  }, []);

  return (
    <li
      ref={buttonRef}
      className={`${styles.flits_action_item} ${styles.flits_address_remove_btn}`}
      onClick={handleDelete}
    >
      <RenderSvgString svgString={window?.UnoIcon?.DeliveryDelete}/>
    </li>
  );
};
