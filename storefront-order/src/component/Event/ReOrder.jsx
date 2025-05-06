export const handleReOrder = async ({ setMessage, allData, setSnackBarMode, API, t, GetLocalStorage, SetLocalStorage }) => {
  const getMessageFromItem = () => {
    let unAvailable = 0;
    let data = {};
    let j = 0;
    let message = null;
    let res = {};
    let soldOut = 0;
    const lineItem = JSON.parse(JSON.stringify(allData?.line_items));
    let orderCart = {};
    let reorderAnalyticData = []

    window?.flitsThemeAppExtensionObjects?.orderCart?.map((obj) => {
      const key = Object.keys(obj)[0];
      const value = obj[key];
      orderCart[key] = value;
      return null;
    });

    for (let i = 0; i < lineItem?.length; i++) {
      let item = lineItem[i];
      if (!item?.id) {
        unAvailable++;
      } else {
        if (item?.available === "true") {
          if (parseInt(item?.inventory_quantity) <= parseInt(item?.quantity)) {
            if (orderCart[item?.id]) {
              if (
                parseInt(item?.inventory_quantity) >
                parseInt(orderCart[item?.id])
              ) {
                item.quantity =
                  parseInt(item?.inventory_quantity) -
                  parseInt(orderCart[item?.id]);
              } else {
                item.quantity = parseInt(item?.inventory_quantity);
              }
              message = t(
                "flits.general.cart_updated",
                "Some items are no longer available. Your cart has been updated."
              );
            }
          } else {
            if (orderCart[item?.id]) {
              if (
                parseInt(item?.inventory_quantity) <=
                parseInt(orderCart[item?.id]) + parseInt(item?.quantity)
              ) {
                item.quantity =
                  parseInt(item?.inventory_quantity) -
                  parseInt(orderCart[item.id]);
                message = t(
                  "flits.general.cart_updated",
                  "Some items are no longer available. Your cart has been updated."
                );
              }
            }
          }
          data[`items[${j}][id]`] = item?.id;
          data[`items[${j}][quantity]`] = item.quantity;
          reorderAnalyticData.push({
            data: {
              event_name: "addToCart",
              dimensions: {
                  page_type: "reorder",
                  variant_id: item?.id
              },
              measures: {
                  quantity: item.quantity,
                  price: parseFloat(item?.price)
              }
          }
        });
          j++;
        } else {
          soldOut++;
        }
      }
    }

    if (unAvailable === 1 && !message) {
      message = t(
        "flits.order_page.one_product_unavailable",
        "One of the products is unavailable"
      );
    }

    if (unAvailable > 1 && !message) {
      message = t(
        "flits.order_page.some_products_unavailable",
        "Some of the products are unavailable"
      );
    }

    if (soldOut === 1 && !message) {
      message = t(
        "flits.order_page.one_product_sold_out",
        "One of the products is unavailable"
      );
    }

    if (soldOut > 1 && !message) {
      message = t(
        "flits.order_page.some_products_sold_out",
        "Some of the products are unavailable"
      );
    }

    res["message"] = message;
    res["data"] = data;
    res["analyticData"] = reorderAnalyticData

    return res;
  };
  const checkForItem = getMessageFromItem();
  console.log(checkForItem);

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
      event_data: checkForItem["analyticData"],
    },
  };

  AnalyticsLocalStorageData.push(analyticItem);

  if (checkForItem["message"]) {
    setSnackBarMode("information");
    setMessage(checkForItem["message"]);

    setTimeout(() => {
      setSnackBarMode("processing");
      setMessage(t("flits.cart_page.adding_items_to_cart", "Adding items to cart..."));
    }, 1500);
  } else {
    setSnackBarMode("processing");
    setMessage(t("flits.cart_page.adding_items_to_cart", "Adding items to cart..."));
  }

  const res = await API.order.reorder(checkForItem["data"]);
  console.log(res);
  await new Promise((resolve) => setTimeout(resolve, 1500));

  if(res?.status) {
    setSnackBarMode("processing");
    setMessage(res?.description);

    setTimeout(() => {
      setSnackBarMode(null);
      setMessage("");
    }, 2500);
  }

  if (!res?.status) {
    setSnackBarMode(null);
    setMessage("");
    SetLocalStorage("analyticCartAndContactData", AnalyticsLocalStorageData);
    window.location.href = `https://${window.location.host}/${window?.commonEndpoint?.cart ?? "cart"}`;
  }


};
