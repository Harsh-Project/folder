import { useDispatch } from "react-redux";
import { setCreditData } from "../../../../../redux/reducer/rewardWidgetSlice";
import { apiCallTrackingHeader } from "./apiCallTrackingHeader";

export const useGetCredit = () => {
  const dispatch = useDispatch();
  const getCredit = async (props) => {
    try {
      const apiData = JSON.parse(localStorage.getItem("rewardWidgetApiCall"));
      if (apiData?.creditData) {
        return;
      }
      localStorage.setItem(
        "rewardWidgetApiCall",
        JSON.stringify(
          apiData ? { ...apiData, creditData: true } : { creditData: true }
        )
      );
      let requestOptions = {
        method: "GET",
        headers: apiCallTrackingHeader,
        redirect: "follow",
      };
      let result = await fetch(
        `${window.location.origin}${window.flitsThemeAppExtensionObjects?.base_url}/${window.flitsThemeAppExtensionObjects.customer.customer_id}/credit/get_credit?token=${window.flitsThemeAppExtensionObjects.token}&customer_hash=${window.flitsThemeAppExtensionObjects.customerHash}`,
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
