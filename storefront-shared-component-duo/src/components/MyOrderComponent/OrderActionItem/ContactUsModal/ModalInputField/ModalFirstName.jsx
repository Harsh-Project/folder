import React, { Suspense } from "react";
import { ModalInputField } from './ModalInputField';

export const ModalFirstName = (props) => {
  return (
    <Suspense fallback={<></>}>
      <ModalInputField {...props} />
    </Suspense>
  );
};
