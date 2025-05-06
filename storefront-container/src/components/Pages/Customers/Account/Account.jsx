const { React, lazy, useCallback, useEffect, useState } = await import(
  "react"
).then((module) => ({
  React: module.default,
  lazy: module.lazy,
  useCallback: module.useCallback,
  useEffect: module.useEffect,
  useState: module.useState,
}));
const API = await import(
  "@getflits/storefront-shared-api/src/storefront-shared-apis/allAPI"
).then((module) => module.API);
const { useDispatch, useSelector } = await import("react-redux").then(
  (module) => ({
    useSelector: module.useSelector,
    useDispatch: module.useDispatch,
  })
);
const { setCustomFieldsData, setCustomPage, setDisplayThankYouContactUs } =
  await import(
    "../../../../StoreFrontContainerReduxSlice/StoreFrontContainerReduxSlice"
  ).then((module) => module);
const {
  setCreditData,
  setIsRefundLoading,
  setCurrentRefundPage,
  setRefundCreditApiData,
  setRefundCreditData,
  setFilterCredit,
} = await import(
  "StoreFrontContainerReduxSlice/StoreFrontCreditReduxSlice"
).then((module) => module);
const { setCustomFieldsRequiredStates } = await import(
  "../../../UtilityFunction/setCustomFieldsRequiredStates"
).then((module) => module);
const { GetLocalStorage, RemoveMainLocalStorage, SetLocalStorage } =
  await import("components/UtilityFunction/LocalStorage").then(
    (module) => module
  );
const { setApiCallDone, setWishListCount, setWishListData } = await import(
  "StoreFrontContainerReduxSlice/StoreFrontWishListReduxSlice"
).then((module) => module);
const {
  addOrderData,
  addOrderPageArray,
  removeOrderPageArray,
  setIsOrderDataLoaded,
  setSkeletonOrderCount,
  setTotalOrder,
} = await import(
  "StoreFrontContainerReduxSlice/StoreFrontOrderReduxSlice"
).then((module) => module);
const { lazily } = await import("react-lazily").then((module) => module);
const { LinearGradient } = lazily(() => import("./LinearGradient"));
const { Utility } = await import(
  "components/UtilityFunction/UtilityFunction"
).then((module) => module);
const { useTranslationLanguage } = await import(
  "StoreFrontTranslationHook/TranslationHook"
).then((module) => module);
const { setOrderField, setTopOrderData, setTopOrderDataCustom } = await import(
  "StoreFrontContainerReduxSlice/StoreFrontTopOrderProductReduxSlice"
).then((module) => module);
const { addDeliveryAddressData, setCountryData, setProvinceData } =
  await import(
    "StoreFrontContainerReduxSlice/StoreFrontDeliveryAddressReduxSlice"
  ).then((module) => module);
const { ExtractDataCountry } = await import(
  "components/UtilityFunction/ExtractDataCountry copy"
).then((module) => module);
const { getRuleFormated } = await import(
  "components/UtilityFunction/formatData"
).then((module) => module);
const { setMaxSpentCredit, setActiveButton, setRuleData } = await import(
  "StoreFrontContainerReduxSlice/StoreFrontHowToManageCreditReduxSlice"
).then((module) => module);
const { setReferFriendData } = await import(
  "StoreFrontContainerReduxSlice/StoreFrontReferFriendReduxSlice"
).then((module) => module);
const { CheckRequireField } = await import(
  "components/UtilityFunction/CheckRequireField"
).then((module) => module);
const { setCustomFields, setCustomFieldsInitial } = await import(
  "StoreFrontContainerReduxSlice/StoreFrontMyProfileReduxSlice"
).then((module) => module);
const {
  IsRequiredDateValidationFailed,
  IsRequiredTimeValidationFailed,
  IsRequiredValidationFailed,
} = await import("components/UtilityFunction/CustomFieldValidations").then(
  (module) => module
);
const { setDeletedProduct, setShopifyProuctData } = await import(
  "StoreFrontContainerReduxSlice/StoreFrontShopifyDataReduxSlice"
).then((module) => module);
const { setRecentlyViewedData } = await import(
  "StoreFrontContainerReduxSlice/StoreFrontRecentlyViewedProductsReduxSlice"
).then((module) => module);
const PageType = lazy(() => import("../../../UtilityFunction/PageType"));

const fieldRequire = {
  referFriend: ["IS_REFER_PROGRAM_ON"],
  profile: ["IS_CUSTOM_FIELDS_ENABLE"],
  recent: ["is_recently_view_enable"],
  howtomanagecredit: ["IS_HOW_TO_EARN_CREDIT_DISPLAY"],
  wishlist: ["IS_WISHLIST_PAID", "IS_WISHLIST_ENABLE"],
  toporder: ["IS_ADVANCE_DASHBOARD_ENABLE", "IS_ADVANCE_DASHBOARD_PAID"],
};

export const Account = (props) => {
  const [isOrderAPICalled, setIsOrderAPICalled] = useState(false);
  // const [totalOrderApiCall, setTotalOrderApiCall] = useState(0);
  const microFrontEndData = useSelector(
    (state) => state.storeFrontContainer.microFrontEndData
  );
  const orderData = useSelector((state) => state.storeFrontOrder.orderData);
  const isOrderDataLoaded = useSelector(
    (state) => state.storeFrontOrder.isOrderDataLoaded
  );
  const recentlyViewedData = useSelector(
    (state) => state.storeFrontRecentlyViewedProducts.recentlyViewedData
  );
  const totalOrder = useSelector((state) => state.storeFrontOrder.totalOrder);

  const countryData = useSelector(
    (state) => state.storeFrontDeliveryAddress.countryData
  );
  const provinceData = useSelector(
    (state) => state.storeFrontDeliveryAddress.provinceData
  );
  const deliveryAddressData = useSelector(
    (state) => state.storeFrontDeliveryAddress.deliveryAddressData
  );
  const refundCreditData = useSelector(
    (state) => state.storeFrontCredit.refundCreditData
  );
  const ruleData = useSelector(
    (state) => state.storeFrontHowToManageCredit.ruleData
  );
  const customPage = useSelector(
    (state) => state.storeFrontContainer.customPage
  );

  const MoneyFormat = window.UnoDuoComponent("MoneyFormat");
  const { t } = useTranslationLanguage();
  const referFriendData = useSelector(
    (state) => state.storeFrontReferFriend.referFriendData
  );
  const apiCallDone = useSelector(
    (state) => state.storeFrontWishList.apiCallDone
  );
  const defaultAddress = useSelector(
    (state) => state.storeFrontDeliveryAddress.defaultAddress
  );
  const wishListData = useSelector(
    (state) => state.storeFrontWishList.wishListData
  );
  const dispatch = useDispatch();

  const addOrNot = (productItem, product) => {
    for (let i = 0; i < product?.length; i++) {
      if (product[i]?.product_id === productItem?.product_id) {
        return false;
      }
    }
    return true;
  };

  const fetchDataTopOrder = useCallback(async () => {
    const data = orderData;
    let topOrder = {};
    let Price = {};
    let totalQuantity = {};
    let last30Day = {};
    let last60Day = {};
    let valuePrice = {};
    for (let i = 0; i < data?.length; i++) {
      const line = data[i]?.line_items;
      for (let j = 0; j < line?.length; j++) {
        const orderDate = line[j]?.order_date;
        let product;
        if (!topOrder[line[j]?.product_id] && line[j]?.product_id !== "") {
          product = await API.Shopify.getProductData(
            line[j]?.product_handle,
            t,
            dispatch,
            setDeletedProduct
          );
          if (!product) {
            continue;
          }
          for (let k = 0; k < product?.variants?.length; k++) {
            Price[product?.variants[k]?.variant_id] =
              product?.variants[k]?.price;
            valuePrice[product?.variants[k]?.variant_id] =
              product?.variants[k]?.value_price;
          }
        }
        const date = new Date(
          orderDate.replace(/\s+-.*/, "").replace(" ", `T`)
        );
        const currentDate = new Date();
        const thirtyDaysAgo =
          (currentDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
        const sixtyDayAgo =
          (currentDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
        if (line[j]?.product_id === "") {
          continue;
        }
        if (thirtyDaysAgo <= 30) {
          last30Day[line[j]?.product_id] =
            last30Day[line[j]?.product_id] || true;
        } else {
          last30Day[line[j]?.product_id] =
            last30Day[line[j]?.product_id] || false;
        }
        if (sixtyDayAgo <= 60) {
          last60Day[line[j]?.product_id] =
            last60Day[line[j]?.product_id] || true;
        } else {
          last60Day[line[j]?.product_id] =
            last60Day[line[j]?.product_id] || false;
        }
        if (totalQuantity[line[j]?.product_id]) {
          totalQuantity[line[j]?.product_id] =
            totalQuantity[line[j]?.product_id] + parseInt(line[j]?.quantity);
        } else if (line[j]?.product_id?.length > 0) {
          totalQuantity[line[j]?.product_id] = parseInt(line[j]?.quantity);
        }
        if (!topOrder[line[j]?.product_id]) {
          if (addOrNot(line[j], topOrder[line[j]?.product_id])) {
            let dataChange = [];
            for (let t = 0; t < product?.variants?.length; t++) {
              dataChange.push({
                title: product?.title,
                url: `${window?.commonEndpoint?.product ?? ""}/products/${
                  product?.handle
                }?variant=${product?.variants[t]?.variant_id}`,
                id: product?.variants[t]?.variant_id,
                image: product?.variants[t]?.image,
                price: product?.variants[t]?.price,
                order_date: line[j]?.order_date,
                product_title: product?.variants[t]?.title,
                inventory_quantity: product?.variants[t]?.inventory_quantity,
                originalTitle: product?.variants[t]?.title,
                product_id: product?.variants[t]?.product_id,
                product_handle: product?.handle,
                quantity: line[j]?.quantity,
                available: product?.variants[t]?.available,
                publish_at: line[j]?.publish_at,
                value_price: (
                  <MoneyFormat
                    price={parseFloat(product?.variants[t]?.price) / 100}
                  />
                ),
              });
            }
            //   let dataChange = topOrder[line[j]?.product_id];
            //   let duplicate = line[j];
            //   console.log(duplicate)
            // duplicate = {...duplicate, price: Price[line[j]?.id], value_price: <MoneyFormat price={(parseFloat(Price[line[j]?.id])/100)} />}
            //   dataChange.push(duplicate);
            topOrder[line[j]?.product_id] = dataChange;
          }
        }
        // else if (line[j]?.product_id?.length > 0) {
        //   let duplicate = line[j];
        //   console.log(duplicate)
        //   duplicate = {...duplicate, price: Price[line[j]?.id], value_price: <MoneyFormat price={(parseFloat(Price[line[j]?.id])/100)} />}
        //   topOrder[line[j]?.product_id] = [duplicate];
        // }
      }
    }
    let field = {};
    for (const key in topOrder) {
      field[`${key}TotalQuantity`] = totalQuantity[key];
      field[`${key}Last30Day`] = last30Day[key];
      field[`${key}Last60Day`] = last60Day[key];
      field[`${key}Quantity`] = 1;
      field[`${key}ValuePrice`] = topOrder[key][0]?.value_price;
      field[`${key}Price`] = parseFloat(topOrder[key][0]?.price);
      field[`${key}Image`] = topOrder[key][0]?.image;
      field[`${key}Url`] = topOrder[key][0]?.url;
      field[`${key}Id`] = topOrder[key][0]?.id;
      field[`${key}Inventory`] = topOrder[key][0]?.inventory_quantity;
      // field[`${key}Title`] =
      //   topOrder[key]?.length <= 1
      //     ? topOrder[key][0]?.title
      //     : topOrder[key][0]?.url.split("/products/")[1].split("?")[0];
      field[`${key}ProductTitle`] = topOrder[key][0]?.product_title;
      field[`${key}Title`] = topOrder[key][0]?.title;
      field[`${key}Availabel`] =
        topOrder[key][0]?.available === "true" ||
        topOrder[key][0]?.available === true
          ? true
          : false;
    }
    topOrder = Object.values(topOrder);
    dispatch(setOrderField(field));
    dispatch(setTopOrderDataCustom(topOrder));
    dispatch(setTopOrderData(topOrder));
  }, [orderData, dispatch, t]);

  const fetchDataAddress = useCallback(async () => {
    const page = Math.ceil(
      parseInt(window?.flitsThemeAppExtensionObjects?.customer?.address_count) /
        parseInt(window?.flitsThemeAppExtensionObjects?.customer?.paginate)
    );

    for (let i = 0; i < page; i++) {
      const response = await API.deliveryaddress.get_data(i + 1);
      const updateResponse = response.filter(
        (item) => item?.id !== defaultAddress?.id
      );
      dispatch(
        addDeliveryAddressData({ response: updateResponse, indexPage: i + 1 })
      );
    }
  }, [dispatch, defaultAddress]);

  const setCountryProvinceData = useCallback(() => {
    const { countries, provinces } = ExtractDataCountry();
    countries.unshift({
      code: "",
      name: t("flits.general.select_country_placeholder", "Select a country"),
    });
    dispatch(setCountryData(countries));
    dispatch(setProvinceData(provinces));
  }, [dispatch, t]);

  const fetchOrderData = useCallback(
    async (totalOrderPages) => {
      let pageArray = [];
      let totalOrderApiCall = 0;
      let ordersLength = 0;
      const ordersAppend = async (orders, pageNumber) => {
        if (orders.length === 0) {
          return;
        }
        ordersLength = ordersLength + orders.length;
        dispatch(addOrderData({ data: orders, pageNumber: pageNumber }));
      };
      const extraOrder = (page) => {
        if (!pageArray.includes(page)) {
          getOrderAjax(page, true);
        }
      };
      const getOrderAjax = (page, check) => {
        pageArray.push(page);
        dispatch(addOrderPageArray(page));
        totalOrderApiCall = totalOrderApiCall + 1;
        API.order.get_data(page).then((response) => {
          totalOrderApiCall = totalOrderApiCall - 1;
          if (response && response.length > 0) {
            ordersAppend(response, page);
            if (check) {
              page++;
              extraOrder(page);
            }
          } else {
            pageArray = pageArray.filter(function (el) {
              return el !== page;
            });
            dispatch(removeOrderPageArray(page));
            // dispatch(setTotalOrderPages(totalOrders / window?.flitsThemeAppExtensionObjects?.customer?.orderPerPageItem));
          }
          if (totalOrderApiCall === 0) {
            SetLocalStorage("total_order_count", ordersLength);
            dispatch(setIsOrderDataLoaded(true));
          }
        });
      };
      const getOrders = (startPage, endPage) => {
        for (let i = startPage; i <= endPage; i++) {
          if (!pageArray.includes(i)) {
            getOrderAjax(i, false);
            if (i === endPage) {
              if (!pageArray.includes(1)) {
                endPage = startPage - 1;
                startPage = 1;
                i = startPage - 1;
              }
            }
          }
        }
      };
      let currentLoadPage = GetLocalStorage("order_page_no");
      if (!currentLoadPage) {
        currentLoadPage = 1;
      }
      getOrderAjax(currentLoadPage, false);
      if (currentLoadPage > totalOrderPages) {
        getOrders(1, currentLoadPage - 1);
        extraOrder(currentLoadPage + 1);
      } else {
        getOrders(1, totalOrderPages);
        extraOrder(totalOrderPages + 1);
      }
    },
    [dispatch]
  );

  const fetchRuleData = useCallback(() => {
    const formData = {
      customer_hash:
        window?.flitsThemeAppExtensionObjects?.customer?.customer_hash,
      theme_id: window?.Shopify?.theme.id,
      token: window?.flitsThemeAppExtensionObjects?.customer?.shop_token,
    };
    API.howtomanagecredit.getRuleData(formData).then((response) => {
      const newData = getRuleFormated(response?.rules?.all_rules_data);
      let hasEarn = false;
      let hasSpent = false;
      for (let i = 0; i < newData.length; i++) {
        if (newData[i].tab_to_append === "flits_earning_rules") {
          hasEarn = true;
        }
        if (newData[i].tab_to_append === "flits_spent_rules") {
          hasSpent = true;
        }
      }
      dispatch(
        setActiveButton(
          hasEarn
            ? "flits_earning_rules"
            : hasSpent
            ? "flits_spent_rules"
            : "flits_from_admin_rules"
        )
      );
      dispatch(setRuleData(newData));
      if (response?.FALLBACK_CAPPED_SPEND_CREDITS_AMOUNT) {
        dispatch(
          setMaxSpentCredit(
            parseFloat(response?.FALLBACK_CAPPED_SPEND_CREDITS_AMOUNT)
          )
        );
      }
    });
  }, [dispatch]);

  const fetchReferData = useCallback(() => {
    API.referfriend.get_data().then((res) => {
      dispatch(setReferFriendData(res));
    });
  }, [dispatch]);

  const fetchDataCustom = useCallback(async () => {
    let custom = {};
    let navigationBuilderItem =
      window?.flitsThemeAppExtensionObjects?.Metafields
        ?.FLITS_EXTENSION_ONSITE_CONTENT_ACCOUNT_PAGE_NAVIGATION;

    const rootUrl = window?.flitsThemeAppExtensionObjects?.routes?.root_url;

    for (let i = 0; i < navigationBuilderItem?.length; i++) {
      if (navigationBuilderItem[i]?.type === "customPage") {
        const path = `https://${window.location.host}${rootUrl}${
          rootUrl.endsWith("/") ? "" : "/"
        }pages/${navigationBuilderItem[i]?.path}${
          navigationBuilderItem[i]?.templateSuffix?.length > 0 ? "" : ".json"
        }`;

        const data = await API.custompage.get(
          path,
          navigationBuilderItem[i]?.templateSuffix
        );
        if (data) custom[navigationBuilderItem[i]?.label[1]] = data;
      }
    }

    dispatch(setCustomPage(custom));
  }, [dispatch]);

  useEffect(() => {
    let last_customer_id = GetLocalStorage("last_customer_id");
    if (
      last_customer_id &&
      last_customer_id !== "" &&
      last_customer_id !==
        window?.flitsThemeAppExtensionObjects?.customer?.customer_id
    ) {
      let Notification = GetLocalStorage("Notification");
      let isCustomPromptAlreadyAllowd = GetLocalStorage(
        "isCustomPromptAlreadyAllowd"
      );
      RemoveMainLocalStorage();
      if (Notification) {
        SetLocalStorage("Notification", Notification);
      }
      if (isCustomPromptAlreadyAllowd) {
        SetLocalStorage(
          "isCustomPromptAlreadyAllowd",
          isCustomPromptAlreadyAllowd
        );
      }
    }
    SetLocalStorage(
      "last_customer_id",
      window?.flitsThemeAppExtensionObjects?.customer?.customer_id
    );
  }, []);

  // contact_posted contact form after submit page load useEffect
  useEffect(() => {
    let contact_posted = Utility.getURLParameter("contact_posted");
    if (contact_posted) {
      window.history.pushState(null, null, "/account#/order");
      dispatch(setDisplayThankYouContactUs(true));
    }
  }, [dispatch]);
  // custom page call
  useEffect(() => {
    if (!customPage) {
      fetchDataCustom();
    }
  }, [fetchDataCustom, customPage]);

  // howtomanagecredit api call
  useEffect(() => {
    if (!ruleData && CheckRequireField(fieldRequire.howtomanagecredit)) {
      fetchRuleData();
    }
  }, [ruleData, fetchRuleData]);

  // country , provice data
  useEffect(() => {
    if (!countryData && !provinceData) {
      setCountryProvinceData();
    }
  }, [setCountryProvinceData, countryData, provinceData]);

  // address api call
  useEffect(() => {
    if (!deliveryAddressData) {
      fetchDataAddress();
    }
  }, [deliveryAddressData, fetchDataAddress]);

  //refer friend api call
  useEffect(() => {
    if (!referFriendData && CheckRequireField(fieldRequire["referFriend"])) {
      fetchReferData();
    }
  }, [fetchReferData, referFriendData]);

  // custom field api call
  useEffect(() => {
    if (CheckRequireField(fieldRequire["profile"])) {
      API.myprofile
        .user_custom_field({
          customer_hash:
            window?.flitsThemeAppExtensionObjects?.customer?.customer_hash,
          currentPage: "account",
          lastProfileUpdated: Date.now(),
        })
        .then((user_custom_field_data) => {
          if (!user_custom_field_data.status) {
            dispatch(setCustomFieldsData([]));
            return;
          }
          const temp = user_custom_field_data?.userCustomFields;
          const temp1 = user_custom_field_data?.customerCustomFieldsValues;
          let user_custom_field = [];

          for (let i = 0; i < temp?.length; i++) {
            const tempHistory = temp1[`${temp[i]?.unique_id}_history`]
              ? temp1[`${temp[i]?.unique_id}_history`][0]
              : {};
            user_custom_field.push({
              ...temp[i],
              ...tempHistory,
              component:
                temp[i]?.type === "numeric"
                  ? "CustomNumberField"
                  : temp[i]?.type === "text"
                  ? "CustomTextField"
                  : temp[i]?.type === "alphanumeric"
                  ? "CustomAlphaNumericField"
                  : temp[i]?.type === "multiline_text"
                  ? "CustomMultiLineField"
                  : temp[i]?.type === "date"
                  ? "CustomDateField"
                  : temp[i]?.type === "time"
                  ? "CustomTimeField"
                  : "CustomFileField",
            });
          }
          setCustomFieldsRequiredStates(
            user_custom_field,
            dispatch,
            setCustomFieldsInitial,
            setCustomFields,
            {
              IsRequiredValidationFailed,
              IsRequiredDateValidationFailed,
              IsRequiredTimeValidationFailed,
            }
          ); // define dynamic states for error
          dispatch(setCustomFieldsData(user_custom_field));
        });
    }
  }, [microFrontEndData, dispatch]);

  // utility api call
  useEffect(() => {
    const interval = setInterval(() => {
      Utility.setupContainer();
    }, 1);
    return () => clearInterval(interval);
  }, []);

  // wishlist api call
  useEffect(() => {
    if (
      CheckRequireField(fieldRequire["wishlist"]) &&
      !wishListData &&
      !apiCallDone
    ) {
      dispatch(setApiCallDone(true));
      API.wishlist.get_data().then((response) => {
        if (!response.status) {
          dispatch(setWishListData([]));
          dispatch(setWishListCount(0));
        } else {
          dispatch(setWishListData(response.data));
          dispatch(setWishListCount(response));
          for (let i = 0; i < response.data.length; i++) {
            API.Shopify.getProductData(
              response.data[i].product_handle,
              t,
              dispatch,
              setDeletedProduct
            ).then((productData) => {
              if (productData) {
                dispatch(
                  setShopifyProuctData({
                    handle: productData.handle,
                    data: productData,
                  })
                );
              }
            });
          }
        }
      });
    }
  }, [wishListData, dispatch, t, apiCallDone]);

  // order api call
  useEffect(() => {
    if (!isOrderAPICalled) {
      setIsOrderAPICalled(true);
      let totalOrderPages = Math.ceil(
        totalOrder /
          window?.flitsThemeAppExtensionObjects?.customer?.orderPerPageItem
      );
      if (
        totalOrder === 0 &&
        window?.flitsThemeAppExtensionObjects?.customer?.orderSize > 0
      ) {
        dispatch(
          setTotalOrder(
            window?.flitsThemeAppExtensionObjects?.customer?.orderSize
          )
        );
        totalOrderPages = Math.ceil(
          window?.flitsThemeAppExtensionObjects?.customer?.orderSize /
            window?.flitsThemeAppExtensionObjects?.customer?.orderPerPageItem
        );
      }
      if (totalOrder > 0) {
        let skeletonOrderCount = 0;
        let totalOrderCount = GetLocalStorage("total_order_count");
        skeletonOrderCount = totalOrder;
        if (totalOrderCount !== undefined) {
          skeletonOrderCount = Math.max(totalOrder, totalOrderCount);
        }
        dispatch(setSkeletonOrderCount(skeletonOrderCount));
      }
      fetchOrderData(totalOrderPages);
    }
  }, [totalOrder, dispatch, isOrderAPICalled, fetchOrderData]);

  // toporder data set
  useEffect(() => {
    if (isOrderDataLoaded && CheckRequireField(fieldRequire["toporder"])) {
      fetchDataTopOrder();
    }
  }, [isOrderDataLoaded, fetchDataTopOrder]);

  // recent view data extract
  useEffect(() => {
    if (CheckRequireField(fieldRequire["recent"]) && !recentlyViewedData) {
      let productHandles = GetLocalStorage("flits_recently_products");
      if (!productHandles || productHandles.length <= 0) {
        dispatch(setRecentlyViewedData([]));
        return;
      }
      dispatch(setRecentlyViewedData(productHandles));
      for (let i = 0; i < productHandles.length; i++) {
        API.Shopify.getProductData(
          productHandles[i].product_handle,
          t,
          dispatch,
          setDeletedProduct
        ).then((productData) => {
          if (productData) {
            dispatch(
              setShopifyProuctData({
                handle: productData.handle,
                data: productData,
              })
            );
          }
        });
      }
    }
  }, [t, dispatch, recentlyViewedData]);

  // credit api call
  useEffect(() => {
    API.credit.get_data().then((credit) => {
      if (!credit.status) {
        dispatch(setFilterCredit([]));
        dispatch(setCreditData({ status: true, customer: { credit_log: [] } }));
        return;
      }
      dispatch(setCreditData(credit));
      dispatch(setFilterCredit(credit?.customer?.credit_log));
      window.creditIdArray = {};
      const creditLog = credit?.customer?.credit_log;
      for (let i = 0; i < creditLog?.length; i++) {
        if (creditLog[i]?.credits > 0) {
          if (creditLog[i]?.rule_id === -2) {
            for (let j = 0; j < creditLog[i]?.metafields?.length; j++) {
              window.creditIdArray[creditLog[i]?.metafields[j]?.rule_id] =
                (window?.creditIdArray?.[
                  creditLog[i]?.metafields[j]?.rule_id
                ] ?? 0) + creditLog[i]?.metafields[j]?.credits;
            }
          }
          window.creditIdArray[creditLog[i]?.rule_id] =
            (window?.creditIdArray?.[creditLog[i]?.rule_id] ?? 0) +
            creditLog[i]?.credits;
        }
      }
    });
  }, [dispatch]);

  const refundApiCall = useCallback(
    (page, per_page) => {
      dispatch(setIsRefundLoading(true));
      API.credit.refund_credit(page ?? 1, per_page ?? 50).then((credit) => {
        if (!credit.status) {
          dispatch(
            setRefundCreditData({ [(per_page / 10) * (page - 1) + 1]: [] })
          );
          dispatch(setCurrentRefundPage(page * 5 - 5));
          dispatch(setIsRefundLoading(false));
          return;
        }
        let excludeLog = { ...credit?.data, ...credit?.pagination };
        if (excludeLog?.refund_credit_logs) {
          delete excludeLog?.refund_credit_logs;
        }
        excludeLog["total_pages"] = Math.ceil(parseInt(excludeLog?.total) / 10);
        let finalData = {};
        for (let i = 1; i <= 5; i++) {
          const start = (i - 1) * 10;
          const end = start + 10;
          if (credit?.data?.refund_credit_logs?.slice(start, end)) {
            finalData[(per_page / 10) * (page - 1) + i] =
              credit?.data?.refund_credit_logs?.slice(start, end);
          } else {
            break;
          }
        }
        dispatch(setRefundCreditApiData(excludeLog));
        dispatch(setRefundCreditData(finalData));
        dispatch(setIsRefundLoading(false));
      });
    },
    [dispatch]
  );

  // refund credit api call
  useEffect(() => {
    if (!refundCreditData) {
      window.refundApiCall = refundApiCall;
      refundApiCall(1, 50);
    }
  }, [refundApiCall, refundCreditData]);
  return (
    <>
      <PageType pageType={props.pageType} />
      <LinearGradient />
    </>
  );
};
