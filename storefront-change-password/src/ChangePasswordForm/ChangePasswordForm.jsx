import React from "react";
import { ChangePasswordFormComponent } from "../ChangePasswordFormComponent/ChangePasswordFormComponent";
import { useSelector } from "react-redux";

const componentMap = {
  ChangePasswordFormComponent,
};

export const ChangePasswordForm = () => {
  const microFrontEndData = useSelector(
    (state) => state.storeFrontContainer.microFrontEndData
  );

  if (!microFrontEndData) {
    return null;
  }
  return microFrontEndData?.microfront_remotes?.storeFrontChangePassword?.jsonTemplate?.map(
    (item1, index) => {
      const DynamicComponent = componentMap[item1.component];

      if (item1?.renderType === "local") {
        return <DynamicComponent item={item1} key={index} />;
      }

      return null;
    }
  );
};
