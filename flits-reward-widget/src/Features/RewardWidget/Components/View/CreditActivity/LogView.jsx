import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LogEmptyView from "../../Atoms/LogEmptyView/LogEmptyView";
import { setPagesViewClicks } from "../../../../../redux/reducer/rewardWidgetSlice";
import { MoneyFormat } from "../../Helpers/MoneyFormet";

const LogView = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const pageNeighbours = 1; // Number of adjacent pages to display

  const creditHandle = props.creditHandle;
  const creditData = useSelector((state) => state.rewardWidget[creditHandle]);
  const pagesViewClicks = useSelector(
    (state) => state.rewardWidget.pagesViewClicks
  );

  const creditLog = creditData?.customer?.credit_log;
  const { adminT } =
    window?.flitsThemeAppExtensionObjects?.useTranslationLanguage;
  const dispatch = useDispatch();

  const rewardViewClick = () => {
    dispatch(
      setPagesViewClicks({
        ...pagesViewClicks,
        defaultView: props?.creditHandle !== "creditData" ? true : false,
        earningView: props?.creditHandle === "creditData" ? true : false,
        redeemView: false,
        howItWorksView: false,
        cractivityView: false,
        referRuleView: false,
        fromReferView: props?.creditData !== "creditData" ? true : false,
      })
    );
  };

  let empty_head =
    props?.creditHandle === "creditData"
      ? adminT(
          "points_activity.credit_activity_section_empty_title",
          "No reward history"
        )
      : adminT(
          "points_activity.referral_activity_section_empty_title",
          "No referral history"
        );
  let empty_subhead =
    props?.creditHandle === "creditData"
      ? adminT(
          "points_activity.credit_activity_section_empty_subtitle",
          "You haven't earned any rewards yet"
        )
      : adminT(
          "points_activity.referral_activity_section_empty_subtitle",
          "You haven't made any referrals yet"
        );

  let empty_link_text =
    props?.creditHandle === "creditData"
      ? adminT(
          "points_activity.credit_activity_section_empty_link_text",
          "Start collecting rewards"
        )
      : adminT(
          "points_activity.referral_activity_section_empty_link_text",
          "Make a referral"
        );
  if (!creditLog || creditLog?.length === 0) {
    return (
      <LogEmptyView
        langConfig={{
          empty_head: empty_head,
          empty_subhead: empty_subhead,
          empty_link: `${
            window?.commonEndpoint?.collection ?? ""
          }/collections/all`,

          empty_link_text: empty_link_text,
        }}
        emptyHandle={creditHandle}
        backButtonClick={props.backButtonClick}
        icon={window?.flits_icons?.flits?.icons?.credit_log_empty}
        rewardViewClick={rewardViewClick}
      />
    );
  }

  // Calculate total number of pages
  const totalPages = Math.ceil(creditLog.length / itemsPerPage);

  // Get the current page of items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = creditLog.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to generate array of page numbers
  const range = (from, to) => {
    return Array.from({ length: to - from + 1 }, (_, i) => from + i);
  };

  // Pagination items
  const paginationItems = () => {
    const startPage = Math.max(1, currentPage - pageNeighbours);
    const endPage = Math.min(totalPages, currentPage + pageNeighbours);
    let items = range(startPage, endPage);

    // Add the first and last page numbers
    if (startPage > 1) {
      items = [1, "...", ...items];
    }
    if (endPage < totalPages) {
      items = [...items, "...", totalPages];
    }

    return items;
  };

  return (
    <div className="flits-widget-credit-log-pagination flits-fadeslideIn-animation">
      {currentItems.map((item) => (
        <div key={item.id} className="flits-widget-credit-log-box">
          <div className="flits-widget-credit-log-box-left">
            <h2>{item.comment}</h2>
            <p
              dangerouslySetInnerHTML={{
                __html: `${
                  !item.credits.toString().includes("-") ? "+" : "-"
                }${MoneyFormat(Math.abs(item.credits) / 100)}`,
              }}
            ></p>
          </div>
          <div className="flits-widget-credit-log-box-right">
            {item.created_at}
          </div>
        </div>
      ))}

      {/* Pagination controls */}
      <ul className="flits-widget-pagination" rel={`pages-${totalPages}`}>
        {paginationItems().map((page, index) => (
          <li
            key={index}
            className={`page-item ${
              currentPage === page || page === "..." ? "active" : ""
            }`}
          >
            {page === "..." ? (
              <span>{page}</span>
            ) : (
              <button
                className="page-link"
                onClick={() =>
                  typeof page === "number" && handlePageChange(page)
                }
              >
                {page}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LogView;
