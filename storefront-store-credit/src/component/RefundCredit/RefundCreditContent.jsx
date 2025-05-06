import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RefundEmptyContent } from "./RefundEmptyContent";
import { useCallback } from "react";
import { useEffect } from "react";

export const RefundCreditContent = () => {
  const dispatch = useDispatch();
  const microFrontEndData = useSelector(
    (state) => state.storeFrontContainer.microFrontEndData
  );
  const Loading = window.UnoDuoComponent("Loading");
  const RefundCreditDetailed = window.UnoDuoComponent("RefundCreditDetailed");
  const RefundCreditTotalWrapper = window.UnoDuoComponent(
    "RefundCreditTotalWrapper"
  );
  const RefundCreditHistoryContentWrapper = window.UnoDuoComponent(
    "RefundCreditHistoryContentWrapper"
  );
  const RefundCreditHeader = window.UnoDuoComponent("RefundCreditHeader");
  const RefundCreditDetailedItem = window.UnoDuoComponent(
    "RefundCreditDetailedItem"
  );
  const RefundCreditContentWrapper = window.UnoDuoComponent(
    "RefundCreditContentWrapper"
  );
  const RefundCreditListLogWrapper = window.UnoDuoComponent(
    "RefundCreditListLogWrapper"
  );
  const RefundCreditItemDetail = window.UnoDuoComponent(
    "RefundCreditItemDetail"
  );
  const CustomPagination = window.UnoDuoComponent("CustomPagination");

  const {
    refundCreditData,
    currentRefundPage,
    isRefundLoading,
    refundCreditApiData,
  } = useSelector((state) => state.storeFrontCredit);
  const setCurrentRefundPage = window.creditState("setCurrentRefundPage");

  const displayedData = refundCreditData[currentRefundPage];

  const handlePage = useCallback(
    (page) => {
      dispatch(setCurrentRefundPage(page));
    },
    [dispatch, setCurrentRefundPage]
  );

  useEffect(() => {
    if (
      currentRefundPage <= refundCreditApiData?.total_pages &&
      (!displayedData || displayedData?.length === 0) &&
      !isRefundLoading
    ) {
      window.refundApiCall(Math.ceil(parseFloat(currentRefundPage / 5)), 50);
    }
  }, [
    currentRefundPage,
    displayedData,
    refundCreditApiData?.total_pages,
    isRefundLoading,
  ]);

  if (
    !Loading ||
    !RefundCreditDetailed ||
    !RefundCreditDetailedItem ||
    !RefundCreditContentWrapper ||
    !RefundCreditListLogWrapper ||
    !RefundCreditItemDetail ||
    !CustomPagination
  ) {
    return null;
  }

  if (!refundCreditData) {
    return <Loading />;
  }

  if (refundCreditData && refundCreditData[1]?.length === 0) {
    return <RefundEmptyContent />;
  }
  return (
    <>
      {microFrontEndData?.accountSettings?.template === 2 ? (
        <RefundCreditTotalWrapper />
      ) : null}
      <RefundCreditHeader
        refundCredit={refundCreditApiData?.current_refund_credits}
      />
      {!isRefundLoading ? (
          <RefundCreditHistoryContentWrapper>
            <RefundCreditListLogWrapper>
              {displayedData?.length > 0 &&
                displayedData.map((item) => (
                  <RefundCreditItemDetail key={item?.id} item={item}>
                    <RefundCreditDetailed metafield={item?.metafields}>
                      {item?.metafields?.map((metafield, index) => (
                        <RefundCreditDetailedItem
                          key={`${item?.id}_${index}`}
                          item={metafield}
                        />
                      ))}
                    </RefundCreditDetailed>
                  </RefundCreditItemDetail>
                ))}
            </RefundCreditListLogWrapper>
          </RefundCreditHistoryContentWrapper>
      ) : (
        <Loading position={"relative"} />
      )}
      <CustomPagination
        data={refundCreditApiData?.total_pages}
        itemsPerPage={10}
        changePage={handlePage}
        defaultPage={currentRefundPage}
      />
    </>
  );
};
