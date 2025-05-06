const { EVENTS } =await import("./EVENTS").then((module) => module);
const { ListenAjaxEvents } =await import("./ListenAjaxEvents").then((module) => module);
const { ListenFetchEvents } =await import("./ListenFetchEvents").then((module) => module);
const { Utility } =await import("./UtilityFunction").then((module) => module);

const checkIsInGivenUrls = (url, givenUrls) => {
    let isInGivenUrls = false;
    givenUrls.forEach((item, index) => {
        if(url.includes(item)){
            isInGivenUrls = true;
            return false;
        }
    });
    return isInGivenUrls;
}
const events = {
    addToCartAjaxEvent: function () {
        var addToCartFunction = function (xhrOrFetch) {
            var url = this._url;
            const addUrls = [
                '/cart/add.js',
                '/cart/add',
                '/cart/add.json',
            ];
            if (checkIsInGivenUrls(url, addUrls)) {
                Utility.dispatchEvent(EVENTS.AJAX_CART_PRODUCT_ADDED, {
                    response: this,
                    xhrOrFetch: xhrOrFetch
                });
            }
        }
        ListenAjaxEvents(addToCartFunction);
        ListenFetchEvents(addToCartFunction);
    },
    updateCartAjaxEvent: function () {
        var updateCartFunction = function (xhrOrFetch) {
            var url = this._url;
            const updateUrls = [
                '/cart/change',
                '/cart/change.js',
                '/cart/change.json',
                '/cart/update',
                '/cart/update.js',
                '/cart/update.json',
            ];

            if (checkIsInGivenUrls(url, updateUrls)) {
                Utility.dispatchEvent(EVENTS.AJAX_CART_CART_UPDATED, {
                    response: this,
                    xhrOrFetch: xhrOrFetch
                });
            }
        }
        ListenAjaxEvents(updateCartFunction);
        ListenFetchEvents(updateCartFunction);
    },
    clearCartAjaxEvent: function () {
        var clearCartFunction = function (xhrOrFetch) {
            var url = this._url;
            const clearUrls = [
                '/cart/clear',
                '/cart/clear.js',
                '/cart/clear.json'
            ];
            if (checkIsInGivenUrls(url, clearUrls)) {
                Utility.dispatchEvent(EVENTS.AJAX_CART_CART_CLEARED, {
                    response: this,
                    xhrOrFetch: xhrOrFetch
                });
            }
        }
        ListenAjaxEvents(clearCartFunction);
        ListenFetchEvents(clearCartFunction);
    },
    getCartAjaxEvent: function () {
        var getCartFunction = function (xhrOrFetch) {
            var url = this._url;
            const getUrls = [
                '/cart?view=drawer',
                '/cart.js',
                '/cart.json'
            ];
            if(!url.includes('flits') && checkIsInGivenUrls(url, getUrls)){
                Utility.dispatchEvent(EVENTS.AJAX_CART_CART_RENDERED, {
                    response: this,
                    xhrOrFetch: xhrOrFetch
                });
            }
        }
        ListenAjaxEvents(getCartFunction);
        ListenFetchEvents(getCartFunction);
    },
};
export const SetupCartEvents = () => {
    events.addToCartAjaxEvent();
    events.updateCartAjaxEvent();
    events.clearCartAjaxEvent();
    events.getCartAjaxEvent();
}
