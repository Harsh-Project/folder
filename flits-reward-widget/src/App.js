import React from "react";
import RewardwidgetMain from "./Features/RewardWidget/RewardwidgetMain";
import { useEffect, useState } from "react";
import "./index.css";
import { getIcon } from "./Features/RewardWidget/Components/Services/Flits/getIcon";
import { useDispatch, useSelector } from "react-redux";
import { setIconReceive } from "./redux/reducer/rewardWidgetSlice";

function App() {
  const [scTrue, setScTrue] = useState(false);
  const dispatch = useDispatch()
  const { iconReceive } = useSelector((state) => state.rewardWidget)

  useEffect(() => {
    if (!window?.commonEndpoint) {
      window?.flitsThemeAppExtensionObjects?.addCommonEndpoint();
    }
    if (localStorage.getItem("rewardWidgetApiCall")) {
      localStorage.removeItem("rewardWidgetApiCall");
    }
    if (!window.flits_icons) {
      getIcon(dispatch, setIconReceive);
    }
    document.documentElement.style.setProperty("--flitsWidgetPrimaryColor", window?.flitsThemeAppExtensionObjects?.Metafields?.FLITS_EXTENSION_ONSITE_CONTENT_REWARD_WIDGET?.primary_color ?? "#000654");
    document.documentElement.style.setProperty("--flitsWidgetPrimaryColorBackGround", `${window?.flitsThemeAppExtensionObjects?.Metafields?.FLITS_EXTENSION_ONSITE_CONTENT_REWARD_WIDGET?.primary_color ?? "#000654"}10`);
    if (
      window?.flitsThemeAppExtensionObjects &&
      window?.flitsThemeAppExtensionObjects?.scPaid &&
      window?.flitsThemeAppExtensionObjects?.scEnable &&
      window?.flitsThemeAppExtensionObjects?.Metafields
        ?.FLITS_EXTENSION_ONSITE_CONTENT_REWARD_WIDGET?.is_enable
    ) {
      setScTrue(true);
    }
  }, [dispatch]);

  if(!iconReceive) {
    return null
  }

  return <div>{scTrue ? <RewardwidgetMain /> : ""}</div>;
}

export default App;
