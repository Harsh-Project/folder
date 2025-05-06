import { useDispatch } from "react-redux";
import { setReferralData } from "../../../../../redux/reducer/rewardPageSlice";
import { apiCallTrackingHeader } from "./apiCallTrackingHeader";

export const useReferralData = () => {
  const dispatch = useDispatch();
  const getReferralData = async (props) => {
    try {
      let requestOptions = {
        method: "GET",
        redirect: "follow",
        headers: apiCallTrackingHeader,
      };
      let result = await fetch(
        `${window.location.origin}${window.flitsRewardPageObjects?.base_url}/${window.flitsRewardPageObjects.customerId}/refer_friend/get_referral_data?token=${window.flitsRewardPageObjects.token}&customer_hash=${window.flitsRewardPageObjects.customerHash}`,
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
