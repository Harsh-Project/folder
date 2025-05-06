import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import WidgetButton from "./Components/Templates/WidgetButton/WidgetButton";
import WidgetPopup from "./Components/Templates/WidgetPopup/WidgetPopup";
import { getWidgetLanguage } from "./Components/Services/Flits/getWidgetLanguage";
import { useTranslationLanguage } from "../../Helper/useTranslationLanguage";
import {
  setAdminLanguage,
  setWidgetLanguage,
} from "../../redux/reducer/rewardWidgetSlice";

function RewardwidgetMain(props) {
  const [data, setData] = useState(false);
  const { adminT, themeT } = useTranslationLanguage();
  const dispatch = useDispatch();
  const getData = useCallback(async () => {
    let lang = await getWidgetLanguage();
    dispatch(setWidgetLanguage(lang));
    dispatch(
      setAdminLanguage(
        window?.flitsThemeAppExtensionObjects?.Metafields
          ?.FLITS_EXTENSION_ONSITE_CONTENT_REWARD_WIDGET
      )
    );
    window.flitsThemeAppExtensionObjects.useTranslationLanguage = {
      adminT: adminT,
      themeT: themeT,
    };
    setData(true);
  }, [dispatch, adminT, themeT]);
  useEffect(() => {
    if (!data) {
      getData();
    }
  }, [data, getData]);
  if (!data || !window?.flitsThemeAppExtensionObjects?.useTranslationLanguage) {
    return null;
  }
  return (
    <>
      <WidgetPopup />
      <WidgetButton />
    </>
  );
}

export default RewardwidgetMain;
