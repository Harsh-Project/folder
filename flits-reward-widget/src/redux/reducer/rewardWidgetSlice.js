import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  widgetOPen: false,
  generalState: {},
  widgetLanguage: null,
  noLoginRules: null,
  customerCreditRules: null,
  creditData: null,
  referralData: null,
  defaultScreen: true,
  subscriptionResponse: null,
  adminLanguage: null,
  pagesViewClicks: {
    defaultView: true,
    earningView: null,
    redeemView: null,
    cractivityView: null,
    ruleCounts: null,
    howItWorksView: null,
    referRules: null,
    referRuleView: null
  },
  iconReceive: null
};
const RewardWidgetReduxSlice = createSlice({
  name: "rewardWidgetSlice",
  initialState,
  reducers: {
    setWidgetOPen: (state, action) => {
      state.widgetOPen = action.payload;
    },
    setWidgetLanguage: (state, action) => {
      state.widgetLanguage = action.payload;
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
    setAdminLanguage: (state, action) => {
      state.adminLanguage = action.payload;
    },
    setPagesViewClicks: (state, action) => {
      state.pagesViewClicks = action.payload;
    },
    setIconReceive: (state, action) => {
      state.iconReceive = action.payload
    }
  },
});

export const {
  setWidgetOPen,
  setGeneralState,
  setWidgetLanguage,
  setNoLoginRules,
  setCustomerCreditRules,
  setCreditData,
  setReferralData,
  setDefaultScreen,
  setIconReceive,
  setSubscriptionResponse,
  setPagesViewClicks,
  setAdminLanguage,
} = RewardWidgetReduxSlice.actions;

export default RewardWidgetReduxSlice.reducer;
