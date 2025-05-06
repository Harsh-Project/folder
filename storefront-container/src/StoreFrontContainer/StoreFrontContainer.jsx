const { ConfigureStore } =await import("./ConfigurStore").then((module) => ({ConfigureStore: module.ConfigureStore}))

const initialState = {};
const StoreFrontContainer = ConfigureStore(initialState);

export default StoreFrontContainer;
