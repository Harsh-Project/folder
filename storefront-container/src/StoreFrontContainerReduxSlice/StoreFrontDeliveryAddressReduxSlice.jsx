const { createSlice } = await import("@reduxjs/toolkit").then((module) => ({createSlice: module.createSlice}));

const initialState = {
  deliveryAddressData: null,
  formMode: false,
  buttondisabled: false,
  formData: {
    title: "",
    id: "",
    customer_id: "",
    firstName: "",
    lastName: "",
    addressLine1: "",
    addressLine2: "",
    company: "",
    zip: "",
    phone: "",
    city: "",
    country: "",
    province: "",
    check: false,
    needMark: false
  },
  countryData: null,
  addressSnackBarMode: null,
  paginationCountAddress: Math.ceil((parseInt(window?.flitsThemeAppExtensionObjects?.customer?.address_count) - 1) / 6),
  addressCount: parseInt(window?.flitsThemeAppExtensionObjects?.customer?.address_count),
  addressSnackBarMessage: "",
  provinceData: null,
  defaultAddress: {
    id: window?.flitsThemeAppExtensionObjects?.customer?.default_address?.id,
    customer_id: window?.flitsThemeAppExtensionObjects?.customer?.default_address?.customer_id,
    firstName: window?.flitsThemeAppExtensionObjects?.customer?.default_address?.first_name,
    lastName: window?.flitsThemeAppExtensionObjects?.customer?.default_address?.last_name,
    company: window?.flitsThemeAppExtensionObjects?.customer?.default_address?.company,
    addressLine1: window?.flitsThemeAppExtensionObjects?.customer?.default_address?.address1,
    addressLine2: window?.flitsThemeAppExtensionObjects?.customer?.default_address?.address2,
    city: window?.flitsThemeAppExtensionObjects?.customer?.default_address?.city,
    province: window?.flitsThemeAppExtensionObjects?.customer?.default_address?.province,
    country: window?.flitsThemeAppExtensionObjects?.customer?.default_address?.country,
    zip: window?.flitsThemeAppExtensionObjects?.customer?.default_address?.zip,
    phone: window?.flitsThemeAppExtensionObjects?.customer?.default_address?.phone,
    name: window?.flitsThemeAppExtensionObjects?.customer?.default_address?.name,
    provinceCode: window?.flitsThemeAppExtensionObjects?.customer?.default_address?.province_code,
    countryCode: window?.flitsThemeAppExtensionObjects?.customer?.default_address?.country_code,
    countryName: window?.flitsThemeAppExtensionObjects?.customer?.default_address?.country_name,
    check: true,
    needMark: false,
  },
};

const StoreFrontDeliveryAddressReduxSlice = createSlice({
  name: "storeFrontDeliveryAddress",
  initialState,
  reducers: {
    setAddressSnackBarMessage: (state, action) => {
      state.addressSnackBarMessage = action.payload;
    },
    setCountryData: (state, action) => {
      state.countryData = action.payload;
    },
    setProvinceData: (state, action) => {
      state.provinceData = action.payload;
    },
    setFormMode: (state, action) => {
      state.formMode = action.payload;
    },
    setDefaultAddress: (state, action) => {
      state.defaultAddress = action.payload;
    },
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    setButtonDisabled: (state, action) => {
      state.buttondisabled = action.payload;
    },
    setAddressSnackBarMode: (state, action) => {
      state.addressSnackBarMode = action.payload;
    },
    setDeliveryAddressData: (state, action) => {
      state.deliveryAddressData = action.payload;
    },
    setPaginationCountAddress : (state, action) => {
      state.paginationCountAddress = action.payload;
    },
    setAddressCount: (state, action) => {
      state.addressCount = action.payload;
    },
    addDeliveryAddressData: (state, action) => {
      const res = action.payload;
      // const addressDefault = state.defaultAddress;
      // let temp = [];

      // for (let i = 0; i < res?.response?.length; i++) {
      //   if (res?.response[i]?.id !== addressDefault?.id) {
      //     temp.push({ ...res?.response[i], indexPage: res?.indexPage });
      //   }
      // }
      state.deliveryAddressData = state.deliveryAddressData ? [...state.deliveryAddressData, ...res?.response] : res?.response;
    },
  },
});
window.deliveryAddressState = (name) => {
  return StoreFrontDeliveryAddressReduxSlice.actions[name]
}
export const {
  setFormData,
  setCountryData,
  setPaginationCountAddress,
  setAddressSnackBarMode,
  setAddressSnackBarMessage,
  setAddressCount,
  addDeliveryAddressData,
  setButtonDisabled,
  setProvinceData,
  setFormMode,
  setDeliveryAddressData,
  setDefaultAddress,
} = StoreFrontDeliveryAddressReduxSlice.actions;

export default StoreFrontDeliveryAddressReduxSlice.reducer;
