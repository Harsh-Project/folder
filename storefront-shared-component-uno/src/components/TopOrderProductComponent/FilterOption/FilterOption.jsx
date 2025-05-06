import React from "react";
import styles from "./FilterOption.module.css";
import { useDispatch } from "react-redux";
import { GlobalStore } from "redux-micro-frontend";

export const dropdownItems = [
  {
    type: "none",
    text: "Filter",
    sort: "flits-product-count",
    label: "flits.top_ordered_products_page.none",
  },
  {
    type: "sort",
    text: "Number of order (Low to High)",
    sortType: "asc",
    sort: "flits-product-count",
    label: "flits.top_ordered_products_page.number_of_order_low_to_high",
  },
  {
    type: "sort",
    text: "Number of order (High to Low)",
    sortType: "desc",
    sort: "flits-product-count",
    label: "flits.top_ordered_products_page.number_of_order_high_to_low",
  },
  {
    type: "sort",
    text: "Sort by price (Low to High)",
    sortType: "asc",
    sort: "flits-product-price",
    label: "flits.top_ordered_products_page.sort_by_price_low_to_high",
  },
  {
    type: "sort",
    text: "Sort by price (High to Low)",
    sortType: "desc",
    sort: "flits-product-price",
    label: "flits.top_ordered_products_page.sort_by_price_high_to_low",
  },
  {
    type: "days",
    text: "Last 30 days",
    sort: "flits-product-days-filter",
    days: "30",
    label: "flits.top_ordered_products_page.last_30_days",
  },
  {
    type: "days",
    text: "Last 60 days",
    sort: "flits-product-days-filter",
    days: "60",
    label: "flits.top_ordered_products_page.last_60_days",
  },
];

export const FilterOption = ({ onClickEvent }) => {
  const dispatch = useDispatch();
  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;
  const { t } = useTranslationLanguage();
  const setSelectFilter = window.topOrderProductState("setSelectFilter");
  const handleSelect = (item) => {
    dispatch(setSelectFilter(item?.text));
  };
  return dropdownItems?.map((item, index) => (
    <span
      data-type={item?.type}
      key={index}
      onClick={() => {
        handleSelect(item);
        onClickEvent();
      }}
      className={`${styles.flits_drop_down_item} ${styles.flits_products_filter}`}
      data-text={item?.text}
      data-sort={item?.sort}
    >
      {t(item?.label)}
    </span>
  ));
};
