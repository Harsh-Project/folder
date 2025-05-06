/* eslint-disable jsx-a11y/anchor-is-valid */
import styles from "./FilterField.module.css";
import React, { useState } from "react";
import { dropdownItems, FilterOption } from "../FilterOption/FilterOption";
import { useSelector } from "react-redux";
import { RenderSvgString } from "../../General/RenderSvgString";
import Collapsible from "react-collapsible";
import { GlobalStore } from "redux-micro-frontend";

export const FilterField = () => {
  const getStore = GlobalStore.Get();
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();
  const [show, setShow] = useState(false);
  const selectFilter = useSelector(
    (state) => state.storeFrontTopOrderProduct.selectFilter
  );

  const handleShow = () => {
    setShow(!show);
  };

  const optionSelected = dropdownItems?.filter(
    (data) => selectFilter === data?.text
  );

  return (
    <div className={`${styles.flits_dropdown} ${styles.filter_right}`}>
      <a
        className={`${styles.flits_filter_dropbtn} ${styles.flits_primary_btn}`}
        onClick={handleShow}
      >
        <span className={styles.flits_filter_text}>
          {t(optionSelected[0]?.label, optionSelected[0]?.text)}
        </span>
        <div className={styles.flits_drop_down_icon}>
          <RenderSvgString svgString={window?.UnoIcon?.DownArrowUnoFilter} />
        </div>
      </a>
      <div className={`${styles.flits_dropdown_content}`}>
        <Collapsible open={show}>
          <FilterOption onClickEvent={handleShow} />
        </Collapsible>
      </div>
    </div>
  );
};
