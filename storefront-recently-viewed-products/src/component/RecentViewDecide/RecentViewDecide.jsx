import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useDispatch, useSelector } from "react-redux";
import { handleAddToCartClick } from "../Event/AddCart";

export const RecentViewDecide = ({ item }) => {
  const getStore = GlobalStore.Get();
  const productData = useSelector(
    (state) => state.StoreFrontShopifyData.productData[item?.product_handle]
  );
  const deletedProduct = useSelector(
    (state) => state.StoreFrontShopifyData.deletedProduct
  );
  const recentlyViewedData = useSelector((state) => state.storeFrontRecentlyViewedProducts.recentlyViewedData)
  const setRecentlyViewedData = window.recentViewedProductState("setRecentlyViewedData")
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch()
  const [cardData, setCardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const RecentViewCard = window.UnoDuoComponent("RecentViewCard");
  const RecentViewCardSimple =
    window.UnoDuoComponent("RecentViewCardSimple");
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();
  const ProductCardSkeleton =
    window.UnoDuoComponent("ProductCardSkeleton");
    const SetLocalStorage = getStore._globalActions.Helpers[0].SetLocalStorage;
  const GetLocalStorage = getStore._globalActions.Helpers[0].GetLocalStorage;
    const setRecentViewedSnackBarMessage =
    window.recentViewedProductState("setRecentViewedSnackBarMessage");
    const setRecentViewedSnackBarMode =
    window.recentViewedProductState("setRecentViewedSnackBarMode");
  const API = getStore._globalActions.API[0].API;
  const AddToCartRecent = window.UnoDuoComponent("AddToCartRecent");
  const SelectDropDownRecent = window.UnoDuoComponent("SelectDropDownRecent");
  const SelectDropDownSimpleRecent = window.UnoDuoComponent("SelectDropDownSimpleRecent");
  const RecentViewPriceSimple =
    window.UnoDuoComponent("RecentViewPriceSimple");
  const RecentViewPrice = window.UnoDuoComponent("RecentViewPrice");
  const NumberEdit = window.UnoDuoComponent("NumberEdit");

  const handleNumberEditChange = (value) => {
    setCardData({ ...cardData, quantity: value });
  };

  const handleNumberEditChangeFirst = (value) => {
    setQuantity(value);
  };

  const handleVariantChange = (value) => {
    setCardData({ ...cardData, ...value });
  };

  const handleClick = (value) => {
    handleAddToCartClick(value, setRecentViewedSnackBarMode, t, API, setRecentViewedSnackBarMessage, dispatch, GetLocalStorage, SetLocalStorage);
  };

  useEffect(() => {
    if (deletedProduct && deletedProduct[item?.product_handle]) {
      dispatch(
        setRecentlyViewedData(
          recentlyViewedData?.filter(
            (data) => data?.product_handle !== item?.product_handle
          )
        )
      );
    }
  }, [dispatch, setRecentlyViewedData, deletedProduct, recentlyViewedData, item?.product_handle]);

  useEffect(() => {
    if (productData) {
      setIsLoading(false);
      setCardData({
        id: productData?.variants[0]?.variant_id,
        quantity: 1,
        price: productData?.variants[0]?.price,
        image: productData?.variants[0]?.image,
        title: productData?.variants[0]?.title,
        value: productData?.variants[0]?.value,
        available: productData?.variants[0]?.available,
        variant_id: productData?.variants[0]?.variant_id,
        inventory_quantity: productData?.variants[0]?.inventory_quantity

      });
    }
  }, [productData]);

  if (!productData && !isLoading) {
    return null;
  }

  if (isLoading) {
    return (
      <>
        <ProductCardSkeleton />
      </>
    );
  }

  return productData?.variants?.length === 1 && productData?.variants[0]?.originalTitle === "Default Title" ? (
    <RecentViewCardSimple item={item} productData={productData}>
    <SelectDropDownSimpleRecent item={item} productData={productData} />
      <NumberEdit
        item={{
          id: productData?.variants[0]?.variant_id,
          quantity: 1,
          price: productData?.variants[0]?.price,
          image: productData?.variants[0]?.image,
          title: productData?.variants[0]?.title,
          value: productData?.variants[0]?.value,
          available: productData?.variants[0]?.available,
          variant_id: productData?.variants[0]?.variant_id,
        inventory_quantity: productData?.variants[0]?.inventory_quantity

        }}
        onClickEvent={handleNumberEditChangeFirst}
        dispatch={dispatch}
        mode={setRecentViewedSnackBarMode}
        message={setRecentViewedSnackBarMessage}
      />
      {RecentViewPriceSimple && <RecentViewPriceSimple productData={productData} />}
      <AddToCartRecent
        value={{ ...productData?.variants[0], quantity: quantity }}
        handleAddToCartClick={handleClick}
      />
    </RecentViewCardSimple>
  ) : (
    <RecentViewCard
      item={item}
      setCardData={setCardData}
      cardData={cardData}
      productData={productData}
    >
      <SelectDropDownRecent
        item={item}
        productData={productData}
        onClickEvent={handleVariantChange}
      />
      <NumberEdit item={cardData} onClickEvent={handleNumberEditChange} dispatch={dispatch}
        mode={setRecentViewedSnackBarMode}
        message={setRecentViewedSnackBarMessage} />
      {RecentViewPrice && <RecentViewPrice cardData={cardData} />}
      <AddToCartRecent value={cardData} handleAddToCartClick={handleClick} />
    </RecentViewCard>
  );
};
