import {
  FourZeroFour,
  Article,
  Blog,
  Captcha,
  Cart,
  Collection,
  ListCollections,
  Account,
  ActivateAccount,
  Addresses,
  Login,
  Order,
  Register,
  ResetPassword,
  GiftCard,
  Index,
  Metaobject,
  Page,
  Password,
  Policy,
  Product,
  Search,
} from "./components/Pages/index";
const { Suspense, lazy, React } = await import("react").then((module) => ({
  Suspense: module.Suspense,
  lazy: module.lazy,
  React: module.default,
}));
const { Provider } = await import("react-redux").then((module) => ({
  Provider: module.Provider,
}));
const ReactDOM = await import("react-dom/client").then(
  (module) => module.default
);
// import { PersistGate } = await import("redux-persist/integration/react").then;
const reportWebVitals = await import("./reportWebVitals").then(
  (module) => module.default
);
const StoreFrontContainer = await import(
  "./StoreFrontContainer/StoreFrontContainer"
).then((module) => module.default); // persistor).then,
const SettingUpData = lazy(() =>
  import("./components/SettingUpData/SettingUpData")
);
const SettingUpStore = lazy(() =>
  import("components/SettingUpStore/SettingUpStore")
);

const pageTypesAndComponents = {
  404: FourZeroFour,
  article: Article,
  blog: Blog,
  captcha: Captcha,
  cart: Cart,
  collection: Collection,
  "list-collections": ListCollections,
  "customers/account": Account,
  "customers/activate_account": ActivateAccount,
  "customers/addresses": Addresses,
  "customers/login": Login,
  "customers/order": Order,
  "customers/register": Register,
  "customers/reset_password": ResetPassword,
  gift_card: GiftCard,
  index: Index,
  metaobject: Metaobject,
  page: Page,
  password: Password,
  policy: Policy,
  product: Product,
  search: Search,
};

if (
  "serviceWorker" in navigator &&
  "PushManager" in window &&
  window?.flitsThemeAppExtensionObjects?.Metafields
    ?.IS_PUSH_NOTIFICATION_ENABLE &&
  window?.flitsThemeAppExtensionObjects?.Metafields?.is_store_credit_enable &&
  window?.flitsThemeAppExtensionObjects?.Metafields?.IS_STORE_CREDIT_PAID
) {
  window.addEventListener("load", async () => {
    navigator.serviceWorker
      .register(
        `/apps/${window?.flitsThemeAppExtensionObjects?.proxy_name}/api/1/${window?.flitsThemeAppExtensionObjects?.shop_id}/notifications/web_push/service_worker.js?token=${window?.flitsThemeAppExtensionObjects?.shop_token}&theme_id=${window?.flitsThemeAppExtensionObjects?.theme?.id}`
      )
      .then(function (registration) {
        console.log(
          "Service Worker registered with scope: ",
          registration.scope
        );
        registration.update();
      })
      .catch(function (error) {
        console.error("Service Worker registration failed: ", error);
      });
  });
}

Object.entries(pageTypesAndComponents).forEach(([pageType, Component]) => {
  const rootElement = document.querySelector(
    "#flits-theme-app-extension-root-element[data-page-type='" + pageType + "']"
  );
  if (rootElement) {
    const element = ReactDOM.createRoot(rootElement);
    element.render(
      pageType === "customers/account" ||
        pageType === "collection" ||
        pageType === "product" ? (
        <Suspense fallback={<div>loading</div>}>
          <SettingUpStore type={pageType}>
            <Provider store={StoreFrontContainer}>
              {/* <PersistGate persistor={persistor}> */}
              <Suspense fallback={<div>loading</div>}>
                <SettingUpData>
                  <Component pageType={pageType} />
                </SettingUpData>
              </Suspense>
              {/* </PersistGate> */}
            </Provider>
          </SettingUpStore>
        </Suspense>
      ) : (
        <Suspense fallback={<div>loading</div>}>
          <Provider store={StoreFrontContainer}>
            {/* <PersistGate persistor={persistor}> */}
            <Suspense fallback={<div>loading</div>}>
              <SettingUpData>
                <Component pageType={pageType} />
              </SettingUpData>
            </Suspense>
            {/* </PersistGate> */}
          </Provider>
        </Suspense>
      )
    );
  }
});

reportWebVitals();
