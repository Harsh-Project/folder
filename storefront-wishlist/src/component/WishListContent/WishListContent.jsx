import React, { useEffect, useMemo } from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useSelector } from "react-redux";
import { useState } from "react";
import { WishListCardDecide } from "../WishListCardDecide/WishListCardDecide";
import { EmptySvg } from "./EmptySvg";

export const WishListContent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const wishListSnackBarMessage = useSelector(
    (state) => state.storeFrontWishList.wishListSnackBarMessage
  );
  const getStore = GlobalStore.Get();
  const wishListSnackBarMode = useSelector(
    (state) => state.storeFrontWishList.wishListSnackBarMode
  );
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;
  const Loading = window.UnoDuoComponent("Loading");
  const CustomPagination = window.UnoDuoComponent("CustomPagination");
  const SnackBar = window.UnoDuoComponent("SnackBar");
  const WishListChildContentWrapper = window.UnoDuoComponent("WishListChildContentWrapper");
  const Empty = window.UnoDuoComponent("Empty");
  const { t } = useTranslationLanguage();
  const wishListData = useSelector(
    (state) => state.storeFrontWishList.wishListData
  );

  const displayedData = useMemo(() => {
    const startIndex = (currentPage - 1) * 9;
    const endIndex = startIndex + 9;
    return Array.isArray(wishListData) && wishListData?.length > 0
      ? wishListData.slice(startIndex, endIndex)
      : [];
  }, [wishListData, currentPage]);

  const handlePage = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (
      (!displayedData || displayedData?.length === 0) &&
      wishListData?.length > 0
    ) {
      handlePage(currentPage - 1);
    }
  }, [wishListData, displayedData, currentPage]);

  if (!wishListData || !CustomPagination) {
    return (
      <>
        <Loading />
      </>
    );
  }
  if (wishListData?.length <= 0) {
    return (
      <>
        <Empty
          svgProp={EmptySvg}
          message1={t(
            "flits.wishlisted_product_page.blank_screen_line_1_html",
            "Your wish is our command but<br>you haven’t wishlisted any products."
          )}
          message2={t(
            "flits.wishlisted_product_page.blank_screen_line_2_html",
            "You can wishlist products<br>and buy them later"
          )}
          shopNowButton={t(
            "flits.wishlisted_product_page.blank_screen_button_text",
            "Browse products"
          )}
        />
      </>
    );
  }

  return (
    <>
      <WishListChildContentWrapper>
        {displayedData?.length > 0 &&
          displayedData.map((item, index) => (
            <WishListCardDecide key={item?.product_handle} item={item} />
          ))}
      </WishListChildContentWrapper>
      <CustomPagination
        data={wishListData}
        itemsPerPage={9}
        defaultPage={currentPage}
        changePage={handlePage}
      />
      <SnackBar mode={wishListSnackBarMode} message={wishListSnackBarMessage} />
    </>
  );
};
