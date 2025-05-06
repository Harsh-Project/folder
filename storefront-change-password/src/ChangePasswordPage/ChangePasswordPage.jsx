import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useSelector } from "react-redux";
import { ChangePasswordFormComponent } from '../ChangePasswordFormComponent/ChangePasswordFormComponent';

const componentMap = {
  ChangePasswordFormComponent,
};

export const ChangePasswordPage = (props) => {
  const getStore = GlobalStore.Get();
  const microFrontEndData = useSelector(
    (state) => state.storeFrontContainer.microFrontEndData
  );
  const passwordJsonTemplate =  microFrontEndData?.microfront_remotes?.remotes?.storeFrontChangePassword?.jsonTemplate;

  const RemoteAppHandler =
    getStore._globalActions.storeFrontContainer[0].RemoteAppHandler;
  const ChangePasswordContentWrapper = window.UnoDuoComponent("ChangePasswordContentWrapper");

  if (
    !ChangePasswordContentWrapper ||
    !ChangePasswordFormComponent 
  ) {
    return null;
  }

  return (
      <ChangePasswordContentWrapper>
        {passwordJsonTemplate.map((item1, index) => {
          if (item1?.renderType === "local") {
            const DynamicComponent = componentMap[item1.component];
            if (!DynamicComponent) {
              return null;
            }
            return <DynamicComponent item={item1} key={index} />;
          } else {
            return <RemoteAppHandler remoteApp={item1.component} />;
          }
        })}
      </ChangePasswordContentWrapper>
  );
};
