import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useDispatch, useSelector } from "react-redux";
import { handleAddToCartClick } from "../Event/AddCart";
import { handleRemoveFromList } from "../Event/Remove";

export const WishListCardDecide = ({ item }) => {
  const getStore = GlobalStore.Get();
  const productData = useSelector(
    (state) => state.StoreFrontShopifyData.productData[item?.product_handle]
  );
  const deletedProduct = useSelector(
    (state) => state.StoreFrontShopifyData.deletedProduct
  );
  const wishListData = useSelector(
    (state) => state.storeFrontWishList.wishListData
  );
  const wishListCount = useSelector(
    (state) => state.storeFrontWishList.wishListCount
  );
  const [quantity, setQuantity] = useState(1);
  const [show, setShow] = useState(false);
  const [cardData, setCardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const SetLocalStorage = getStore._globalActions.Helpers[0].SetLocalStorage;
  const GetLocalStorage = getStore._globalActions.Helpers[0].GetLocalStorage;
  const setWishListData = window?.wishListState("setWishListData");
  const dispatch = useDispatch();
  const WishListCard = window.UnoDuoComponent("WishListCard");
  const WishListCardSimple = window.UnoDuoComponent("WishListCardSimple");
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();
  const ProductCardSkeleton = window.UnoDuoComponent("ProductCardSkeleton");
  const setWishListSnackBarMessage = window.wishListState(
    "setWishListSnackBarMessage"
  );
  const setWishListSnackBarMode = window.wishListState(
    "setWishListSnackBarMode"
  );
  const API = getStore._globalActions.API[0].API;
  const AddToCart = window.UnoDuoComponent("AddToCart");
  const setWishListCount = window.wishListState("setWishListCount");
  const SelectDropDown = window.UnoDuoComponent("SelectDropDown");
  const SelectDropDownSimple = window.UnoDuoComponent("SelectDropDownSimple");
  const WishListPriceSimple = window.UnoDuoComponent("WishListPriceSimple");
  const WishListPrice = window.UnoDuoComponent("WishListPrice");
  const NumberEdit = window.UnoDuoComponent("NumberEdit");
  const RemoveButton = window.UnoDuoComponent("RemoveButton");

  const handleNumberEditChange = (value) => {
    setCardData({ ...cardData, quantity: value });
  };

  const handleNumberEditChangeFirst = (value) => {
    setQuantity(value);
  };

  const handleRemove = (value, wishlistKeyInLocalStorage) => {
    handleRemoveFromList(
      dispatch,
      value,
      t,
      API,
      SetLocalStorage,
      setWishListData,
      wishlistKeyInLocalStorage,
      wishListData,
      setWishListSnackBarMode,
      setWishListSnackBarMessage,
      wishListCount,
      setWishListCount
    );
  };

  const handleVariantChange = (value) => {
    setCardData({ ...cardData, ...value });
  };

  const handleClick = (value) => {
    handleAddToCartClick(
      value,
      setWishListSnackBarMode,
      t,
      API,
      setWishListSnackBarMessage,
      dispatch,
      GetLocalStorage,
      SetLocalStorage
    );
  };

  useEffect(() => {
    if (deletedProduct && deletedProduct[item?.product_handle]) {
      dispatch(
        setWishListData(
          wishListData?.filter(
            (data) => data?.product_handle !== item?.product_handle
          )
        )
      );
    }
  }, [dispatch, setWishListData, deletedProduct, wishListData, item?.product_handle]);

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
        inventory_quantity: productData?.variants[0]?.inventory_quantity,
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

  return productData?.variants?.length === 1 &&
    productData?.variants[0]?.originalTitle === "Default Title" ? (
    <WishListCardSimple item={{...item, product_title: productData?.title ?? item?.product_title}} setShow={setShow} productData={productData}>
      <SelectDropDownSimple item={{...item, product_title: productData?.title ?? item?.product_title}} productData={productData} />
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
          inventory_quantity: productData?.variants[0]?.inventory_quantity,
        }}
        onClickEvent={handleNumberEditChangeFirst}
        dispatch={dispatch}
        mode={setWishListSnackBarMode}
        message={setWishListSnackBarMessage}
      />
      {WishListPriceSimple && <WishListPriceSimple productData={productData} />}
      <AddToCart
        value={{ ...productData?.variants[0], quantity: quantity }}
        handleAddToCartClick={handleClick}
      />
      <RemoveButton
        value={productData?.variants[0]}
        show={show}
        handleRemoveClick={handleRemove}
      />
    </WishListCardSimple>
  ) : (
    <WishListCard
      item={{...item, product_title: productData?.title ?? item?.product_title}}
      setCardData={setCardData}
      cardData={cardData}
      setShow={setShow}
      productData={productData}
    >
      <SelectDropDown
        item={{...item, product_title: productData?.title ?? item?.product_title}}
        productData={productData}
        onClickEvent={handleVariantChange}
      />
      <NumberEdit
        item={cardData}
        onClickEvent={handleNumberEditChange}
        dispatch={dispatch}
        mode={setWishListSnackBarMode}
        message={setWishListSnackBarMessage}
      />
      {WishListPrice && <WishListPrice cardData={cardData} />}
      <AddToCart value={cardData} handleAddToCartClick={handleClick} />
      <RemoveButton
        value={{ ...cardData, product_id: productData?.id }}
        show={show}
        handleRemoveClick={handleRemove}
      />
    </WishListCard>
  );
};
