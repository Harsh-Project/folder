export const handleAddToCartClick = async (setTopOrderProductSnackBarMode, API, setTopOrderProductSnackBarMessage, orderField, t, item, dispatch, GetLocalStorage, SetLocalStorage) => {
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
              page_type: "top_order",
              variant_id: orderField[`${item[0]?.product_id}Id`],
            },
            measures: {
              quantity: orderField[`${item[0]?.product_id}Quantity`],
              price: parseFloat(orderField[`${item[0]?.product_id}Price`]),
            },
          },
        },
      ],
    },
  };

  AnalyticsLocalStorageData.push(analyticItem);
    let formData = {};
    formData[`items[0][id]`] = orderField[`${item[0]?.product_id}Id`];
    formData[`items[0][quantity]`] = orderField[`${item[0]?.product_id}Quantity`]
    dispatch(setTopOrderProductSnackBarMode("processing"));
    dispatch(setTopOrderProductSnackBarMessage(t("flits.cart_page.adding_items_to_cart", "Adding items to cart...")));
    const data = await API.Shopify.addToCart(formData);
    if(data?.status) {
      dispatch(setTopOrderProductSnackBarMode("processing"));
      dispatch(setTopOrderProductSnackBarMessage(data?.description));

      setTimeout(() => {
        dispatch(setTopOrderProductSnackBarMode(null));
        dispatch(setTopOrderProductSnackBarMessage(""));
      }, 2500);
      return;
    }

    if(!data?.status) {
      dispatch(setTopOrderProductSnackBarMode(null));
      SetLocalStorage("analyticCartAndContactData", AnalyticsLocalStorageData);
        dispatch(setTopOrderProductSnackBarMessage(""));
    window.location.href = `https://${window.location.host}/${window?.commonEndpoint?.cart ?? "cart"}`;
    }
  };