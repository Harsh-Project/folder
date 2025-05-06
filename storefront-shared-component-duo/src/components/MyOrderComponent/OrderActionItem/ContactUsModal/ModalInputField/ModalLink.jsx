import React, { Suspense } from "react";
import { ModalInputField } from './ModalInputField';

export const ModalLink = (props) => {
  return (
    <Suspense fallback={<></>}>
      <ModalInputField {...props} />
    </Suspense>
  );
};
