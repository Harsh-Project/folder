import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SetupReferalCodeInRegisterForm } from "../Helpers/SetupReferalCodeInRegisterForm";

function ReferFriendRegisterPage(){
    const referalRegisterPage = useSelector(
      (state) => state.storeFrontContainer.referalRegisterPage
    );
    const dispatch = useDispatch();
    const ReferMessageModal =
    window.UnoDuoComponent("ReferMessageModal");
    const setReferalRegisterPage = window.containerState("setReferalRegisterPage");

    const closeEvent = () => {
        dispatch(setReferalRegisterPage({
            isNeedToShowPopup: false,
            }));
    }

    useEffect(() => {
        if(referalRegisterPage.referralCode){
            SetupReferalCodeInRegisterForm(referalRegisterPage.referralCode);
        }
    },[referalRegisterPage]);
    return (
        <>
        {referalRegisterPage.isNeedToShowPopup && (
          <ReferMessageModal
          name={referalRegisterPage.inviterName}
          closeEvent={closeEvent}
          />
        )}
        </>
    );
}

export default ReferFriendRegisterPage;