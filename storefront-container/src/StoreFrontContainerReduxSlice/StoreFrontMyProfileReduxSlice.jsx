const { createSlice } = await import("@reduxjs/toolkit").then((module) => ({createSlice: module.createSlice}));

const initialState = {
  contact: window?.flitsThemeAppExtensionObjects?.customer?.contact ?? "",
  gender: window?.flitsThemeAppExtensionObjects?.customer?.gender ?? "",
  birthdate: window?.flitsThemeAppExtensionObjects?.customer?.birthday ?? "",
  firstName: window?.flitsThemeAppExtensionObjects?.customer?.first_name ?? "",
  lastName: window?.flitsThemeAppExtensionObjects?.customer?.last_name ?? "",
  email: window?.flitsThemeAppExtensionObjects?.customer?.email ?? "",
  contactInitial: window?.flitsThemeAppExtensionObjects?.customer?.contact ?? "",
  genderInitial: window?.flitsThemeAppExtensionObjects?.customer?.gender ?? "",
  birthdateInitial: window?.flitsThemeAppExtensionObjects?.customer?.birthday ?? "",
  firstNameInitial: window?.flitsThemeAppExtensionObjects?.customer?.first_name ?? "",
  lastNameInitial: window?.flitsThemeAppExtensionObjects?.customer?.last_name ?? "",
  emailInitial: window?.flitsThemeAppExtensionObjects?.customer?.email ?? "",
  edit: false,
  customFields: {},
  customFieldsInitial: {},
};

const StoreFrontMyProfileReduxSlice = createSlice({
  name: "storeFrontMyProfile",
  initialState,
  reducers: {
    setEmailInitial: (state, action) => {
      state.emailInitial = action.payload;
    },
    setFirstNameInitial: (state, action) => {
      state.firstNameInitial = action.payload;
    },
    setLastNameInitial: (state, action) => {
      state.lastNameInitial = action.payload;
    },
    setContactInitial: (state, action) => {
      state.contactInitial = action.payload;
    },
    setBirthdateInitial: (state, action) => {
      state.birthdateInitial = action.payload;
    },
    setGenderInitial: (state, action) => {
      state.genderInitial = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
    },
    setContact: (state, action) => {
      state.contact = action.payload;
    },
    setBirthdate: (state, action) => {
      state.birthdate = action.payload;
    },
    setGender: (state, action) => {
      state.gender = action.payload;
    },
    setEdit: (state, action) => {
      state.edit = action.payload;
    },
    setCustomFields: (state, action) => {
      const key = action.payload.key;
      const value = action.payload.value;
      state.customFields[key] = {
        ...state.customFields[key],
        value,
      };
    },
    setCustomFieldsBulk: (state, action) => {
      let payload = action.payload;
      // console.log("setCustomFieldsBulk", action.payload);
      state.customFields = {
        ...state.customFields,
        ...payload
      };
    },
    setCustomFieldsInitial: (state, action) => {
      const key = action.payload.key;
      const value = action.payload.value;
      // console.log("setCustomFieldsInitial", value);
      state.customFieldsInitial[key] = {
        ...state.customFieldsInitial[key],
        value,
      };
    },
    setCustomFieldsInitialBulk: (state, action) => {
      let payload = action.payload;
      // console.log("setCustomFieldsInitialBulk", payload);
      state.customFieldsInitial = {
        ...state.customFields,
        ...payload
        };
    },
  },
});
window.profileState = (name)=> {
  return StoreFrontMyProfileReduxSlice.actions[name]
}
export const {
  setFirstName,
  setGender,
  setEdit,
  setBirthdate,
  setPhoneCode,
  setCustomFields,
  setBirthdateInitial,
  setContactInitial,
  setEmailInitial,
  setFirstNameInitial,
  setGenderInitial,
  setLastNameInitial,
  setCustomFieldsBulk,
  setContact,
  setFileName,
  setCustomFieldsInitialBulk,
  setCustomFieldsInitial,
  setEmail,
  setFile,
  setLastName,
  setValid,
} = StoreFrontMyProfileReduxSlice.actions;

export default StoreFrontMyProfileReduxSlice.reducer;
