export const handleRemoveFromList = async (dispatch, value, t, API, SetLocalStorage, setWishListData, wishlistKeyInLocalStorage, wishListData, setWishListSnackBarMode,
  setWishListSnackBarMessage, wishListCount, setWishListCount) => {
    const data = {
      customer_hash:
        window?.flitsThemeAppExtensionObjects?.customer?.customer_hash,
      token: window?.flitsThemeAppExtensionObjects?.customer?.shop_token,
      product_id: value?.product_id,
      customer_email: window?.flitsThemeAppExtensionObjects?.customer?.email,
      customer_id: window?.flitsThemeAppExtensionObjects?.customer?.customer_id,
    };

    dispatch(setWishListSnackBarMode("processing"));
    dispatch(setWishListSnackBarMessage(t("flits.wishlisted_product_page.product_remove_from_wishlist", "Product removed from your wishlist")));

    const remove_from_wishlist = await API.wishlist.remove_from_wishlist(data);
    SetLocalStorage(
      wishlistKeyInLocalStorage,
      remove_from_wishlist.products_handle
    );

    if (remove_from_wishlist?.status === true) {
      dispatch(setWishListSnackBarMode(null));
      dispatch(setWishListSnackBarMessage(""));
    }

    const updateWishList = wishListData.filter(
      (data1) => data1.product_id !== value.product_id
    );
    dispatch(setWishListData(updateWishList));
    dispatch(setWishListCount({...wishListCount, count: wishListCount?.count - 1}))
  };