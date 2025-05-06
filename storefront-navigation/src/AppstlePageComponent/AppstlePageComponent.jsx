import React, { useEffect, useState } from "react";

export const AppstlePageComponent = (props) => {
    const [isAppstleLoaded, setIsAppstleLoaded] = useState(false);
    const appstlePageDiv = '<div class="AppstleCustomerPortal"></div><div class="flits-loading-div flits-appstle-loader flits-without-boxshadow"><div class="flits-spinner"></div></div>';
    const CustomPageWrapper =
      window.UnoDuoComponent("CustomPageWrapper");
    const NavigationTotalWrapper =
      window.UnoDuoComponent("NavigationTotalWrapper");
    const Loading = window.UnoDuoComponent("Loading");
    useEffect(() => {
      console.log("Appstle useeffect",window.appstleSubscriptionCustomerPortalInit, isAppstleLoaded);
      if(!window.appstleSubscriptionCustomerPortalInit){
        return;
      }
      if(isAppstleLoaded){
        return;
      }
      setTimeout(() => {
        setIsAppstleLoaded(true);
        window.appstleSubscriptionCustomerPortalInit(".AppstleCustomerPortal");
      },1000);
    },[isAppstleLoaded]);

    return (
        <NavigationTotalWrapper>
          <CustomPageWrapper {...props}>
            {!isAppstleLoaded ? <Loading /> : <></> }
            <div
              dangerouslySetInnerHTML={{
                __html: appstlePageDiv,
              }}
            />
          </CustomPageWrapper>
        </NavigationTotalWrapper>
      );
}