const { createSlice } = await import("@reduxjs/toolkit").then((module) => ({
  createSlice: module.createSlice,
}));

const initialState = {
  productData: {},
  cartData: -1,
  deletedProduct: null,
};

const StoreFrontShopifyDataReduxSlice = createSlice({
  name: "storeFrontShopifyData",
  initialState,
  reducers: {
    setShopifyProuctData: (state, action) => {
      let handle = action.payload.handle;
      let productData = action.payload.data;
      state.productData[handle] = {
        ...state.productData[handle],
        ...productData,
      };
    },
    setShopifyCartData: (state, action) => {
      state.cartData = action.payload;
    },
    setDeletedProduct: (state, action) => {
      if (!state.deletedProduct) {
        state.deletedProduct = { [action.payload.handle]: true };
      } else {
        state.deletedProduct = {
          ...state.deletedProduct,
          [action.payload.handle]: true,
        };
      }
    },
  },
});

window.shopifyState = (name) => {
  return StoreFrontShopifyDataReduxSlice.actions[name];
};
export const { setShopifyProuctData, setDeletedProduct, setShopifyCartData } =
  StoreFrontShopifyDataReduxSlice.actions;

export default StoreFrontShopifyDataReduxSlice.reducer;
