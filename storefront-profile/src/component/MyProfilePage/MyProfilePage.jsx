import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import { MyProfileForm } from "../MyProfileForm/MyProfileForm";

import { useState } from "react";
import { useSelector } from "react-redux";
import { Suspense } from "react";

const componentMap = {
  MyProfileForm
}

export const MyProfilePage = (props) => {
  const getStore = GlobalStore.Get();
  const microFrontEndData = useSelector((state) => state.storeFrontContainer.microFrontEndData);
  // eslint-disable-next-line no-unused-vars
  const [profileJsonTemplate, setProfileJsonTemplate] = useState(microFrontEndData?.microfront_remotes?.remotes?.storeFrontMyProfile?.jsonTemplate);

  const  RemoteAppHandler = getStore._globalActions.storeFrontContainer[0].RemoteAppHandler;
  const MyProfileContentWrapper =
    window.UnoDuoComponent("MyProfileContentWrapper");
  const LoadingWithOutShadow = window.UnoDuoComponent("LoadingWithOutShadow");

  if (
    !MyProfileContentWrapper ||
    !MyProfileForm
  ) {
    return null;
  }

  return (
    <Suspense fallback={<LoadingWithOutShadow />}>
      <MyProfileContentWrapper>
        {
          profileJsonTemplate.map((item1, index) => {
            if (item1?.renderType === "local") {
              const DynamicComponent = componentMap[item1.component];
              if (!DynamicComponent) {
                return null;
              }
              return <DynamicComponent item={item1} key={index} />
            }else{
              return <RemoteAppHandler
              remoteApp={item1.component}
            />
            }
          })
        }
      </MyProfileContentWrapper>
      </Suspense>
  );
};
