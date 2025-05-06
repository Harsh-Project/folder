import styles from "./SearchFieldModule.module.css";
import { GlobalStore } from "redux-micro-frontend";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RenderSvgString } from "../../General/RenderSvgString";

export const SearchField = () => {
  const search = useSelector((state) => state.storeFrontTopOrderProduct.search);
  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;
  const { t } = useTranslationLanguage();
  const setSearch = window.topOrderProductState("setSearch");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setSearch(e.target.value));
  };

  const handlCancel = () => {
    dispatch(setSearch(null));
  };
  return (
    <>
      <div className={`${styles.flits_search_filter} ${styles.flits_desktop}`}>
        <div className={styles.flits_input_wrap}>
          <input
            type="text"
            className={`${styles.flits_input} ${styles.flits_search}`}
            placeholder={t(
              "flits.top_ordered_products_page.search_placeholder"
            )}
            onChange={handleChange}
            name={"top_order_product_search"}
            value={search ? search : ""}
          />
        </div>
        <span
          className={`${styles.flits_search_icon_group} ${styles.flits_search_icon_group_left}`}
        >
          <RenderSvgString svgString={window?.DuoIcon?.Search} />
        </span>
        {search && search?.length > 0 && (
          <span
            onClick={handlCancel}
            className={`${styles.flits_search_icon_group} ${styles.flits_search_icon_group_right} ${styles.flits_clear_icon}`}
          >
            <RenderSvgString svgString={window?.DuoIcon?.Cancel} />
          </span>
        )}
      </div>
      <div
        className={`${styles.flits_mobile_box_card} ${styles.flits_header_title}`}
      >
        <div className={styles.flits_search_filter}>
          <div className={styles.flits_input_wrap}>
            <input
              type="text"
              className={`${styles.flits_input} ${styles.flits_search}`}
              placeholder={t(
                "flits.top_ordered_products_page.search_placeholder"
              )}
              onChange={handleChange}
              name={"top_order_product_search"}
              value={search ? search : ""}
            />
          </div>
          <span
            className={`${styles.flits_search_icon_group} ${styles.flits_search_icon_group_left}`}
          >
            <RenderSvgString svgString={window?.DuoIcon?.Search} />
          </span>
          {search && search?.length > 0 && (
            <span
              onClick={handlCancel}
              className={`${styles.flits_search_icon_group} ${styles.flits_search_icon_group_right} ${styles.flits_clear_icon}`}
            >
              <RenderSvgString svgString={window?.DuoIcon?.Cancel} />
            </span>
          )}
        </div>
      </div>
    </>
  );
};
