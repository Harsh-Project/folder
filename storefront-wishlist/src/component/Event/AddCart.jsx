export const handleAddToCartClick = async (
  value,
  setWishListSnackBarMode,
  t,
  API,
  setWishListSnackBarMessage,
  dispatch,
  GetLocalStorage,
  SetLocalStorage
) => {
  let AnalyticsLocalStorageData =
    GetLocalStorage("analyticCartAndContactData") || [];
  const analyticItem = {
    status: "pending",
    data: {
      action: "save_analytics_event",
      customer_id: window?.flitsThemeAppExtensionObjects?.customer?.customer_id,
      user_id: window?.flitsThemeAppExtensionObjects?.Metafields?.SHOP_ID,
      app_name: window?.flitsThemeAppExtensionObjects?.Metafields?.APP_PROXY,
      token: window?.flitsThemeAppExtensionObjects?.customer?.shop_token,
      timestamp: Date.now(),
      customer_hash:
        window?.flitsThemeAppExtensionObjects?.customer?.customer_hash,
      event_data: [
        {
          data: {
            event_name: "addToCart",
            dimensions: {
              page_type: "wishlist",
              variant_id: value?.variant_id,
            },
            measures: {
              quantity: value?.quantity,
              price: parseFloat(value?.price),
            },
          },
        },
      ],
    },
  };

  AnalyticsLocalStorageData.push(analyticItem);

  let data ={}

    data[`items[0][id]`] = value?.variant_id;
    data[`items[0][quantity]`] = value?.quantity
  dispatch(setWishListSnackBarMode("processing"));
  dispatch(
    setWishListSnackBarMessage(
      t("flits.cart_page.adding_items_to_cart", "Adding items to cart...")
    )
  );

  const res = await API.Shopify.addToCart(data);
  console.log(res);

    if (res?.status) {
      dispatch(setWishListSnackBarMode("processing"));
      dispatch(setWishListSnackBarMessage(res?.description));

    setTimeout(() => {
      dispatch(setWishListSnackBarMode(null));
      dispatch(setWishListSnackBarMessage(""));
    }, 2500);
    return;
  }

    if (!res?.status) {
      SetLocalStorage("analyticCartAndContactData", AnalyticsLocalStorageData);
      dispatch(setWishListSnackBarMode(null));
      dispatch(setWishListSnackBarMessage(""));
      window.location.href = `https://${window.location.host}/${window?.commonEndpoint?.cart ?? "cart"}`;
    }

  };
