import { useDispatch } from "react-redux";
import { setSubscriptionResponse } from "../../../../../redux/reducer/rewardPageSlice";
import { apiCallTrackingHeader } from './apiCallTrackingHeader';

export const useGeneralSubscriptionSave = () => {
  const dispatch = useDispatch();
  const generalSubscriptionSave = async (props) => {
    try {
      let formdata = new FormData();
      formdata.append("token", window.flitsRewardPageObjects.token);
      formdata.append(
        "customer_hash",
        window.flitsRewardPageObjects.customerHash
      );
      formdata.append("accepts_marketing", true);
      formdata.append("credit_subject", "subscribe");
      let requestOptions = {
        method: "POST",
        redirect: "follow",
        headers: apiCallTrackingHeader,
        body: formdata,
      };
      let result = await fetch(
        `${window.location.origin}${window.flitsRewardPageObjects?.base_url}/${window.flitsRewardPageObjects.customerId}/general_subscription_save`,
        requestOptions
      );
      let resultJson = await result.json();
      dispatch(setSubscriptionResponse(resultJson));
      return resultJson;
    } catch (error) {
      dispatch(setSubscriptionResponse(error.message));
    }
  };
  return { generalSubscriptionSave };
};
