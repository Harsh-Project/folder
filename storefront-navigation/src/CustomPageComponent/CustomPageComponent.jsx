import { GlobalStore } from "redux-micro-frontend";
import React from "react";
import { useSelector } from "react-redux";

export const CustomPageComponent = (props) => {
  const getStore = GlobalStore.Get();
  const API = getStore._globalActions.API[0].API;
  const CustomPageWrapper =
    window.UnoDuoComponent("CustomPageWrapper");

  const customPage = useSelector(
    (state) => state.storeFrontContainer.customPage
  );

  if (!customPage || !API) {
    return null;
  }

  return (
    <CustomPageWrapper {...props}>
      <div
        dangerouslySetInnerHTML={{
          __html: customPage[props?.label[1]],
        }}
      />
    </CustomPageWrapper>
  );
};
