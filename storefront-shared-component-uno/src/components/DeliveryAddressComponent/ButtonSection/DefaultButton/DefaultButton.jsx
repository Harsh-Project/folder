import styles from "./DefaultButton.module.css";
import React from "react";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import { useEffect } from "react";
import { useRef } from "react";
import { RenderSvgString } from "../../../General/RenderSvgString";
import { GlobalStore } from 'redux-micro-frontend';

export const DefaultButton = (props) => {
  const getStore = GlobalStore.Get()
  const { item, handleDefaultEvent } = props
  const buttonRef = useRef(null);
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage()

  useEffect(() => {
    if (buttonRef.current) {
      tippy(buttonRef.current, {
        content: t("flits.address_page.mark_as_default_button", "Mark as Default"),
        placement: "left",
        arrow: true,
        theme: "light",
      });
    }
  }, []);
  return (
    <li
      ref={buttonRef}
      onClick={() => {
        handleDefaultEvent(item);
      }}
      className={`${styles.flits_action_item} ${styles.flits_address_default_btn}`}
    >
      <RenderSvgString svgString={window?.UnoIcon?.Default}/>
    </li>
  );
};
