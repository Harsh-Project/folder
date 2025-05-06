import React from "react";
import { HashRouter } from "react-router-dom";
import { GeneralNavigationBar } from "../GeneralNavigtionBar/GeneralNavigationBar";
import { GeneralNavigationRoute } from "../GeneralNavigationRoute/GeneralNavigationRoute";

export function Navigation(props) {
  return (
    <HashRouter>
      <GeneralNavigationBar {...props} />
      <GeneralNavigationRoute {...props} />
    </HashRouter>
  );
}
