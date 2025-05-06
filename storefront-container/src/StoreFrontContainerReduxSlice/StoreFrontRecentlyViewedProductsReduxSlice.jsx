const { createSlice } = await import("@reduxjs/toolkit").then((module) => ({createSlice: module.createSlice}));

const initialState = {
  recentlyViewedData: null,
  recentViewedSnackBarMode: null,
  recentViewedSnackBarMessage: "",
};

const StoreFrontRecentlyViewedProductsReduxSlice = createSlice({
  name: "storeFrontRecentlyViewedProducts",
  initialState,
  reducers: {
    setRecentlyViewedData: (state, action) => {
      state.recentlyViewedData = action.payload;
    },
    setRecentViewedSnackBarMessage: (state, action) => {
      state.recentViewedSnackBarMessage = action.payload;
    },
    setRecentViewedSnackBarMode: (state, action) => {
      state.recentViewedSnackBarMode = action.payload;
    },
  },
});
window.recentViewedProductState = (name)=>{return StoreFrontRecentlyViewedProductsReduxSlice.actions[name]}
export const { setRecentViewedSnackBarMessage, setRecentViewedSnackBarMode, setRecentlyViewedData } = StoreFrontRecentlyViewedProductsReduxSlice.actions;

export default StoreFrontRecentlyViewedProductsReduxSlice.reducer;
