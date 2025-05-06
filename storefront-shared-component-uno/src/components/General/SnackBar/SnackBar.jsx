import React, { Suspense } from "react";
import { ProcessingSnackBar } from './ProcessingSnackBar';
import { SuccessSnackBar } from './SucessSnackBar';
import { ErrorSnackBar } from './ErroSnackBar';
import { InfoSuccess } from './InfoSuccess';
import { WishListAdd } from './WishListAdd';

export const SnackBar = (props) => {
  if (props?.mode === "processing" || props?.mode === "information") {
    return (
      <Suspense fallback={<></>}>
        <ProcessingSnackBar {...props} />
      </Suspense>
    );
  }

  if (props?.mode === "success") {
    return (
      <Suspense fallback={<></>}>
        <SuccessSnackBar {...props} />
      </Suspense>
    );
  }

  if (props?.mode === "error") {
    return (
      <Suspense fallback={<></>}>
        <ErrorSnackBar {...props} />
      </Suspense>
    );
  }

  if (props?.mode === "successInfo") {
    return (
      <Suspense fallback={<></>}>
        <InfoSuccess {...props} />
      </Suspense>
    );
  }

  if (props?.mode === "wishlist") {
    return (
      <Suspense fallback={<></>}>
        <WishListAdd {...props} />
      </Suspense>
    );
  }

  return null;
};
