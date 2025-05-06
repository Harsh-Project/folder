const { createSlice } = await import("@reduxjs/toolkit").then((module) => ({createSlice: module.createSlice}));

const initialState = {
  messageForm: "",
  emailForm: window?.flitsThemeAppExtensionObjects?.customer?.email,
  linkForm: "",
  contactForm: window?.flitsThemeAppExtensionObjects?.customer?.contact,
  reasonForm: "",
  orderData: [],
  orderPageArray: [],
  orderPageData: {},
  isOrderDataLoaded: false,
  form: false,
  isOrderPageLoaded: {},
  totalOrderPages: 0,
  totalOrder: window?.flitsThemeAppExtensionObjects?.customer?.orderCount,
  skeletonOrderCount: window?.flitsThemeAppExtensionObjects?.customer?.orderCount,
  firstNameForm: window?.flitsThemeAppExtensionObjects?.customer?.first_name,
  lastNameForm: window?.flitsThemeAppExtensionObjects?.customer?.last_name,
  contactError: null,
  emailError: null,
  reasonError: null,
  messageError: null,
  linkError: null,
};

const StoreFrontOrderReduxSlice = createSlice({
  name: "storeFrontOrder",
  initialState,
  reducers: {
    setForm: (state, action) => {
      state.form = action.payload;
    },
    setEmailForm: (state, action) => {
      state.emailForm = action.payload;
    },
    setContactForm: (state, action) => {
      state.contactForm = action.payload;
    },
    addOrderData: (state, action) => {
      const orders = action.payload.data;
      const pageNumber = action.payload.pageNumber;
      state.orderPageData[pageNumber] = orders;
      orders.forEach((item, index) => {
        state.orderData.push(item);
      });
      state.isOrderPageLoaded[pageNumber] = true;
    },
    setTotalOrder: (state, action) => {
      state.totalOrder = action.payload;
    },
    setSkeletonOrderCount: (state, action) => {
      state.skeletonOrderCount = action.payload;
    },
    setIsOrderDataLoaded: (state, action) => {
      state.isOrderDataLoaded = action.payload;
    },
    addOrderPageArray: (state, action) => {
      state.orderPageArray.push(action.payload);
    },
    removeOrderPageArray: (state, action) => {
      state.orderPageArray = state.orderPageArray.filter(function (el) { return el !== action.payload; });
    },
    setFirstNameForm: (state, action) => {
      state.firstNameForm = action.payload;
    },
    setLastNameForm: (state, action) => {
      state.lastNameForm = action.payload;
    },
    setReasonForm: (state, action) => {
      state.reasonForm = action.payload;
    },
    setMessageForm: (state, action) => {
      state.messageForm = action.payload;
    },
    setLinkForm: (state, action) => {
      state.linkForm = action.payload;
    },
    setContactError: (state, action) => {
      state.contactError = action.payload;
    },
    setEmailError: (state, action) => {
      state.emailError = action.payload;
    },
    setReasonError: (state, action) => {
      state.reasonError = action.payload;
    },
    setMessageError: (state, action) => {
      state.messageError = action.payload;
    },
    setLinkError: (state, action) => {
      state.linkError = action.payload;
    }
  },
});
window.orderState = (name)=>{return StoreFrontOrderReduxSlice.actions[name]}
export const {
  setEmailForm,
  setContactForm,
  setForm,
  addOrderData,
  setReasonForm,
  setMessageForm,
  setLinkForm,
  setFirstNameForm,
  setEmailError,
  setContactError,
  setReasonError,
  setMessageError,
  setLastNameForm,
  setLinkError,
  setIsOrderDataLoaded,
  setTotalOrder,
  setSkeletonOrderCount,
  setTotalOrderPages,
  addOrderPageArray,
  removeOrderPageArray,
} = StoreFrontOrderReduxSlice.actions;

export default StoreFrontOrderReduxSlice.reducer;
