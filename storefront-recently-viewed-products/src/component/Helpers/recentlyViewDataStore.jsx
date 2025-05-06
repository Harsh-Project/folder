import { GlobalStore } from "redux-micro-frontend";

export const recentlyViewDataStore = (item) => {
    const getStore = GlobalStore.Get();
    const SetLocalStorage = getStore._globalActions.Helpers[0].SetLocalStorage;
    const GetLocalStorage = getStore._globalActions.Helpers[0].GetLocalStorage;
    const settings = {
      queue: [],
      finalQueue: [],
      limit: 9,
      localStorageKey: 'flits_recently_products'
    };

    updateProduct();

    if (isPresent(item) === -1) {
      if (isFull()) {
        removeFirstProduct();
      }
      settings.queue.push({ 'product_handle': item });
      settings.queue.forEach(function (v, i) {
        settings.finalQueue.push({ 'product_handle': settings.queue[i].product_handle })
      });
      SetLocalStorage(settings.localStorageKey, settings.finalQueue);
    }

    function updateProduct() {
      if (GetLocalStorage(settings.localStorageKey) == null || GetLocalStorage(settings.localStorageKey) === undefined) {
        SetLocalStorage(settings.localStorageKey, []);
        settings.queue = GetLocalStorage(settings.localStorageKey, []);
      } else {
        settings.queue = GetLocalStorage(settings.localStorageKey);
      }
    }

    function isPresent(item) {
      for (let i = 0; i < settings.queue.length; i++) {
        if (settings.queue[i].product_handle.indexOf(item) !== -1) {
          return 1;
        }

      }

      return -1
    }

    function isFull() {
      return (settings.limit === settings.queue.length);
    }

    function removeFirstProduct() {
      settings.queue.splice(0, 1);
    }
  };
