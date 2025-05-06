import React from "react";

export const NavCustomLink = ({ item, handleLinkClick, index, activeLink }) => {
  const NavigationCustomLink =
    window.UnoDuoComponent("NavigationCustomLink");

  return (
    <NavigationCustomLink
      item={item}
      key={index}
      handleLinkClick={handleLinkClick}
      index={index}
      activeLink={activeLink}
    />
  );
};
