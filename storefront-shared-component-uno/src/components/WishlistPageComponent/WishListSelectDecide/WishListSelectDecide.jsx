const { Suspense, React, useEffect, useState } = await import("react").then(
  (module) => ({
    Suspense: module.Suspense,
    React: module.default,
    useEffect: module.useEffect,
    useState: module.useState,
  })
);
const useSelector = await import("react-redux").then(
  (module) => module.useSelector
);
const { lazily } = await import("react-lazily").then((module) => ({
  lazily: module.lazily,
}));
const { WishListCardSimple } = lazily(() =>
  import("../WishListCardSimple/WishListCardSimple")
);
const { WishListCard } = lazily(() => import("../WishListCard/WishListCard"));
const { ProductCardSkeleton } = lazily(() =>
  import("../../General/ProductCardSkeleton/ProductCardSkeleton")
);

export const WishListSelectDecide = ({ item }) => {
  const [isLoading, setIsLoading] = useState(true);
  const productData = useSelector(
    (state) => state.StoreFrontShopifyData.productData[item?.product_handle]
  );

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

  return productData?.variants?.length === 1 ? (
    <Suspense fallback={<></>}>
      <WishListCardSimple item={item} productData={productData} />
    </Suspense>
  ) : (
    <Suspense fallback={<></>}>
      <WishListCard item={item} productData={productData} />
    </Suspense>
  );
};
