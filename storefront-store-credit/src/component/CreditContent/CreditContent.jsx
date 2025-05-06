import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TotalCredit } from "../TotalCredit/TotalCredit";
import { useState } from "react";
import { EmptyContent } from "./EmptyContent";
import { useCallback } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { handleData } from '../DataEvent/DataEvent';

export const CreditContent = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const Loading = window.UnoDuoComponent("Loading");
  const CreditTotalWrapper =
    window.UnoDuoComponent("CreditTotalWrapper");
  const CreditDetailed = window.UnoDuoComponent("CreditDetailed");
  const CreditDetailedItem = window.UnoDuoComponent("CreditDetailedItem")
  const CreditHistoryContentWrapper =
    window.UnoDuoComponent("CreditHistoryContentWrapper");
  const CreditListLogWrapper =
    window.UnoDuoComponent("CreditListLogWrapper");
  const CreditItemDetail = window.UnoDuoComponent("CreditItemDetail");
  const CustomPagination =
    window.UnoDuoComponent("CustomPagination");
  const creditData = useSelector((state) => state.storeFrontCredit.creditData);
  const filterCredit = useSelector(
    (state) => state.storeFrontCredit.filterCredit
  );
  const dispatch = useDispatch()
  const setFilterCredit = window.creditState("setFilterCredit");
  

  const displayedData = useMemo(() => {
    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 10;
    return Array.isArray(filterCredit) && filterCredit?.length > 0
      ? filterCredit.slice(startIndex, endIndex)
      : [];
  }, [filterCredit, currentPage]);

  const handlePage = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const handleClick = (dataMode) => {
    handleData(creditData, dispatch, setFilterCredit, dataMode)
  }

  useEffect(() => {
    if (!displayedData || displayedData?.length === 0) {
      handlePage(1);
    }
  }, [displayedData, handlePage]);

  if (
    !CustomPagination ||
    !creditData ||
    !CreditItemDetail ||
    !CreditListLogWrapper ||
    !CreditHistoryContentWrapper ||
    !CreditTotalWrapper
  ) {
    return (
      <>
        <Loading />
      </>
    );
  }

  if (
    creditData &&
    creditData.status &&
    creditData?.customer?.credit_log?.length === 0
  ) {
    return <EmptyContent />;
  }
  return (
    <>
      <CreditTotalWrapper handleData={handleClick}>
        <TotalCredit creditData={creditData} />
      </CreditTotalWrapper>
      <CreditHistoryContentWrapper>
        <CreditListLogWrapper>
          {displayedData?.length > 0 &&
            displayedData.map((item) => (
              <CreditItemDetail item={item}>
                <CreditDetailed metafield={item?.metafields}>
                  {item?.metafields?.map(( metafield, index) => <CreditDetailedItem key={index} item={metafield}/>)}
                </CreditDetailed>
              </CreditItemDetail>
            ))}
        </CreditListLogWrapper>
      </CreditHistoryContentWrapper>
      <CustomPagination
        data={filterCredit}
        itemsPerPage={10}
        changePage={handlePage}
        defaultPage={currentPage}
      />
    </>
  );
};
