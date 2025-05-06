import { GlobalStore } from "redux-micro-frontend";

export const RedirectToCheckout = (parameters, checkoutButton) => {
    const getStore = GlobalStore.Get();
    const Utility = getStore._globalActions.Helpers[0].Utility;
    let params = {};
    if (Object.keys(parameters).length > 0) {
        params = parameters;
    }
    let form = checkoutButton.closest('form');
    if(!form){
        const checkoutIndex = checkoutButton.getAttribute("data-flits-checkout-index");
        if(checkoutIndex){
            form = window.document.querySelector("[data-flits='store-credit-cart-form'][data-flits-checkout-index='"+checkoutIndex+"']");
        }
    }
    if (!form) {
      window.location.href = "/checkout?" + (new URLSearchParams(parameters)).toString();
      return true;
    }
    let form_action = form.action;
    let form_action_data = Utility.parseURL(form_action);

    Object.keys(params).forEach((index, paramIndex) => {
        let item = params[index];
        let existing = form.querySelector("[name='" + index + "']");
        if(existing){
            existing.value = item;
        }
        else{
            let input = window.document.createElement("input");
            input.type = "hidden";
            input.name = index;
            input.value = item;
            form.appendChild(input);
        }
        if (form_action_data.searchObject[index]) {
            form_action = form_action.replace(index + '=' + form_action_data.searchObject[index], item);
        } else {
        form_action += (form_action.indexOf('?') !== -1 ? "&" : "?") + index + "=" + item;
        }

    });

    let checkoutInput = window.document.createElement("input");
    checkoutInput.type = "hidden";
    checkoutInput.name = "checkout";
    checkoutInput.value = "true";
    form.appendChild(checkoutInput);
    form.action = form_action;
    let submitter = window.document.createElement("button");
    submitter.setAttribute("flitsFormSubmitted",true);
    form.dispatchEvent(new SubmitEvent('submit',
    {
        isTrusted: true,
        bubbles: true,
        cancelBubble: false,
        cancelable: true,
        composed: false,
        submitter: submitter
    }));
}