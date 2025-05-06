import React from "react";
import HeroBanner from "../../Sections/HeroBanner/HeroBanner";
import HeroItWorks from "../../Sections/HowItWorks/HowItWorks";
import ReferFriend from "../../Sections/ReferFriend/ReferFriend";
import HowToEarn from "../../Sections/HowToEarn/HowToEarn";
import { HowToRedeem } from "../../Sections/HowToRedeem/HowToRedeem";
import "./style.css";

function RewardPage(props) {
  return (
    <>
      <div
        className="flits-reward-page-main"
        rel={window.flitsRewardPageObjects.customer ? "customer" : null}
      >
        <HeroBanner />
        <HeroItWorks />
        <HowToEarn />
        <HowToRedeem />
        <ReferFriend />
      </div>
    </>
  );
}

export default RewardPage;
