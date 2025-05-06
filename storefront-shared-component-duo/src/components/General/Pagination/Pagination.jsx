import React from "react";
import Pagination from "@mui/material/Pagination";
import { GlobalStore } from "redux-micro-frontend";

const paginationClass = {
  display: "inline-flex",
  WebkitBoxAlign: "center",
  MsFlexAlign: "center",
  alignItems: "center",
  background: "#fff",
  borderRadius: "10px",
  marginTop: "15px",
  border: "1px solid #f0f2f7",
  overflow: "hidden",
  float: "right",
};

export const CustomPagination = (props) => {
  const getStore = GlobalStore.Get();
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage()
  const data = props.data;
  const itemsPerPage = props.itemsPerPage;
  const changePage = props.changePage;
  const defaultPage = props.defaultPage ? props.defaultPage : 1;
  const handlePageChange = (event, newPage) => {
    changePage(newPage);
  };

  if(typeof data === "number" && data <= 1) {
    return null;
  }

  if (typeof data === "object" && Math.ceil(data?.length / itemsPerPage) <= 1) {
    return null;
  }

  return (
    <>
      <div style={paginationClass}>
        <Pagination
          count={
            typeof data === "number"
              ? data
              : Math.ceil(data?.length / itemsPerPage)
          }
          page={defaultPage}
          variant="outlined"
          shape="rounded"
          onChange={handlePageChange}
          sx={{
            "& .MuiPaginationItem-root": {
              border: "none",
              margin: "0",
            },
            "& .MuiPaginationItem-page, & .MuiPaginationItem-ellipsis": {
              borderRadius: "0",
              height: "30px",
              width: "30px",
              textAlign: "center",
              lineHeight: "1.3",
              display: "-webkit-box",
              WebkitBoxAlign: "center",
              fontFamily: "inherit",
              MsFlexAlign: "center",
              alignItems: "center",
              WebkitBoxPack: "center",
              MsFlexPack: "center",
              justifyContent: "center",
              fontSize: "14px",
              cursor: "pointer",
              margin: "0 !important",
              padding: "0!important",
              borderLeft: "1px solid #f0f2f7",
            },
            "& .MuiPagination-ul li:last-child button": {
              borderLeft: "1px solid #f0f2f7",
              borderRadius: "0",
              padding: "5px 10px",
            },
            "& .MuiPagination-ul li:first-of-type button": {
              padding: "5px 10px",
            },
            "& .MuiPaginationItem-page.Mui-selected, & .MuiPaginationItem-ellipsis.Mui-selected":
              {
                background: "#606060",
                color: "white",
                "&:hover": {
                  background: "#606060",
                  color: "white",
                },
              },
            "& .MuiPaginationItem-icon": {
              display: "none",
            },
            "& .MuiPagination-ul li:first-of-type button::before": {
              fontSize: "14px",
              content: `"${t("flits.buttons.previous", "Previous")}"`,
            },
            "& .MuiPagination-ul li:last-child button::before": {
              fontSize: "14px",
              content: `"${t("flits.buttons.next", "Next")}"`,
            },
          }}
        />
      </div>
    </>
  );
};
