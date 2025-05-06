const { EVENTS } =await import("./EVENTS").then((module)=>module);
const { ListenAjaxEvents } =await import("./ListenAjaxEvents").then((module)=>module);
const { ListenFetchEvents } =await import("./ListenFetchEvents").then((module)=>module);
const {
  ListenHistoryPopStateEvents,
  ListenHitoryPushStateEvents,
} =await import("./ListenHistoryState").then((module)=>module);
const { Utility } =await import("./UtilityFunction").then((module)=>module);

const checkIsInGivenUrls = (url, givenUrls) => {
  let isInGivenUrls = false;
  givenUrls.forEach((item, index) => {
    if (url.includes(item)) {
      isInGivenUrls = true;
      return false;
    }
  });
  return isInGivenUrls;
};
const events = {
  collectionAjaxEvent: function () {
    var collectionPageFunction = function (xhrOrFetch) {
      var url = this._url;
      const addUrls = [
        "/collections/all?filter",
        "/collections/all",
        "/collections/all?section_id",
      ];
      if (checkIsInGivenUrls(url, addUrls)) {
        Utility.dispatchEvent(EVENTS.AJAX_COLLECTION_UPDATE, {
          response: this,
          xhrOrFetch: xhrOrFetch,
        });
      }
    };
    ListenAjaxEvents(collectionPageFunction);
    ListenFetchEvents(collectionPageFunction);
  },
  collectionHistoryEvent: function () {
    ListenHitoryPushStateEvents(function (xhrOrFetch) {
      const addUrls = [
        "/collections/all?filter",
        "/collections/all",
        "/collections/all?section_id",
      ];
      var url = arguments[1];
      if (checkIsInGivenUrls(url, addUrls)) {
        Utility.dispatchEvent(EVENTS.AJAX_COLLECTION_UPDATE, {
          response: this,
          xhrOrFetch: xhrOrFetch,
        });
      }
    });
    ListenHistoryPopStateEvents(function (xhrOrFetch) {
      const addUrls = [
        "/collections/all?filter",
        "/collections/all",
        "/collections/all?section_id",
      ];
      var url = arguments[1];
      if (checkIsInGivenUrls(url, addUrls)) {
        Utility.dispatchEvent(EVENTS.AJAX_COLLECTION_UPDATE, {
          response: this,
          xhrOrFetch: xhrOrFetch,
        });
      }
    });
  },
};
export const SetupCollectionPageEvents = () => {
  events.collectionAjaxEvent();
  events.collectionHistoryEvent();
};
