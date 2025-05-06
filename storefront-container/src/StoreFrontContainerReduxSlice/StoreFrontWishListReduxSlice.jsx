const { createSlice } = await import("@reduxjs/toolkit").then((module) => ({
  createSlice: module.createSlice,
}));

const initialState = {
  wishListData: null,
  apiCallDone: null,
  wishListSnackBarMessage: "",
  wishListSnackBarMode: null,
  wishListCount: null,
};

const StoreFrontWishListReduxSlice = createSlice({
  name: "storeFrontWishList",
  initialState,
  reducers: {
    setWishListData: (state, action) => {
      state.wishListData = action.payload;
    },
    setWishListSnackBarMessage: (state, action) => {
      state.wishListSnackBarMessage = action.payload;
    },
    setWishListCount: (state, action) => {
      state.wishListCount = action.payload;
    },
    setApiCallDone: (state, action) => {
      state.apiCallDone = action.payload;
    },
    setWishListSnackBarMode: (state, action) => {
      state.wishListSnackBarMode = action.payload;
    },
  },
});

window.wishListState = (name) => {
  return StoreFrontWishListReduxSlice.actions[name];
};
export const {
  setWishListSnackBarMode,
  setWishListCount,
  setWishListSnackBarMessage,
  setApiCallDone,
  setWishListData,
} = StoreFrontWishListReduxSlice.actions;

export default StoreFrontWishListReduxSlice.reducer;
