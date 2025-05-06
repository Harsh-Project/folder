import React, { useState } from "react";
import { WidgetOpenBtn, WidgetCloseBtn } from "../../../../../components/index";
import { useDispatch } from "react-redux";
/* eslint-disable no-useless-escape */
import { setWidgetOPen } from "../../../../../redux/reducer/rewardWidgetSlice";
import { setDefaultScreen } from "../../../../../redux/reducer/rewardWidgetSlice";
import { IsIos } from "../../Helpers/IsIos";
import "./style.css";

function WidgetButton(props) {
  const [btnState, setBtnState] = useState(false);
  const dispatch = useDispatch();
  const { adminT } = window?.flitsThemeAppExtensionObjects?.useTranslationLanguage;
  let isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
  let isIos = IsIos();
  function rewardOpenPopupClick() {
    setBtnState(true);
    dispatch(setDefaultScreen(false));
    setTimeout(function () {
      dispatch(setWidgetOPen(true));
    }, 200);
    document
      .querySelector(".flits-reward-widget-root-container")
      .classList.add("flits-opening-anim-done");
    if (isIos || isSafari) {
      document
        .querySelector(".flits-reward-widget-root-container")
        .classList.add("flits-widget-browser-safari");
    }
    document.querySelector("body").classList.add("flits-reward-widget-open");
    // if(window.screen.width < 480){
    //     if (!window.history.state || !window.history.state.rewardWidgetpopupOpen) {
    //         window.history.pushState({rewardWidgetpopupOpen: true}, 'rewardWidgetpopupOpen', '#rewardWidgetpopupOpen');
    //     }
    // }
  }
  function rewardClosePopupClick() {
    document.querySelector("body").classList.remove("flits-reward-widget-open");
    setBtnState(false);
    document.querySelector(".flits-widget-popup-inner").scrollTop = 0;
    setTimeout(function () {
      dispatch(setWidgetOPen(false));
      dispatch(setDefaultScreen(true));
    }, 200);
    // if (window.screen.width < 480 && window.history.state && window.history.state.rewardWidgetpopupOpen) {
    //     window.history.back();
    // }
  }
  // if(window.screen.width < 480){
  //     window.addEventListener('popstate', function (event) {
  //         if (widgetOpen && (!event.state || !event.state.rewardWidgetpopupOpen)) {
  //             rewardClosePopupClick();
  //         }
  //     });
  // }
  return (
    <>
      {btnState ? (
        <WidgetCloseBtn
          rewardClosePopupClick={rewardClosePopupClick}
          icon={window?.flits_icons?.flits?.icons?.close_button}
        />
      ) : (
        <WidgetOpenBtn
          rewardOpenPopupClick={rewardOpenPopupClick}
          text={adminT("launcher.title", "Rewards")}
          icon={window?.flits_icons?.flits?.icons?.launcher_open_button}
        />
      )}
    </>
  );
}

export default WidgetButton;
