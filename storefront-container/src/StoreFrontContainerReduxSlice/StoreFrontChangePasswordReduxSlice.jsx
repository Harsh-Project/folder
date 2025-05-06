const { createSlice } = await import("@reduxjs/toolkit").then((module) => ({createSlice: module.createSlice}));

const initialState = {
  newPassword: "",
  confirmNewPassword: "",
  passwordError: null,
  snackBarMode: null,
};

const StoreFrontChangePasswordReduxSlice = createSlice({
  name: "storeFrontChangePassword",
  initialState,
  reducers: {
    setNewPassword: (state, action) => {
      state.newPassword = action.payload;
    },
    setSnackBarMode: (state, action) => {
      state.snackBarMode = action.payload;
    },
    setConfirmNewPassword: (state, action) => {
      state.confirmNewPassword = action.payload;
    },
    setPasswordError: (state, action) => {
      state.passwordError = action.payload;
    }
  },
});
window.updatePasswordState = (name) => {
  return StoreFrontChangePasswordReduxSlice.actions[name]
} 
export const {
  setNewPassword,
  setSnackBarMode,
  setPasswordError,
  setConfirmNewPassword
} = StoreFrontChangePasswordReduxSlice.actions;

export default StoreFrontChangePasswordReduxSlice.reducer;
