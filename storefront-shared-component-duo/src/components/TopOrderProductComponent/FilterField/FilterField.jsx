import styles from "./FilterFieldModule.module.css";
import React from "react";
import { dropDownSortBy, dropDownFilter } from "../FilterOption/FilterOption";
import { useDispatch, useSelector } from "react-redux";
import { GlobalStore } from "redux-micro-frontend";
import { RenderSvgString } from "../../General/RenderSvgString";

export const FilterField = () => {
  const selectFilter = useSelector(
    (state) => state.storeFrontTopOrderProduct.selectFilter
  );
  const selectSortBy = useSelector(
    (state) => state.storeFrontTopOrderProduct.selectSortBy
  );

  const getStore = GlobalStore.Get();
  const dispatch = useDispatch();
  const setSelectSortBy = window.topOrderProductState("setSelectSortBy");
  const setSelectFilter = window.topOrderProductState("setSelectFilter");
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();

  const handleSortChange = (e) => {
    dispatch(setSelectSortBy(e.target.value));
  };

  const handleFilterChange = (e) => {
    dispatch(setSelectFilter(e.target.value));
  };
  return (
    <div className={`${styles.flits_dropdown_filter}`}>
      <div
        className={`${styles.flits_filter_select} ${styles.flits_mr_10} ${
          selectSortBy && selectSortBy !== "Sort By" ? styles.flits_active : ""
        }`}
      >
        <span className={styles.flits_filter_label}>
          {t("flits.top_ordered_products_page.sort_by", "Sort By")}
        </span>
        <RenderSvgString svgString={window?.DuoIcon?.SortBy} />
        <div className={styles.flits_select_row}>
          <select className={styles.flits_input} onChange={handleSortChange}>
            {dropDownSortBy?.map((item, index) => (
              <option value={item?.text} key={index}>
                {t(item?.label)}
              </option>
            ))}
          </select>
          <div className={styles.flits_select_arrow}>
            <RenderSvgString svgString={window?.DuoIcon?.SortByOther} />
          </div>
        </div>
      </div>
      <div
        className={`${styles.flits_filter_select} ${styles.flits_ml_10} ${
          selectFilter && selectFilter !== "Filter" ? styles.flits_active : ""
        }`}
      >
        <span className={styles.flits_filter_label}>
          {t("flits.top_ordered_products_page.filter", "Filter")}
        </span>
        <RenderSvgString svgString={window?.DuoIcon?.Filter} />
        <div className={styles.flits_select_row}>
          <select className={styles.flits_input} onChange={handleFilterChange}>
            {dropDownFilter?.map((item, index) => (
              <option value={item?.text} key={index}>
                {t(item?.label)}
              </option>
            ))}
          </select>
          <div className={styles.flits_select_arrow}>
            <RenderSvgString svgString={window?.DuoIcon?.FilterOther} />
          </div>
        </div>
      </div>
    </div>
  );
};
