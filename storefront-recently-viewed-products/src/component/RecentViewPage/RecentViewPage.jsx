import React from "react";
import { RecentViewContent } from "../RecentViewContent/RecentViewContent";
import { useSelector } from 'react-redux';

export const RecentViewPage = (props) => {

  const RecentViewContentWrapper =
    window.UnoDuoComponent("RecentViewContentWrapper");
  const Loading = window.UnoDuoComponent("Loading");
    const recentlyViewedData = useSelector(
      (state) => state.storeFrontRecentlyViewedProducts.recentlyViewedData
    );

  if (
    !RecentViewContentWrapper ||
    !recentlyViewedData 
  ) {
    return <Loading />;
  }

  return (
    <RecentViewContentWrapper>
      <RecentViewContent />
    </RecentViewContentWrapper>
  );
};
