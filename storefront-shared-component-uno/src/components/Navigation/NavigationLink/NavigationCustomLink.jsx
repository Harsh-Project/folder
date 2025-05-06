import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import styles from "./NavigationLink.module.css";
import { RenderSvgString } from "../../General/RenderSvgString";

export const NavigationCustomLink = ({
  item,
  handleLinkClick,
  index,
  activeLink,
}) => {
  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;

  const { t } = useTranslationLanguage();

  const aTagAttributes = item?.path?.endsWith("logout")
    ? {
        noInstant: "",
        "data-no-instant": "",
      }
    : {};

  return (
    <div
      className={`${styles.flits_menu_item} ${
        activeLink === index ? styles.flits_active : ""
      } flits_navigation_${item?.label?.[1]
        ?.replaceAll(/\s+/g, "_")
        ?.replace("/", "_")
        ?.toLowerCase()} flits_navigation_item`}
      key={index}
      name={item?.remoteApp}
    >
      <a
        href={item?.path}
        key={index}
        id={item?.path}
        rel={"noreferrer"}
        exact={"true"}
        target={
          item?.target
            ? item?.target
            : item?.path?.endsWith("logout")
            ? "_self"
            : "_blank"
        }
        onClick={() => {}}
        className={`${
          styles.flits_nav_link
        } flits_navigation_link_${item?.label?.[1]
          ?.replaceAll(/\s+/g, "_")
          ?.replace("/", "_")
          ?.toLowerCase()} flits_navigation_link`}
        {...aTagAttributes}
      >
        <div
          className={`${
            styles.flits_navigation_item_wrapper
          } flits_navigation_link_${item?.label?.[1]
            ?.replaceAll(/\s+/g, "_")
            ?.replace("/", "_")
            ?.toLowerCase()}_wrapper flits_navigation_link_wrapper`}
        >
          <div
            className={`${
              styles.flits_navigation_item
            } flits_navigation_link_${item?.label?.[1]
              ?.replaceAll(/\s+/g, "_")
              ?.replace("/", "_")
              ?.toLowerCase()}_content_wrapper flits_navigation_link_content_wrapper`}
          >
            {item?.duoSvg && typeof item?.duoSvg === "string" ? (
              <span
                dangerouslySetInnerHTML={{ __html: item?.duoSvg }}
                className={`${styles.flits_menu_img} ${
                  styles.flits_menu_img_custom_link_page
                } flits_navigation_link_${item?.label?.[1]
                  ?.replaceAll(/\s+/g, "_")
                  ?.replace("/", "_")
                  ?.toLowerCase()}_icon flits_navigation_link_icon`}
              ></span>
            ) : null}
            <span
              className={`${
                styles.flits_menu_title
              } flits_navigation_link_${item?.label?.[1]
                ?.replaceAll(/\s+/g, "_")
                ?.replace("/", "_")
                ?.toLowerCase()}_label flits_navigation_link_label`}
            >
              {t(item?.label[0], item?.label[1])}
            </span>
          </div>
          {item?.path?.endsWith("logout") ? null : (
            <div
              className={`${
                styles.flits_arrow
              } flits_navigation_link_${item?.label?.[1]
                ?.replaceAll(/\s+/g, "_")
                ?.replace("/", "_")
                ?.toLowerCase()}_right_arrow flits_navigation_link_right_arrow`}
            >
              <RenderSvgString svgString={window?.UnoIcon?.RightSideArrow} />
            </div>
          )}
        </div>
      </a>
    </div>
  );
};
