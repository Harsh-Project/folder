import React from "react";
import { WishListContent } from "../WishListContent/WishListContent";
import { useSelector } from "react-redux";

export const WishListPage = (props) => {
  const Loading = window.UnoDuoComponent("Loading");

  const wishListData = useSelector(
    (state) => state.storeFrontWishList.wishListData
  );
  const WishListContentWrapper = window.UnoDuoComponent(
    "WishListContentWrapper"
  );

  if (!WishListContentWrapper || !wishListData) {
    return <Loading />;
  }

  return (
    <WishListContentWrapper>
      <WishListContent />
    </WishListContentWrapper>
  );
};
