const { createSlice } =await import("@reduxjs/toolkit").then((module)=>({createSlice: module.createSlice}));

const initialState = {
  search: null,
  topOrderProductSnackBarMessage: "",
  topOrderProductSnackBarMode: null,
  selectFilter: "Filter",
  topOrderDataCustom: null,
  topOrderData: null,
  orderField: {},
  selectSortBy: "Sort By"
};

const StoreFrontTopOrderProductReduxSlice = createSlice({
  name: "storeFrontTopOrderProduct",
  initialState,
  reducers: {
    setTopOrderDataCustom: (state, action) => {
      state.topOrderDataCustom = action.payload;
    },
    setOrderField: (state, action) => {
      state.orderField = action.payload;
    },
    setTopOrderProductSnackBarMessage: (state, action) => {
      state.topOrderProductSnackBarMessage = action.payload;
    },
    setTopOrderProductSnackBarMode: (state, action) => {
      state.topOrderProductSnackBarMode = action.payload;
    },
    setSelectFilter: (state, action) => {
      state.selectFilter = action.payload;
    },
    setTopOrderData: (state, action) => {
      state.topOrderData = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setSelectSortBy: (state, action) => {
      state.selectSortBy = action.payload;
    }
  },
});

window.topOrderProductState = (name) => {
  return StoreFrontTopOrderProductReduxSlice.actions[name]
}
export const { setSelectSortBy, setTopOrderProductSnackBarMessage, setTopOrderProductSnackBarMode, setTopOrderDataCustom, setSelectFilter, setOrderField,setSearch, setTopOrderData } =
  StoreFrontTopOrderProductReduxSlice.actions;

export default StoreFrontTopOrderProductReduxSlice.reducer;
