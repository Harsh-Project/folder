import React from "react";
import { NonEditModeProfile } from "../GeneralFunction/NonEditModeProfile";

export const RouteWrapper = (props) => {
  const { item } = props;
  const BackButtonComponent = window.UnoDuoComponent("BackButtonComponent");
  const NavigationTotalWrapper = window.UnoDuoComponent(
    "NavigationTotalWrapper"
  );
  const BackButtonWrapper = window.UnoDuoComponent("BackButtonWrapper");
  return (
    <NavigationTotalWrapper
      {...item}
      item={item}
      notNeedWrapper={
        item?.remoteApp === "storeFrontTopOrderedProducts" ? true : false
      }
      notNeedBoxShadow={
        item?.remoteApp === "storeFrontMyProfile" ||
        item?.remoteApp === "storeFrontDeliveryAddress"
          ? true
          : false
      }
      needMR={item?.remoteApp === "storeFrontMyProfile" ? true : false}
      boundary={item?.remoteApp === "storeFrontOrder" ? true : false}
    >
      {BackButtonWrapper ? (
        <BackButtonWrapper>
          <BackButtonComponent {...item} />
        </BackButtonWrapper>
      ) : null}
      {item?.remoteApp !== "storeFrontMyProfile" ? (
        <NonEditModeProfile />
      ) : null}
      {props?.children}
    </NavigationTotalWrapper>
  );
};
