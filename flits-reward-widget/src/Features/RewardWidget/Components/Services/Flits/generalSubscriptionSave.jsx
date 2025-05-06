import { useDispatch } from "react-redux";
import { setSubscriptionResponse } from "../../../../../redux/reducer/rewardWidgetSlice";
import { apiCallTrackingHeader } from './apiCallTrackingHeader';

export const useGeneralSubscriptionSave = () => {
  const dispatch = useDispatch();
  const generalSubscriptionSave = async (props) => {
    try {
      let formdata = new FormData();
      formdata.append("token", window.flitsThemeAppExtensionObjects.token);
      formdata.append(
        "customer_hash",
        window.flitsThemeAppExtensionObjects.customerHash
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
        `${window.location.origin}${window.flitsThemeAppExtensionObjects?.base_url}/${window.flitsThemeAppExtensionObjects.customer.customer_id}/general_subscription_save`,
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
