import React from "react";
import { TopOrderProduct } from "../TopOrderProduct/TopOrderProduct";
import { useSelector } from "react-redux";
import { TopOrderProductDuo } from "../TopOrderProductDuo/TopOrderProductDuo";

export const TopOrderProductPage = (props) => {

  const TopOrderProductContentWrapper =
    window.UnoDuoComponent("TopOrderProductContentWrapper");

  const microFrontEndData = useSelector(
    (state) => state.storeFrontContainer.microFrontEndData
  );

  if (
    !TopOrderProductContentWrapper 
  ) {
    return null;
  }

  return (
      <TopOrderProductContentWrapper>
        {microFrontEndData?.accountSettings?.template === 2 ? (
          <TopOrderProductDuo />
        ) : (
          <TopOrderProduct />
        )}
      </TopOrderProductContentWrapper>
  );
};
