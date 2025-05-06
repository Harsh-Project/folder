import styles from "./EditButtonModule.module.css";
import React, { useEffect, useRef } from "react";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import { RenderSvgString } from "../../../General/RenderSvgString";
import { GlobalStore } from 'redux-micro-frontend';

export const EditButton = (props) => {
  const getStore = GlobalStore.Get()
  const { item, defaultSection, handleEditEvent } = props;
  const buttonRef = useRef(null);
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage()

  useEffect(() => {
    if (buttonRef.current) {
      tippy(buttonRef.current, {
        content: t("flits.address_page.edit_button", "Edit"),
        placement: "top",
        arrow: true,
        theme: "light",
      });
    }
  }, []);
  return (
    <li
      onClick={() => {
        handleEditEvent(item, defaultSection);
      }}
      ref={buttonRef}
      className={`${styles.flits_action_item} ${styles.flits_address_edit_btn}`}
    >
      <RenderSvgString svgString={window?.DuoIcon?.Edit} />
    </li>
  );
};
