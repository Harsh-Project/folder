import { useDispatch } from "react-redux";
import { setCustomerCreditRules } from "../../../../../redux/reducer/rewardWidgetSlice";
import { apiCallTrackingHeader } from "./apiCallTrackingHeader";

export const useRules = () => {
  const dispatch = useDispatch();
  const getRules = async (props) => {
    try {
      const apiData = JSON.parse(localStorage.getItem("rewardWidgetApiCall"));
      if (apiData?.rule) {
        return;
      }
      localStorage.setItem(
        "rewardWidgetApiCall",
        JSON.stringify(apiData ? { ...apiData, rule: true } : { rule: true })
      );
      let formdata = new FormData();
      formdata.append("token", window.flitsThemeAppExtensionObjects.token);
      formdata.append(
        "customer_hash",
        window.flitsThemeAppExtensionObjects.customerHash
      );
      let requestOptions = {
        method: "POST",
        redirect: "follow",
        headers: apiCallTrackingHeader,
        body: formdata,
      };
      let result = await fetch(
        `${window.location.origin}${window.flitsThemeAppExtensionObjects?.base_url}/${window.flitsThemeAppExtensionObjects.customer.customer_id}/get_rule`,
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
