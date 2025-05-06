import { useDispatch } from "react-redux";
import { setReferralData } from "../../../../../redux/reducer/rewardWidgetSlice";
import { apiCallTrackingHeader } from "./apiCallTrackingHeader";

export const useReferralData = () => {
  const dispatch = useDispatch();
  const getReferralData = async (props) => {
    try {
      const apiData = JSON.parse(localStorage.getItem("rewardWidgetApiCall"));
      if (apiData?.referDetail) {
        return;
      }
      localStorage.setItem(
        "rewardWidgetApiCall",
        JSON.stringify(
          apiData ? { ...apiData, referDetail: true } : { referDetail: true }
        )
      );
      let requestOptions = {
        method: "GET",
        headers: apiCallTrackingHeader,
        redirect: "follow",
      };
      let result = await fetch(
        `${window.location.origin}${window.flitsThemeAppExtensionObjects?.base_url}/${window.flitsThemeAppExtensionObjects.customer.customer_id}/refer_friend/get_referral_data?token=${window.flitsThemeAppExtensionObjects.token}&customer_hash=${window.flitsThemeAppExtensionObjects.customerHash}`,
        requestOptions
      );
      let resultJson = await result.json();
      dispatch(setReferralData(resultJson));
    } catch (error) {
      dispatch(setReferralData(error.message));
    }
  };
  return { getReferralData };
};
