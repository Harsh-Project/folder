import React, { Suspense } from "react";
import { ModalInputField } from "./ModalInputField";

export const ModalLastName = (props) => {
  return (
    <Suspense fallback={<></>}>
      <ModalInputField {...props} />
    </Suspense>
  );
};
