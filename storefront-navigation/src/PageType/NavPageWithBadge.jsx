import React from "react";

export const NavPageWithBadge = ({
  item,
  handleLinkClick,
  index,
  activeLink,
}) => {
  const NavigationLinkWithBadge =
    window.UnoDuoComponent("NavigationLinkWithBadge");

  return (
    <NavigationLinkWithBadge
      item={item}
      handleLinkClick={handleLinkClick}
      key={index}
      index={index}
      activeLink={activeLink}
    />
  );
};
