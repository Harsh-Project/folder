import React, { Suspense, useEffect, useState } from "react";
// import { RecentViewCardSimple } from "../RecentViewCardSimple/RecentViewCardSimple";
// import { RecentViewCard } from "../RecentViewCard/RecentViewCard";
import { useSelector } from "react-redux";
import { ProductCardSkeleton } from '../../General/ProductCardSkeleton/ProductCardSkeleton';

export const RecentViewSelectDecide = ({ item }) => {
  const [isLoading, setIsLoading] = useState(true);
  const productData = useSelector(
    (state) => state.StoreFrontShopifyData.productData[item?.product_handle]
  );
  console.log("RecentViewSelectDecide", productData);

  useEffect(() => {
    if (productData) {
      setIsLoading(false);
    }
  }, [productData]);

  if (!productData && !isLoading) {
    return null;
  }

  if (isLoading) {
    return (
      <Suspense fallback={<></>}>
        <ProductCardSkeleton />
      </Suspense>
    );
  }

  return null;
};
