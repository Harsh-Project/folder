export const ListenFetchEvents = (callback) => {
    if (window.fetch && "function" == typeof window.fetch) {
        const t = window.fetch;
        let updatedFetch = function () {
            const response = t.apply(this, arguments);
            return response.then(function (resp) {
                    let isNeedToCall = false;
                    if(resp && resp.status === 200 && resp.url){
                        isNeedToCall = true
                    };
                    if(isNeedToCall){
                        resp._url = resp.url;
                        callback.apply(resp, [resp,"fetch"]);
                    }
                    return resp;
                }).catch((error) => {
                    console.error(error);
                });
        };
        window.fetch = updatedFetch;
    }
    else{
        console.log("we have no fetch to observe");
    }
}