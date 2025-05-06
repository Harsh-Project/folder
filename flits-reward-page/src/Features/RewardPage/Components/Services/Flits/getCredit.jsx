import { useDispatch } from "react-redux";
import { setCreditData } from "../../../../../redux/reducer/rewardPageSlice";
import { apiCallTrackingHeader } from "./apiCallTrackingHeader";

export const useGetCredit = () => {
  const dispatch = useDispatch();
  const getCredit = async (props) => {
    try {
      let requestOptions = {
        method: "GET",
        redirect: "follow",
        headers: apiCallTrackingHeader,
      };
      let result = await fetch(
        `${window.location.origin}${window.flitsRewardPageObjects?.base_url}/${window.flitsRewardPageObjects.customerId}/credit/get_credit?token=${window.flitsRewardPageObjects.token}&customer_hash=${window.flitsRewardPageObjects.customerHash}`,
        requestOptions
      );
      let resultJson = await result.json();
      dispatch(setCreditData(resultJson));
    } catch (error) {
      dispatch(setCreditData(error.message));
    }
  };
  return { getCredit };
};
