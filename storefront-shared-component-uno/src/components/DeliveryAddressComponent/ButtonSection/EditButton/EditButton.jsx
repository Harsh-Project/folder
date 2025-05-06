import styles from "./EditButton.module.css";
import React from "react";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import { useRef } from "react";
import { useEffect } from "react";
import { RenderSvgString } from "../../../General/RenderSvgString";
import { GlobalStore } from 'redux-micro-frontend';

export const EditButton = (props) => {
  const getStore = GlobalStore.Get()
  const { item, defaultSection, handleEditEvent } = props
  const buttonRef = useRef(null);
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage()

  useEffect(() => {
    if (buttonRef.current) {
      tippy(buttonRef.current, {
        content: t("flits.address_page.edit_button", "Edit"),
        placement: 'left',
        arrow: true,
        theme: 'light',
      });
    }
  }, []);
  return (
    <li
      onClick={() => {handleEditEvent(item, defaultSection)}}
      className={`${styles.flits_action_item} ${styles.flits_address_edit_btn}`}
      ref={buttonRef}
    >
      <RenderSvgString svgString={window?.UnoIcon?.Edit} 
/>
    </li>
  );
};
