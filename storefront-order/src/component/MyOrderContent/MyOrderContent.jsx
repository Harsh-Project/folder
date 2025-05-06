import { GlobalStore } from "redux-micro-frontend";
import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { GenerateLoadingItems } from "./Helpers/GenerateLoadingItems";
import { Form } from "../Form/Form";
import { handleReOrder } from "../Event/ReOrder";
import { EmptySvg } from "./EmptySvg";

export const MyOrderContent = (props) => {
  const getStore = GlobalStore.Get();
  const GetLocalStorage = getStore._globalActions.Helpers[0].GetLocalStorage;
  let defaultPage = GetLocalStorage("order_page_no");
  if (!defaultPage) {
    defaultPage = 1;
  }
  const [currentPage, setCurrentPage] = useState(defaultPage);
  // const microFrontEndData = useSelector(
  // (state) => state.storeFrontContainer.microFrontEndData
  // );
  const SetLocalStorage = getStore._globalActions.Helpers[0].SetLocalStorage;
  // const totalOrder = useSelector((state) => state.storeFrontOrder.totalOrder);
  // const skeletonOrderCount = useSelector((state) => state.storeFrontOrder.skeletonOrderCount);
  const orderPageArray = useSelector(
    (state) => state.storeFrontOrder.orderPageArray
  );
  // const totalOrderPages = useSelector((state) => state.storeFrontOrder.totalOrderPages);
  const orderPageData = useSelector(
    (state) => state.storeFrontOrder.orderPageData
  );
  const orderData = useSelector((state) => state.storeFrontOrder.orderData);
  const form = useSelector((state) => state.storeFrontOrder.form);
  const isOrderPageLoaded = useSelector(
    (state) => state.storeFrontOrder.isOrderPageLoaded
  );
  const isOrderDataLoaded = useSelector(
    (state) => state.storeFrontOrder.isOrderDataLoaded
  );
  const CustomPagination =
    window.UnoDuoComponent("CustomPagination");
    const API = getStore._globalActions.API[0].API
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;
  const OrderCard = window.UnoDuoComponent("OrderCard");
  const MyOrderListWrapper =
    window.UnoDuoComponent("MyOrderListWrapper");
  const SkeletonOrder = window.UnoDuoComponent("SkeletonOrder");
  const Empty = window.UnoDuoComponent("Empty");
  const { t } = useTranslationLanguage();

  // const startIndex = (currentPage - 1) * window?.flitsThemeAppExtensionObjects?.customer?.orderPerPageItem;
  // const endIndex = startIndex + window?.flitsThemeAppExtensionObjects?.customer?.orderPerPageItem;
  let displayedData = [];

  if (isOrderPageLoaded[currentPage]) {
    displayedData = orderPageData[currentPage];
  }
  if (displayedData.length === 0) {
    displayedData = GenerateLoadingItems(
      window?.flitsThemeAppExtensionObjects?.customer?.orderPerPageItem
    );
  }
  const handlePage = (page) => {
    SetLocalStorage("order_page_no", page);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClick = (setMessage, item, setSnackBarMode) => {
    let allData = item
    handleReOrder({ setMessage, allData, setSnackBarMode, API, t, GetLocalStorage, SetLocalStorage });
  };

  if (isOrderDataLoaded && orderData?.length === 0) {
    return (
      <Empty
        message1={t("flits.order_page.blank_screen_line_1_html", "You haven't placed any orders yet.<br>We can't wait to have you as a customer.")}
        message2={t("flits.order_page.blank_screen_line_2_html", "Take a look at our products here")}
        svgProp={EmptySvg}
        shopNowButton={t("flits.order_page.blank_screen_button_text", "View collection")}
      />
    );
  }
  return (
    <>
      <MyOrderListWrapper>
        {displayedData?.length > 0 &&
          displayedData.map((item, index) => {
            if (item.isLoading) {
              return <SkeletonOrder key={index} />;
            } else {
              return (
                <>
                  <OrderCard
                    key={index}
                    item={item}
                    handleReOrder={handleClick}
                  />
                  {form === item?.order_id && <Form item={item} key={index}/>}
                </>
              );
            }
          })}
      </MyOrderListWrapper>
      <CustomPagination
        data={Math.max(...orderPageArray)}
        itemsPerPage={
          window?.flitsThemeAppExtensionObjects?.customer?.orderPerPageItem
        }
        defaultPage={defaultPage}
        changePage={handlePage}
      />
    </>
  );
};
