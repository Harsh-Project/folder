import React from "react";

export const NavPage = ({ item, handleLinkClick, index, activeLink }) => {
  const NavigationLink = window.UnoDuoComponent("NavigationLink");
  return (
    <NavigationLink
      item={item}
      key={index}
      handleLinkClick={handleLinkClick}
      index={index}
      activeLink={activeLink}
    />
  );
};
