import { useDispatch } from "react-redux";
import { setCustomerCreditRules } from "../../../../../redux/reducer/rewardPageSlice";
import { apiCallTrackingHeader } from "./apiCallTrackingHeader";

export const useRules = () => {
  const dispatch = useDispatch();
  const getRules = async (props) => {
    try {
      let formdata = new FormData();
      formdata.append("token", window.flitsRewardPageObjects.token);
      formdata.append(
        "customer_hash",
        window.flitsRewardPageObjects.customerHash
      );
      let requestOptions = {
        method: "POST",
        redirect: "follow",
        headers: apiCallTrackingHeader,
        body: formdata,
      };
      let result = await fetch(
        `${window.location.origin}${window.flitsRewardPageObjects?.base_url}/${window.flitsRewardPageObjects.customerId}/get_rule`,
        requestOptions
      );
      let resultJson = await result.json();
      dispatch(setCustomerCreditRules(resultJson));
    } catch (error) {
      dispatch(setCustomerCreditRules(error.message));
    }
  };
  return { getRules };
};
