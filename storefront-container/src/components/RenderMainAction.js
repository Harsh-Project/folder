const { API } = await import("@getflits/storefront-shared-api/src/storefront-shared-apis/allAPI").then((module) => module);
const RemoteAppHandler = await import("Remote/RemoteApp").then((module) => module.default);
const {
  GetLocalStorage,
  SetLocalStorage,
} = await import("../components/UtilityFunction/LocalStorage").then((module) => module);
const { IsProductAddedInWishlist } = await import("../components/UtilityFunction/Wishlist").then((module) => module);
const { Utility } = await import("../components/UtilityFunction/UtilityFunction").then((module) => module);
const { ListenAjaxEvents } = await import("../components/UtilityFunction/ListenAjaxEvents").then((module) => module);
const { ListenFetchEvents } = await import("components/UtilityFunction/ListenFetchEvents").then((module) => module);
const { EVENTS } = await import("../components/UtilityFunction/EVENTS").then((module) => module);
const { GlobalStore } = await import("redux-micro-frontend").then((module) => module);
const { useTranslationLanguage } = await import("StoreFrontTranslationHook/TranslationHook").then((module) => module);
const { formatMoney } = await import("../components/UtilityFunction/formatMoney").then((module) => module);
const { ExtractDataCountry } = await import("../components/UtilityFunction/ExtractDataCountry").then((module) => module);
const { getRuleFormated } = await import("../components/UtilityFunction/formatData").then((module) => module);
const {
  IsRequiredDateValidationFailed,
  IsRequiredValidationFailed,
  IsFileSizeValidationFailed,
  IsRequiredTimeValidationFailed,
  IsFileTypeValidation,
} = await import("../components/UtilityFunction/CustomFieldValidations").then((module) => module);
const { CheckIsMinuteOrNot } = await import("components/UtilityFunction/CheckIsMinuteOrNot").then((module) => module);
const { CheckRequireField } = await import("../components/UtilityFunction/CheckRequireField").then((module) => module);
const { SetupCollectionPageEvents } = await import("components/UtilityFunction/SetupCollectionPageEvents").then((module) => module);
const { CheckIsIOSDevice } = await import('components/UtilityFunction/CheckIsIOSDevice').then((module) => ({CheckIsIOSDevice: module.CheckIsIOSDevice}))


export function MainAction() {
  const sharedStore = GlobalStore.Get();
  sharedStore.RegisterGlobalActions("API", [
    {
      API: API,
    },
  ]);
  sharedStore.RegisterGlobalActions("storeFrontContainer", [
    {
      RemoteAppHandler: RemoteAppHandler,
    },
  ]);
  sharedStore.RegisterGlobalActions("Helpers", [
    {
      SetLocalStorage: SetLocalStorage,
      GetLocalStorage: GetLocalStorage,
      IsProductAddedInWishlist: IsProductAddedInWishlist,
      Utility: Utility,
      ListenAjaxEvents: ListenAjaxEvents,
      IsFileTypeValidation: IsFileTypeValidation,
      useTranslationLanguage: useTranslationLanguage,
      CheckIsMinuteOrNot: CheckIsMinuteOrNot,
      CheckRequireField: CheckRequireField,
      SetupCollectionPageEvents: SetupCollectionPageEvents,
      getRuleFormated: getRuleFormated,
      ExtractDataCountry: ExtractDataCountry,
      IsFileSizeValidationFailed: IsFileSizeValidationFailed,
      formatMoney: formatMoney,
      IsRequiredTimeValidationFailed: IsRequiredTimeValidationFailed,
      IsRequiredValidationFailed: IsRequiredValidationFailed,
      IsRequiredDateValidationFailed: IsRequiredDateValidationFailed,
      ListenFetchEvents: ListenFetchEvents,
      EVENTS: EVENTS,
      CheckIsIOSDevice: CheckIsIOSDevice,
    IsIOSDevice: CheckIsIOSDevice()
    },
  ]);
}
