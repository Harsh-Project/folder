import React, { Suspense } from "react";
import styles2 from "../BackButtonComponent/BackButtonComponent.module.css";
import { GlobalStore } from "redux-micro-frontend";
import styles from "./NavigationLink.module.css";
import { RenderSvgString } from "../../General/RenderSvgString";
import { Link } from "react-router-dom";

export const NavigationLink = ({
  item,
  handleLinkClick,
  index,
  activeLink,
}) => {
  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;

  const { t } = useTranslationLanguage();

  const handleRemoveRoute = () => {
    var takeClass = styles2.flits_hide_route;
    var takeClass2 = styles2.flits_hide_route2;
    var hideRoutes = document.getElementsByClassName(takeClass)[0];
    var hideRoutes2 = document.getElementsByClassName(takeClass2)[0];
    if (hideRoutes) hideRoutes.classList.remove(styles2.flits_hide_route);
    if (hideRoutes2) hideRoutes2.classList.remove(styles2.flits_hide_route2);
  };

  return (
    <div
      className={`${styles.flits_menu_item} ${
        activeLink === index ? styles.flits_active : ""
      } flits_navigation_${item?.path} flits_navigation_item`}
      key={index}
      name={item?.remoteApp}
    >
      <Suspense fallback={<></>}>
        <Link
          id={item?.path}
          to={item?.path}
          exact={"true"}
          key={index}
          onClick={() => {
            handleRemoveRoute();
            handleLinkClick(index);
          }}
          className={`${styles.flits_nav_link} flits_navigation_link_${item?.path} flits_navigation_link`}
        >
          <div
            className={`${styles.flits_navigation_item_wrapper} flits_navigation_link_${item?.path}_wrapper flits_navigation_link_wrapper`}
          >
            <div
              className={`${styles.flits_navigation_item} flits_navigation_link_${item?.path}_content_wrapper flits_navigation_link_content_wrapper`}
            >
              {item?.duoSvg && typeof item?.duoSvg === "string" ? (
                <span
                  dangerouslySetInnerHTML={{ __html: item?.duoSvg }}
                  className={`${styles.flits_menu_img} flits_navigation_link_${item?.path}_icon flits_navigation_link_icon`}
                ></span>
              ) : null}
              <span
                className={`${styles.flits_menu_title} flits_navigation_link_${item?.path}_label flits_navigation_link_label`}
              >
                {t(item?.label[0], item?.label[1])}
              </span>
            </div>
            <div
              className={`${styles.flits_arrow} flits_navigation_link_${item?.path}_right_arrow flits_navigation_link_right_arrow`}
            >
              <RenderSvgString svgString={window?.UnoIcon?.RightSideArrow} />
            </div>
          </div>
        </Link>
      </Suspense>
    </div>
  );
};
