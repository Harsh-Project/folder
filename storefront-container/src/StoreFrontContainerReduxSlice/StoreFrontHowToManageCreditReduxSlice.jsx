const { createSlice } = await import("@reduxjs/toolkit").then((module) => ({createSlice: module.createSlice}));

const initialState = {
  ruleData: null,
  howToManageCreditMode: null,
  howToManageCreditMessage: "",
  activeButton: "flits_earning_rules",
  maxSpentCredit: null,
};

const StoreFrontHowToManageCreditReduxSlice = createSlice({
  name: "storeFrontHowToManageCredit",
  initialState,
  reducers: {
    setRuleData: (state, action) => {
      state.ruleData = action.payload;
    },
    setHowToManageCreditMessage: (state, action) => {
      state.howToManageCreditMessage = action.payload;
    },
    setHowToManageCreditMode: (state, action) => {
      state.howToManageCreditMode = action.payload;
    },
    setActiveButton: (state, action) => {
      state.activeButton = action.payload;
    },
    setMaxSpentCredit: (state, action) => {
      state.maxSpentCredit = action.payload;
    }
  },
});
window.manageCreditState = (name) => {
  return StoreFrontHowToManageCreditReduxSlice.actions[name]
}
export const {
  setRuleData,
  setHowToManageCreditMessage,
  setHowToManageCreditMode,
  setActiveButton,
  setMaxSpentCredit
} = StoreFrontHowToManageCreditReduxSlice.actions;

export default StoreFrontHowToManageCreditReduxSlice.reducer;
