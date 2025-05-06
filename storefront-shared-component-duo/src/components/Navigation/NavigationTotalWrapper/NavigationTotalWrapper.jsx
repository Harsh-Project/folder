import React, { Suspense } from "react";
import { NavigationWithBoundary } from "./NavigationWithBoundary";
import { NavigationWithOutBoundary } from  "./NavigationWithOutBoundary"

export const NavigationTotalWrapper = (props) => {
  if (
    props?.remoteApp === "storeFrontMyProfile" ||
    props?.remoteApp === "storeFrontChangePassword" ||
    props?.remoteApp === "storeFrontTopOrderedProducts" ||
    props?.remoteApp === "storeFrontDeliveryAddress"
  ) {
    return (
      <Suspense fallback={<></>}>
        <NavigationWithBoundary {...props} />
      </Suspense>
    );
  }
  return (
    <Suspense fallback={<></>}>
      <NavigationWithOutBoundary {...props} />
    </Suspense>
  );
};
