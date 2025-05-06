import React, { Suspense } from "react";
import { GlobalStore } from "redux-micro-frontend";
import styles from "./NavigationLinkModule.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const NavigationLink = ({
  item,
  handleLinkClick,
  index,
  activeLink,
}) => {
  const ruleData = useSelector(
    (state) => state.storeFrontHowToManageCredit.ruleData
  );
  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;

  const { t } = useTranslationLanguage();

  const getTotal = () => {
    for (let i = 0; i < ruleData?.length; i++) {
      if (ruleData[i]?.tab_to_append === "flits_from_admin_rules") {
        return true;
      }
    }

    return false;
  };

  if (item?.path === "fromAdmin" && !getTotal()) {
    return null;
  }

  return (
    <div
      className={`${styles.flits_menu_item} ${styles.flits_slider_slide} ${
        styles.flits_slider_slide_current
      } ${
        activeLink === index ? styles.flits_menu_active : ""
      } flits_navigation_${item?.path} flits_navigation_item`}
      key={index}
      name={item?.remoteApp}
    >
      <Suspense fallback={<></>}>
        <Link
          to={item?.path}
          id={item?.path}
          exact={"true"}
          key={index}
          onClick={() => {
            handleLinkClick(index);
          }}
          className={`${styles.flits_nav_link} flits_navigation_link_${item?.path} flits_navigation_link`}
        >
          {item?.duoSvg ? (
            typeof item?.duoSvg === "string" ? (
              <span
                dangerouslySetInnerHTML={{ __html: item?.duoSvg }}
                className={`${styles.flits_menu_img} flits_navigation_link_${item?.path}_icon flits_navigation_link_icon`}
              ></span>
            ) : (
              <span
                className={`${styles.flits_menu_img} flits_navigation_link_${item?.path}_icon flits_navigation_link_icon`}
              >
                {item?.duoSvg}
              </span>
            )
          ) : null}
          <span
            className={`${styles.flits_menu_title} flits_navigation_link_${item?.path}_label flits_navigation_link_label`}
          >
            {t(item?.label[0], item?.label[1])}
          </span>
        </Link>
      </Suspense>
    </div>
  );
};
