const { createSlice } = await import("@reduxjs/toolkit").then((module) => ({createSlice: module.createSlice}));

const initialState = {
  myProfileData: null,
  microFrontEndData: null,
  languageData: null,
  displayThankYouContactUs: false,
  notificationJWTToken: null,
  customPage: null,
  customFieldsData: -1,
  urlFlitsError: -1,
  SocialLoginURLData:{
    isNeedToLogin: false
  },
  redirectURLAfterLogin:"/account",
  referalRegisterPage: {
    isNeedToShowPopup: false
  },
  generalState: {},
};

const StoreFrontContainerReduxSlice = createSlice({
  name: "storeFrontContainer",
  initialState,
  reducers: {
    setLanguageData: (state, action) => {
      state.languageData = action.payload;
    },
    setGeneralState: (state, action) => {
      const key = action.payload.key;
      const value = action.payload.value;
      state.generalState[key] = value;
    },
    setMicroFrontEndData: (state, action) => {
      state.microFrontEndData = action.payload;
    },
    setCustomPage: (state, action) => {
      state.customPage = action.payload;
    },
    setNotificationJWTToken: (state, action) => {
      state.notificationJWTToken = action.payload;
    },
    setCustomFieldsData: (state, action) => {
      state.customFieldsData = action.payload;
    },
    setUrlFlitsError: (state, action) => {
      state.urlFlitsError = action.payload;
    },
    setSocialLoginURLData: (state, action) => {
      state.SocialLoginURLData = {
        ...action.payload
      };
    },
    setRedirectURLAfterLogin: (state, action) => {
      state.redirectURLAfterLogin = action.payload;
    },
    setReferalRegisterPage: (state, action) => {
      state.referalRegisterPage = {
        ...action.payload
      };
    },
    setDisplayThankYouContactUs: (state, action) => {
      state.displayThankYouContactUs = action.payload;
    }
  },
});
window.containerState = (name) => {
  return StoreFrontContainerReduxSlice.actions[name]
} 
export const {
  setMicroFrontEndData,
  setCustomPage,
  setLanguageData,
  setGeneralState,
  setCustomFieldsData,
  setUrlFlitsError,
  setNotificationJWTToken,
  setSocialLoginURLData,
  setRedirectURLAfterLogin,
  setReferalRegisterPage,
  setDisplayThankYouContactUs
} = StoreFrontContainerReduxSlice.actions;

export default StoreFrontContainerReduxSlice.reducer;
