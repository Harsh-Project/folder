import RewardPageMain from "./Features/RewardPage/RewardPageMain";
import React, { useEffect, useState } from "react";

function App() {
  const [scTrue, setScTrue] = useState(false);

  useEffect(() => {
    if (
      window.flitsRewardPageObjects &&
      window.flitsRewardPageObjects?.scPaid &&
      window.flitsRewardPageObjects?.scEnable &&
      window?.flitsRewardPageObjects?.Metafields?.IS_REWARD_PAGE_AVAILABLE
    ) {
      setScTrue(true);
    }
  }, []);

  useEffect(() => {
    if (!window?.flitsRewardPageObjects?.commonEndpoint) {
      window?.flitsRewardPageObjects?.addCommonEndpoint();
    }
  }, []);

  return <>{scTrue ? <RewardPageMain /> : ""}</>;
}

export default App;
