import React, { useEffect, useMemo, useState } from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useSelector } from "react-redux";
import { RecentViewDecide } from "../RecentViewDecide/RecentViewDecide";
import { emptysvg } from "./Empty";

export const RecentViewContent = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const getStore = GlobalStore.Get();
  const recentViewedSnackBarMessage=useSelector(state => state.storeFrontRecentlyViewedProducts.recentViewedSnackBarMessage)
  const recentViewedSnackBarMode=useSelector(state => state.storeFrontRecentlyViewedProducts.recentViewedSnackBarMode)
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;
  const RecentViewChildContentWrapper =
    window.UnoDuoComponent("RecentViewChildContentWrapper")
  const Loading = window.UnoDuoComponent("Loading");
  const Empty = window.UnoDuoComponent("Empty");
  const SnackBar = window.UnoDuoComponent("SnackBar")

  const CustomPagination =
    window.UnoDuoComponent("CustomPagination");
  const { t } = useTranslationLanguage();

  const recentlyViewedData = useSelector(
    (state) => state.storeFrontRecentlyViewedProducts.recentlyViewedData
  );

  const displayedData = useMemo(() => {
    const startIndex = (currentPage - 1) * 9;
    const endIndex = startIndex + 9;
    return Array.isArray(recentlyViewedData) && recentlyViewedData?.length > 0
      ? recentlyViewedData.slice(startIndex, endIndex)
      : [];
  }, [currentPage, recentlyViewedData])

  const handlePage = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (
      (!displayedData || displayedData?.length === 0) &&
      recentlyViewedData?.length > 0
    ) {
      handlePage(currentPage - 1);
    }
  }, [recentlyViewedData, displayedData, currentPage]);

  if (!recentlyViewedData || !CustomPagination) {
    return (
      <>
        <Loading />
      </>
    );
  }

  if (recentlyViewedData.length <= 0) {
    return (
      <>
        <Empty
          message1={t(
            "flits.recently_viewed_product_page.blank_screen_line_1_html"
          )}
          message2={t(
            "flits.recently_viewed_product_page.blank_screen_line_2_html"
          )}
          svgProp={emptysvg}
          shopNowButton={t(
            "flits.recently_viewed_product_page.blank_screen_button_text",
            "Browse products"
          )}
        />
      </>
    );
  }

    return (
      <>
        <RecentViewChildContentWrapper>
          {displayedData?.length > 0 &&
            displayedData.map((item, index) => (
              <RecentViewDecide key={item?.product_handle} item={item} />
            ))}
        </RecentViewChildContentWrapper>
        <CustomPagination
          data={recentlyViewedData}
          itemsPerPage={9}
          defaultPage={currentPage}
          changePage={handlePage}
        />
        <SnackBar message={recentViewedSnackBarMessage} mode = {recentViewedSnackBarMode} />
      </>
    );
};
