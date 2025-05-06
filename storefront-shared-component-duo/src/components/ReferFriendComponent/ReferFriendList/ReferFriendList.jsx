import React, { Suspense } from "react";
import { ReferFriendDetail } from "../ReferFriendDetail/ReferFriendDetail";

export const ReferFriendList = ({ referData }) => {
  if (!referData) {
    return null;
  }
  return (
    <Suspense fallback={<></>}>
      <ReferFriendDetail item={referData} />
    </Suspense>
  );
};
