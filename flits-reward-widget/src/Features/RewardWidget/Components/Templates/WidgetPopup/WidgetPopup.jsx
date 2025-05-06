import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import WidgetScreen from "./WidgetScreen/WidgetScreen";
import { useNoLoginRules } from "../../Services/Flits/getNoLoginRules";
import { setNoLoginRules } from "../../../../../redux/reducer/rewardWidgetSlice";
import { useRules } from "../../Services/Flits/getRules";
import { useGetCredit } from "../../Services/Flits/getCredit";
import { CheckTimeDiff } from "../../Helpers/CheckTimeDiff";
import "./style.css";
import { useReferralData } from "../../Services/Flits/getReferralData";

function WidgetPopup(props) {
  const dispatch = useDispatch();
  const { getNoLoginRules } = useNoLoginRules();
  const { getReferralData } = useReferralData();
  const { getRules } = useRules();
  const { getCredit } = useGetCredit();
  const isCustomer = window?.flitsThemeAppExtensionObjects?.customerExist ? true : false;
  const widgetOpen = useSelector((state) => state.rewardWidget.widgetOPen);
  const { customerCreditRules, referralData, noLoginRules, creditData } =
    useSelector((state) => state.rewardWidget);
  const elementRef = useRef(null);

  const handleScroll = () => {
    let mainDiv = document.querySelector(".flits-widget-popup-main");
    const scrollTopThreshold = isCustomer ? 30 : 80;
    if (
      elementRef.current.scrollTop >= scrollTopThreshold &&
      !mainDiv.classList.contains("scrolled")
    ) {
      mainDiv.classList.add("scrolled");
    } else if (
      elementRef.current.scrollTop < scrollTopThreshold &&
      mainDiv.classList.contains("scrolled")
    ) {
      mainDiv.classList.remove("scrolled");
    }
    let scrollPercentage =
      elementRef.current.scrollTop /
      (elementRef.current.scrollHeight - elementRef.current.clientHeight);
    scrollPercentage = Math.min(0.8, scrollPercentage);
    elementRef.current.style.setProperty("--scroll", scrollPercentage);
  };

  const getData = useCallback(async () => {
    if (!isCustomer) {
      let guestRuleMetafield =
        window?.flitsThemeAppExtensionObjects?.Metafields
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
  }, [dispatch, getCredit, getNoLoginRules, getRules, isCustomer]);

  const getReferData = useCallback(async () => {
    await getReferralData();
  }, [getReferralData]);

  useEffect(() => {
    if (
      (!isCustomer && !noLoginRules) ||
      (isCustomer && (!creditData || !customerCreditRules))
    ) {
      getData();
    }
    if (!referralData && isCustomer) {
      getReferData();
    }
  }, [
    getData,
    isCustomer,
    noLoginRules,
    creditData,
    customerCreditRules,
    getReferData,
    referralData,
  ]);

  return (
    <div className={`flits-widget-popup-main ${widgetOpen ? "active" : ""} ${"flits-widget-popup-main-" + window?.flitsThemeAppExtensionObjects?.Metafields?.FLITS_EXTENSION_ONSITE_CONTENT_REWARD_WIDGET?.launcher?.alignment ?? "right"}`}>
      <div
        className="flits-widget-popup-inner"
        ref={elementRef}
        onScroll={handleScroll}
      >
        <div>
          <WidgetScreen />
        </div>
      </div>
    </div>
  );
}

export default WidgetPopup;
