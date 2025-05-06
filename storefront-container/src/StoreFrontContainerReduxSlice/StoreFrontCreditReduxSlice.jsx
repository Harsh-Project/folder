const { createSlice } = await import("@reduxjs/toolkit").then((module) => ({
  createSlice: module.createSlice,
}));

const initialState = {
  creditData: null,
  filterCredit: null,
  refundCreditApiData: null,
  refundCreditData: null,
  isRefundLoading: null,
  currentRefundPage: 1,
};

const StoreFrontCreditReduxSlice = createSlice({
  name: "storeFrontCredit",
  initialState,
  reducers: {
    setCreditData: (state, action) => {
      state.creditData = action.payload;
    },
    setFilterCredit: (state, action) => {
      state.filterCredit = action.payload;
    },
    setRefundCreditApiData: (state, action) => {
      state.refundCreditApiData = action.payload;
    },
    setRefundCreditData: (state, action) => {
      if (!state.refundCreditData) {
        state.refundCreditData = action.payload;
      } else {
        state.refundCreditData = {...state.refundCreditData, ...action.payload};
      }
    },
    setIsRefundLoading: (state, action) => {
      state.isRefundLoading = action.payload;
    },
    setCurrentRefundPage: (state, action) => {
      state.currentRefundPage = action.payload;
    },
  },
});
window.creditState = (name) => {
  return StoreFrontCreditReduxSlice.actions[name];
};
export const {
  setFilterCredit,
  setCreditData,
  setCurrentRefundPage,
  setRefundCreditApiData,
  setRefundCreditData,
  setIsRefundLoading,
} = StoreFrontCreditReduxSlice.actions;

export default StoreFrontCreditReduxSlice.reducer;
