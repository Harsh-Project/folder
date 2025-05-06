const { createSlice } = await import("@reduxjs/toolkit").then((module) => ({createSlice: module.createSlice}));

const initialState = {
  referFriendData: null,
};

const StoreFrontReferFriendReduxSlice = createSlice({
  name: "storeFrontReferFriend",
  initialState,
  reducers: {
    setReferFriendData: (state, action) => {
      state.referFriendData = action.payload;
    },
  },
});
window.referFriendState = (name)=>{
  return StoreFrontReferFriendReduxSlice.actions[name]
}
export const { setReferFriendData } =
  StoreFrontReferFriendReduxSlice.actions;

export default StoreFrontReferFriendReduxSlice.reducer;
