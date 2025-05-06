import styles from "./BackButtonComponentModule.module.css";
import styles3 from "../NavigationRouteWraper/NavigationRouteWraperModule.module.css"
import { GlobalStore } from "redux-micro-frontend";
import styles2 from "../NavigationWrapper/NavigationWrapperModule.module.css";
import React from "react";

export const BackButtonComponent = (props) => {
  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;

  const { t } = useTranslationLanguage();

  const handleBackClick = () => {
    var takeClass = styles2.flits_account_page_nav;
    var takeClass2 = styles3.flits_page_tabs;
    var hideRoutes = document.getElementsByClassName(takeClass)[0];
    var hideRoutes2 = document.getElementsByClassName(takeClass2)[0];
    if (hideRoutes) hideRoutes.classList.add(styles.flits_hide_route);
    if(hideRoutes2) hideRoutes2.classList.add(styles.flits_hide_route2)
  };
  return (
    <>
      <button className={styles.flits_back_btn} onClick={handleBackClick}>
        <svg
          version="1.1"
          id="Capa_1"
          x="0px"
          y="0px"
          viewBox="0 0 477.862 477.862"
          width="512px"
          height="512px"
          className="hovered-paths"
        >
          <path
            d="M187.722,102.856V17.062C187.719,7.636,180.076-0.003,170.65,0c-4.834,0.001-9.44,2.053-12.676,5.644L4.375,176.311    c-5.617,6.256-5.842,15.67-0.529,22.187l153.6,187.733c5.968,7.295,16.72,8.371,24.016,2.403c3.952-3.233,6.249-8.066,6.26-13.172    v-85.043c134.827,4.386,218.965,62.02,256.888,175.787c2.326,6.96,8.841,11.653,16.179,11.656c0.920,0.003,1.840-0.072,2.748-0.222    c8.256-1.347,14.319-8.479,14.319-16.845C477.855,259.818,356.87,112.174,187.722,102.856z"
            dataoriginal="#000000"
            className="active-path"
            dataold_color="#000000"
            fill="#FFFFFF"
          ></path>
        </svg>
        Back
      </button>
      <span className={styles.flits_tab_box_title}>
        {t(props?.item?.label[0], props?.item?.label?.length > 1 ? props?.item?.label[1] : "")}
      </span>
      <div className={styles.flits_clearfix}></div>
    </>
  );
};
