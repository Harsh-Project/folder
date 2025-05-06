import React from "react";
import Pagination from "@mui/material/Pagination";

const paginationClass = {
  display: "flex",
  justifyContent: "center",
  WebkitBoxAlign: "center",
  MsFlexAlign: "center",
  alignItems: "center",
  width: "100%",
  marginTop: "25px",
};

export const CustomPagination = ({ data, itemsPerPage, changePage, defaultPage }) => {
  const handlePageChange = (event, newPage) => {
    changePage(newPage);
  };

  if (typeof data === "number" && data <= 1) {
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
          page={!defaultPage ? 1 : defaultPage}
          variant="outlined"
          shape="rounded"
          onChange={handlePageChange}
          sx={{
            "& .MuiPaginationItem-previousNext, & .MuiPaginationItem-previousNext:hover":
              {
                cursor: "pointer",
                minHeight: "14px",
                outline: "0",
                border: "none",
                verticalAlign: "baseline",
                textTransform: "none",
                textShadow: "none",
                fontWeight: "700",
                fontStyle: "normal",
                textAlign: "center",
                textDecoration: "none",
                WebkitUserSelect: "none",
                MozUserSelect: "none",
                MsUserSelect: "none",
                userSelect: "none",
                willChange: '""',
                WebkitTapHighlightColor: "transparent",
                transition: ".3s all",
                margin: "0",
                fontFamily: "inherit",
                borderRadius: "0",
                fontSize: "16px",
                width: "30px",
                height: "30px",
                padding: "0",
                lineHeight: "1.3!important",
                background: "var(--navigationBGColor)",
                color: "var(--navigationTextColor)",
                display: "flex!important",
                alignItems: "center",
                justifyContent: "center",
              },
            "& .MuiPaginationItem-previousNext svg": {
              width: "20px",
              height: "20px",
            },
            "& .MuiPaginationItem-previousNext.Mui-disabled": {
              opacity: "0.5",
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
              fontSize: "16px",
              WebkitBoxPack: "center",
              MsFlexPack: "center",
              justifyContent: "center",
              cursor: "pointer",
              margin: "0 3px!important",
              padding: "0!important",
              border: "1px solid var(--navigationBGColor)",
              color: "var(--navigationBGColor)"
            },
            "& .MuiPaginationItem-page.Mui-selected, & .MuiPaginationItem-ellipsis.Mui-selected":
              {
                background: "var(--navigationBGColor)",
                color: "var(--navigationTextColor)",
                "&:hover": {
                  color: "var(--navigationTextColor)",
                  background: "var(--navigationBGColor)"
                }
              },
          }}
        />
      </div>
    </>
  );
};
