const { combineReducers } = await import('redux').then((module) => ({combineReducers: module.combineReducers}));
const configureStore = await import('@reduxjs/toolkit').then((module) => module.configureStore);
const StoreFrontContainerReduxSlice = await import('../StoreFrontContainerReduxSlice/StoreFrontContainerReduxSlice').then((module) => module.default);
const { composeWithDevTools } = await import("redux-devtools-extension").then((module) => ({composeWithDevTools: module.composeWithDevTools}));
const StoreFrontShopifyDataReduxSlice = await import('StoreFrontContainerReduxSlice/StoreFrontShopifyDataReduxSlice').then((module) => module.default);


export function createReducerManager(initialReducers) {
  let reducers = { ...initialReducers };
  let combinedReducer = combineReducers(reducers);
  let keysToRemove = [];

  return {
    getReducerMap: () => reducers,

    reduce: (state, action) => {
      if (keysToRemove.length > 0) {
        state = { ...state };
        keysToRemove.forEach(key => delete state[key]);
        keysToRemove = [];
      }
      return combinedReducer(state, action);
    },

    add: (key, reducer) => {
      if (!key || reducers[key]) return;
      reducers[key] = reducer;
      combinedReducer = combineReducers(reducers); // Update combinedReducer
    },

    remove: key => {
      if (!key || !reducers[key]) return;
      delete reducers[key];
      keysToRemove.push(key);
      combinedReducer = combineReducers(reducers); // Update combinedReducer
    },
  };
}

const staticReducers = {
  storeFrontContainer: StoreFrontContainerReduxSlice,
  StoreFrontShopifyData: StoreFrontShopifyDataReduxSlice,
};

export function ConfigureStore() {
  const reducerManager = createReducerManager(staticReducers);
  const store = configureStore({
    reducer: reducerManager.reduce,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  }, composeWithDevTools());
  store.reducerManager = reducerManager;
  return store;
}
