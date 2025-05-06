import { GlobalStore } from "redux-micro-frontend";
import React, { Suspense } from "react";
import styles from "./NavigationLinkModule.module.css";
import { Link } from "react-router-dom";

export const NavigationCustomPage = ({
  item,
  handleLinkClick,
  index,
  activeLink,
}) => {
  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;

  const { t } = useTranslationLanguage();
  return (
    <div
      className={`${styles.flits_menu_item} ${
        activeLink === index ? styles.flits_menu_active : ""
      } flits_navigation_${item?.path} flits_navigation_item`}
      key={index}
      name={item?.remoteApp}
    >
      <Suspense fallback={<></>}>
        <Link
          key={index}
          to={item?.path}
          id={item?.path}
          exact={"true"}
          onClick={() => {
            handleLinkClick(index);
          }}
          className={`${styles.flits_nav_link} flits_navigation_link_${item?.path} flits_navigation_link`}
        >
          {item?.duoSvg ? (
            typeof item?.duoSvg === "string" ? (
              <span
                dangerouslySetInnerHTML={{ __html: item?.duoSvg }}
                className={`${styles.flits_menu_img} ${styles.flits_menu_img_custom_link_page} flits_navigation_link_${item?.path}_icon flits_navigation_link_icon`}
              ></span>
            ) : (
              <span
                className={`${styles.flits_menu_img} ${styles.flits_menu_img_custom_link_page} flits_navigation_link_${item?.path}_icon flits_navigation_link_icon`}
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
