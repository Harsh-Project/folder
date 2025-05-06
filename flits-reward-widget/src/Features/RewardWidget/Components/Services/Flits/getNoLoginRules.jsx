import { useDispatch } from "react-redux";
import { setNoLoginRules } from "../../../../../redux/reducer/rewardWidgetSlice";
import { apiCallTrackingHeader } from "./apiCallTrackingHeader";

export const useNoLoginRules = () => {
  const dispatch = useDispatch();
  const getNoLoginRules = async (props) => {
    try {
      const apiData = JSON.parse(localStorage.getItem("rewardWidgetApiCall"));
      if (apiData?.noLoginRule) {
        return;
      }
      localStorage.setItem(
        "rewardWidgetApiCall",
        JSON.stringify(
          apiData ? { ...apiData, noLoginRule: true } : { noLoginRule: true }
        )
      );
      let requestOptions = {
        method: "GET",
        headers: apiCallTrackingHeader,
        redirect: "follow",
      };
      let result = await fetch(
        `${window.location.origin}${window.flitsThemeAppExtensionObjects?.base_url}/get-rules?token=${window.flitsThemeAppExtensionObjects.token}`,
        requestOptions
      );
      let resultJson = await result.json();
      dispatch(setNoLoginRules(resultJson));
      localStorage.setItem("flitsNoLoginRules", JSON.stringify(resultJson));
      localStorage.setItem("flitsNoLoginRulesTime", new Date());
    } catch (error) {
      dispatch(setNoLoginRules(error.message));
    }
  };
  return { getNoLoginRules };
};
