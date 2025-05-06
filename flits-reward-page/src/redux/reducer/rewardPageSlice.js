import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pageActive: true,
  generalState: {},
  themeLanguage: null,
  adminLanguage: null,
  icons: null,
  noLoginRules: null,
  customerCreditRules: null,
  creditData: null,
  referralData: null,
  defaultScreen: true,
  subscriptionResponse: null,
};
const RewardPageReduxSlice = createSlice({
  name: "rewardPageSlice",
  initialState,
  reducers: {
    setPageActive: (state, action) => {
      state.pageActive = action.payload;
    },
    setThemeLanguage: (state, action) => {
      state.themeLanguage = action.payload;
    },
    setAdminLanguage: (state, action) => {
      state.adminLanguage = action.payload;
    },
    setIcons: (state, action) => {
      state.icons = action.payload;
    },
    setNoLoginRules: (state, action) => {
      state.noLoginRules = action.payload;
    },
    setCustomerCreditRules: (state, action) => {
      state.customerCreditRules = action.payload;
    },
    setCreditData: (state, action) => {
      state.creditData = action.payload;
    },
    setReferralData: (state, action) => {
      state.referralData = action.payload;
    },
    setDefaultScreen: (state, action) => {
      state.defaultScreen = action.payload;
    },
    setSubscriptionResponse: (state, action) => {
      state.subscriptionResponse = action.payload;
    },
    setGeneralState: (state, action) => {
      const key = action.payload.key;
      const value = action.payload.value;
      state.generalState[key] = value;
    },
  },
});

export const {
  setPageActive,
  setGeneralState,
  setThemeLanguage,
  setAdminLanguage,
  setIcons,
  setNoLoginRules,
  setCustomerCreditRules,
  setCreditData,
  setReferralData,
  setDefaultScreen,
  setSubscriptionResponse,
} = RewardPageReduxSlice.actions;

export default RewardPageReduxSlice.reducer;
