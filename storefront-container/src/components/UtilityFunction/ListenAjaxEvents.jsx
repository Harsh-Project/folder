export const ListenAjaxEvents = (callback) => {
    const send = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function () {
        this.addEventListener('load', function () {
            let isNeedToCall = false;
            if (this.readyState === 4 && this._url) {
                isNeedToCall = true;
            }
            if (isNeedToCall) {
                var xhrData = this;
                callback.apply(xhrData, [xhrData, "ajax"]);
            }
        })
        return send.apply(this, arguments)
    }
}