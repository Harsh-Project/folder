export const ListenHitoryPushStateEvents = (callback) => {
    let originalPushState = window.history.pushState;
    window.history.pushState = function () {
        const oldHref = window.location.href;
        const response = originalPushState.apply(window.history, arguments);
        const newHref = window.location.href;
        window.flitsLastLoadedUrl = window.location.href;
        const state = arguments[0];
        const argumentsArray = [oldHref, newHref, state];
        callback.apply(window.history, argumentsArray);
        return response;
    }
}

export const ListenHistoryPopStateEvents = (callback) => {
    window.flitsLastLoadedUrl = window.location.href;
    window.addEventListener("popstate", (e) => {
        const argumentsArray = [window.flitsLastLoadedUrl, window.location.href, e.state];
        window.flitsLastLoadedUrl = window.location.href;
        callback.apply(this, argumentsArray);
    });
}