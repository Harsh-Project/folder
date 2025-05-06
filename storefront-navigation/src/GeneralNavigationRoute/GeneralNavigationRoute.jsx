import { GlobalStore } from "redux-micro-frontend";
import { RouteWrapper } from "./RouteWrapper.jsx";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { CustomPageComponent } from "../CustomPageComponent/CustomPageComponent";
import { AppstlePageComponent } from "../AppstlePageComponent/AppstlePageComponent";

export const GeneralNavigationRoute = (props) => {
  const getStore = GlobalStore.Get();
  const RemoteAppHandler =
    getStore._globalActions.storeFrontContainer[0].RemoteAppHandler;
  const NavigationRouteWraper = window.UnoDuoComponent("NavigationRouteWraper");

  if (!NavigationRouteWraper || !RemoteAppHandler) {
    return null;
  }

  return (
    <NavigationRouteWraper>
      <Routes>
        <Route
          exact={"true"}
          key={"defaultItemNavigation"}
          path={"/"}
          element={
            <RouteWrapper item={props?.defaultRoute}>
              {props?.defaultRoute?.remoteApp ? (
                <RemoteAppHandler
                  remoteApp={
                    props?.defaultRoute?.remoteApp
                  }
                  item={props?.defaultRoute}
                />
              ) : props?.defaultRoute?.type ===
                "appstlePage" ? (
                <AppstlePageComponent
                  {...props?.defaultRoute}
                />
              ) : (
                <CustomPageComponent
                  {...props?.defaultRoute}
                />
              )}
            </RouteWrapper>
          }
        />
        {props?.routeHandler.map((item, index) => {
          if (item?.type === "divider") {
            return null;
          }
          return (
            <Route
              exact={"true"}
              key={index}
              path={item?.path}
              element={
                <RouteWrapper item={item}>
                  {item?.remoteApp ? (
                    <RemoteAppHandler remoteApp={item?.remoteApp} item={item} />
                  ) : item?.type === "appstlePage" ? (
                    <AppstlePageComponent {...item} />
                  ) : (
                    <CustomPageComponent {...item} />
                  )}
                </RouteWrapper>
              }
            />
          );
        })}
      </Routes>
    </NavigationRouteWraper>
  );
};
