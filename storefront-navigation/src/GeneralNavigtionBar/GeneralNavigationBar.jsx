import React, { useEffect, useState } from "react";
import { NavPage } from "../PageType/NavPage";
import { NavPageWithBadge } from "../PageType/NavPageWithBadge";
import { NavCustomPage } from "../PageType/NavCustomPage";
import { NavCustomLink } from "../PageType/NavCustomLink";

export const GeneralNavigationBar = (props) => {
  const [activeLink, setActiveLink] = useState(0);

  const NavigationWrapper = window.UnoDuoComponent("NavigationWrapper");
  const Divider = window.UnoDuoComponent("Divider");
  const handleLinkClick = (index) => {
    setActiveLink(index);
  };

  useEffect(() => {
    let checkPath = window.location.href?.endsWith("/account")
      ? props?.defaultRoute?.path
      : window?.location?.href;
    const activeIndex = props?.routeHandler.findIndex(
      (item) => checkPath.endsWith(item?.path) && item?.path !== ""
    );
    setActiveLink(activeIndex < 0 ? 0 : activeIndex);
  }, [props?.routeHandler, props?.defaultRoute?.path]);

  useEffect(() => {
    window?.flitsMainContentDiv?.classList?.add("flits-account");
    window?.flitsMainContentDiv?.classList?.remove("flits-loading");
  }, []);
  if (!NavigationWrapper) {
    return null;
  }
  let isLastElementDivider = false;
  return (
    <NavigationWrapper
      activeLink={activeLink}
      count={props?.routeHandler?.length}
    >
      {props?.routeHandler?.map((item, index) => {
        if (item?.type === "divider" && !isLastElementDivider) {
          isLastElementDivider = true;
          return Divider ? <Divider key={index} /> : null;
        }
        if (!item?.enabled) {
          return null;
        }
        isLastElementDivider = false;
        if (item?.enabled && item?.type === "appstlePage") {
          return (
            <NavCustomPage
              key={index}
              item={item}
              handleLinkClick={handleLinkClick}
              index={index}
              activeLink={activeLink}
            />
          );
        }
        if (item?.enabled && item?.type === "navPage") {
          return (
            <NavPage
              item={item}
              key={index}
              handleLinkClick={handleLinkClick}
              index={index}
              activeLink={activeLink}
            />
          );
        }
        if (item?.enabled && item?.type === "navPageWithBadge") {
          return (
            <NavPageWithBadge
              key={index}
              item={item}
              handleLinkClick={handleLinkClick}
              index={index}
              activeLink={activeLink}
            />
          );
        }
        if (item?.enabled && item?.type === "customPage") {
          return (
            <NavCustomPage
              key={index}
              item={item}
              handleLinkClick={handleLinkClick}
              index={index}
              activeLink={activeLink}
            />
          );
        }
        if (item?.enabled && item?.type === "customLink") {
          return (
            <NavCustomLink
              key={index}
              item={item}
              handleLinkClick={handleLinkClick}
              index={index}
              activeLink={activeLink}
            />
          );
        } else {
          return null;
        }
      })}
    </NavigationWrapper>
  );
};
