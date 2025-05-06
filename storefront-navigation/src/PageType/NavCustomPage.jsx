import React from "react";

export const NavCustomPage = ({ item, handleLinkClick, index, activeLink }) => {
  const NavigationCustomPage =
    window.UnoDuoComponent("NavigationCustomPage");

  return (
    <NavigationCustomPage
      item={item}
      handleLinkClick={handleLinkClick}
      key={index}
      index={index}
      activeLink={activeLink}
    />
  );
};
