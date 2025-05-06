import React from "react";
import { Navigation } from "./Navigation/Navigation";
import { Suspense, useEffect, useState } from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useSelector } from "react-redux";
import { formatNavigationBuilder } from "./RouteMenu/formatNavigationData";
import { defaultNavigationBuilderData } from "./RouteMenu/RouteMenu";

function CustomerAccountPageNavigationWrapper({ children }) {
  const CustomerAccountPageWrapper = window?.UnoDuoComponent(
    "CustomerAccountPageWrapper"
  );
  if (!CustomerAccountPageWrapper) {
    return children;
  }
  return <CustomerAccountPageWrapper>{children}</CustomerAccountPageWrapper>;
}

function App(props) {
  const [navigationRoute, setNavigationRoute] = useState(null);
  const [defaultRoute, setDefaultRoute] = useState(null);
  const firstNameInitial = useSelector(
    (state) => state.storeFrontMyProfile.firstNameInitial
  );
  const microFrontEndData = useSelector(
    (state) => state.storeFrontContainer.microFrontEndData
  );

  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;
  const SkeletonNavigation = window.UnoDuoComponent("SkeletonNavigation");
  const CustomerPageWrapper = window.UnoDuoComponent("CustomerPageWrapper");

  const CustomerPageGreeting = window.UnoDuoComponent("CustomerPageGreeting");

  const { t } = useTranslationLanguage();

  useEffect(() => {
    if (!navigationRoute) {
      const { defaultNavigation, formattedData } = formatNavigationBuilder(
        window?.flitsThemeAppExtensionObjects?.Metafields
          ?.FLITS_EXTENSION_ONSITE_CONTENT_ACCOUNT_PAGE_NAVIGATION ??
          defaultNavigationBuilderData,
        microFrontEndData
      );
      setNavigationRoute(formattedData);
      setDefaultRoute(defaultNavigation);
    }
  }, [microFrontEndData, navigationRoute]);

  if (
    !navigationRoute ||
    !CustomerPageGreeting ||
    !SkeletonNavigation ||
    !navigationRoute?.length ||
    !CustomerPageWrapper
  ) {
    return null;
  }

  return (
    <Suspense fallback={<SkeletonNavigation />}>
      <CustomerPageWrapper>
        <CustomerPageGreeting>
          {t("flits.general.greeting", "Hello")} {firstNameInitial}
        </CustomerPageGreeting>
        <CustomerAccountPageNavigationWrapper>
          <Navigation
            routeHandler={navigationRoute}
            defaultRoute={defaultRoute}
            {...props}
          />
        </CustomerAccountPageNavigationWrapper>
      </CustomerPageWrapper>
    </Suspense>
  );
}

export default App;
