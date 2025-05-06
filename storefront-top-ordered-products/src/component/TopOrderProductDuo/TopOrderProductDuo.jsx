import React, { useState } from "react";
import { useEffect } from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import { TopOrderCardDuo } from "./TopOrderCardDuo";
import { EmptySvg } from "./EmptySvg";

export const TopOrderProductDuo = () => {
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const getStore = GlobalStore.Get();

  const SearchFilterWrapper = window.UnoDuoComponent("SearchFilterWrapper");
  const dispatch = useDispatch();
  const LoadingWithOutShadow = window.UnoDuoComponent("LoadingWithOutShadow");
  const CustomPagination = window.UnoDuoComponent("CustomPagination");
  const setTopOrderDataCustom = window.topOrderProductState(
    "setTopOrderDataCustom"
  );
  const TopOrderListWrapper = window.UnoDuoComponent("TopOrderListWrapper");
  const SnackBar = window.UnoDuoComponent("SnackBar");
  const TopOrderCard = window.UnoDuoComponent("TopOrderCard");
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;
  const { t } = useTranslationLanguage();
  const NoProductFound = window.UnoDuoComponent("NoProductFound");
  const topOrderDataCustom = useSelector(
    (state) => state.storeFrontTopOrderProduct.topOrderDataCustom
  );
  const topOrderProductSnackBarMessage = useSelector(
    (state) => state.storeFrontTopOrderProduct.topOrderProductSnackBarMessage
  );
  const topOrderProductSnackBarMode = useSelector(
    (state) => state.storeFrontTopOrderProduct.topOrderProductSnackBarMode
  );
  const Empty = window.UnoDuoComponent("Empty");

  const topOrderData = useSelector(
    (state) => state.storeFrontTopOrderProduct.topOrderData
  );
  const selectSortBy = useSelector(
    (state) => state.storeFrontTopOrderProduct.selectSortBy
  );
  const selectFilter = useSelector(
    (state) => state.storeFrontTopOrderProduct.selectFilter
  );
  const orderField = useSelector(
    (state) => state.storeFrontTopOrderProduct.orderField
  );
  const search = useSelector((state) => state.storeFrontTopOrderProduct.search);

  const filterSearch = useCallback(() => {
    let filteredProducts = [...topOrderData];
    if (search && search?.length > 0) {
      filteredProducts =
        Array.isArray(topOrderData) &&
        topOrderData.length > 0 &&
        topOrderData.filter((product) => {
          const lowerCaseSearch = search.toLowerCase();
          return product[0]?.title.toLowerCase().includes(lowerCaseSearch);
        });
    }

    if (
      selectSortBy &&
      selectSortBy?.length > 0 &&
      selectFilter !== "Sort By"
    ) {
      if (selectSortBy === "Number of order (Low to High)") {
        filteredProducts.sort(
          (a, b) =>
            orderField[`${a[0]?.product_id}TotalQuantity`] -
            orderField[`${b[0]?.product_id}TotalQuantity`]
        );
      } else if (selectSortBy === "Number of order (High to Low)") {
        filteredProducts.sort(
          (a, b) =>
            orderField[`${b[0]?.product_id}TotalQuantity`] -
            orderField[`${a[0]?.product_id}TotalQuantity`]
        );
      } else if (selectSortBy === "Sort by price (Low to High)") {
        filteredProducts.sort(
          (a, b) =>
            orderField[`${a[0]?.product_id}Price`] -
            orderField[`${b[0]?.product_id}Price`]
        );
      } else if (selectSortBy === "Sort by price (High to Low)") {
        filteredProducts.sort(
          (a, b) =>
            orderField[`${b[0]?.product_id}Price`] -
            orderField[`${a[0]?.product_id}Price`]
        );
      } else if (selectSortBy === "Last 30 days") {
        filteredProducts = filteredProducts.filter(
          (a) => orderField[`${a[0]?.product_id}Last30Day`]
        );
      } else if (selectSortBy === "Last 60 days") {
        filteredProducts = filteredProducts.filter(
          (a) => orderField[`${a[0]?.product_id}Last60Day`]
        );
      }
    }

    if (selectFilter && selectFilter?.length > 0 && selectFilter !== "Filter") {
      if (selectFilter === "Last 30 days") {
        filteredProducts = filteredProducts.filter(
          (a) => orderField[`${a[0]?.product_id}Last30Day`]
        );
      } else if (selectFilter === "Last 60 days") {
        filteredProducts = filteredProducts.filter(
          (a) => orderField[`${a[0]?.product_id}Last60Day`]
        );
      }
    }
    dispatch(setTopOrderDataCustom(filteredProducts));
  }, [
    selectSortBy,
    dispatch,
    selectFilter,
    orderField,
    search,
    topOrderData,
    setTopOrderDataCustom,
  ]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData =
    Array.isArray(topOrderDataCustom) && topOrderDataCustom?.length > 0
      ? topOrderDataCustom.slice(startIndex, endIndex)
      : [];

  const handlePage = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (currentPage > Math.ceil((topOrderDataCustom?.length ?? 1) / itemsPerPage)) {
      setCurrentPage(1);
    }
  }, [topOrderDataCustom, itemsPerPage, currentPage]);

  useEffect(() => {
    if (Array.isArray(topOrderData)) filterSearch();
  }, [filterSearch, search, topOrderData]);

  if (!topOrderData || !TopOrderCard || !SearchFilterWrapper) {
    return <LoadingWithOutShadow />;
  }

  if (topOrderData && topOrderData?.length === 0) {
    return (
      <Empty
        needShadow={false}
        message1={t(
          "flits.top_ordered_products_page.blank_screen_line_1_html",
          "There are no top ordered products to display.<br>We are pretty sure that a few products<br>from our fantastic collection<br>will make it to your top products."
        )}
        svgProp={EmptySvg}
        shopNowButton={t("flits.top_ordered_products_page.blank_screen_button_text", "Explore products")}
      />
    );
  }

  if (
    topOrderData &&
    topOrderData?.length > 0 &&
    topOrderDataCustom?.length === 0
  ) {
    return (
      <>
        <SearchFilterWrapper />
        <NoProductFound />
      </>
    );
  }
  return (
    <>
      <SearchFilterWrapper />
      <TopOrderListWrapper>
        {displayedData?.length > 0 &&
          displayedData.map((item, index) => {
            return <TopOrderCardDuo key={item[0]?.id} item={item} />;
          })}
      </TopOrderListWrapper>
      <CustomPagination
        data={Math.ceil(topOrderDataCustom.length / itemsPerPage)}
        defaultPage={currentPage}
        itemsPerPage={itemsPerPage}
        changePage={handlePage}
      />
      <SnackBar
        mode={topOrderProductSnackBarMode}
        message={topOrderProductSnackBarMessage}
      />
    </>
  );
};
