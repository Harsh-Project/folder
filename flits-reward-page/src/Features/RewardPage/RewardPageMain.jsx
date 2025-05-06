import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getThemeLanguage } from "./Components/Services/Flits/getThemeLanguage";
import { getIcon } from "./Components/Services/Flits/getIcon";
import {
  setThemeLanguage,
  setAdminLanguage,
  setIcons,
  setNoLoginRules,
} from "../../redux/reducer/rewardPageSlice";
import { useNoLoginRules } from "./Components/Services/Flits/getNoLoginRules";
import { useRules } from "./Components/Services/Flits/getRules";
import { useGetCredit } from "./Components/Services/Flits/getCredit";
import RewardPage from "./Components/Page/RewardPage/RewardPage";
import { CheckTimeDiff } from "./Components/Helpers/CheckTimeDiff";
import { Loader } from "./Components/Atoms/Loader/Loader";
import { GetContrastingColor } from "./Components/Helpers/GetContrastingColor";

let didInit = false;

function RewardPageMain() {
  const [data, setData] = useState(false);
  // eslint-disable-next-line
  const [isCustomer, setIsCustomer] = useState(
    window?.flitsRewardPageObjects?.customer ? true : false
  );

  const dispatch = useDispatch();
  const { getNoLoginRules } = useNoLoginRules();
  const { getRules } = useRules();
  const { getCredit } = useGetCredit();

  const getData = useCallback(async () => {
    let themeLang = await getThemeLanguage();
    dispatch(setThemeLanguage(themeLang));

    let icons = await getIcon();
    dispatch(setIcons(icons));

    let adminLang =
      window.flitsRewardPageObjects?.Metafields
        ?.FLITS_EXTENSION_ONSITE_CONTENT_REWARD_PAGE;
    dispatch(setAdminLanguage(adminLang));

    if (!isCustomer) {
      let guestRuleMetafield =
        window?.flitsRewardPageObjects?.Metafields
          ?.GET_RULES_FOR_GUEST_CUSTOMERS;
      if (guestRuleMetafield) {
        dispatch(setNoLoginRules(guestRuleMetafield));
      } else {
        let localRules = localStorage.getItem("flitsNoLoginRules");
        let localRulesTime = localStorage.getItem("flitsNoLoginRulesTime");
        if (localRules && localRulesTime) {
          let timeDiff = CheckTimeDiff(localRulesTime);
          if (timeDiff < 600000) {
            dispatch(setNoLoginRules(JSON.parse(localRules)));
          } else {
            await getNoLoginRules();
          }
        } else {
          await getNoLoginRules();
        }
      }
    } else {
      await getCredit();
      await getRules();
    }

    let primaryBGColor = adminLang?.primary_color || "#000";
    let primaryTextColor = GetContrastingColor(primaryBGColor);
    if (primaryBGColor && primaryTextColor) {
      document.documentElement.style.setProperty(
        "--flitsrewardpagePrimaryButtonBg",
        primaryBGColor
      );
      document.documentElement.style.setProperty(
        "--flitsrewardpagePrimaryButtonText",
        primaryTextColor
      );
    }

    setData(true);
  }, [isCustomer, getNoLoginRules, getRules, getCredit, dispatch]);

  useEffect(() => {
    if (!didInit) {
      didInit = true;
      getData();
    }
  }, [getData]);

  if (
    !window.flitsRewardPageObjects?.Metafields
      ?.FLITS_EXTENSION_ONSITE_CONTENT_REWARD_PAGE?.is_enable ||
    window.flitsRewardPageObjects?.Metafields
      ?.FLITS_EXTENSION_ONSITE_CONTENT_REWARD_PAGE?.is_enable === "false"
  ) {
    return null;
  }

  if (!data) {
    return <Loader active={true} />;
  }
  return (
    <>
      <RewardPage />
    </>
  );
}

export default RewardPageMain;
