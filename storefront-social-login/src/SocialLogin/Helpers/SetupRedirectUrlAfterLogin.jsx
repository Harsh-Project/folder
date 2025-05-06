const redirectUrlFormSelector = 
["form#customer_login","form#create_customer","form#RegisterForm",".shopify-challenge__container form",".shopify-challenge__container form"];
const names = ["checkout_url","return_to"];
const addRedirectUrl = (selector, url) => {
    var elements = window.document.querySelectorAll(selector);
    elements.forEach((element,indexOfElement) => {
        names.forEach((name, indexOfName) => {
            var name_elem = element.querySelector("[name='"+name+"']");
            if(!name_elem){
              name_elem = window.document.createElement("input");
              name_elem.type = 'hidden';
              name_elem.name = name;
              element.appendChild(name_elem);
            }
            name_elem.value = url ?? "/";
        });
    });
    return this;
  }
export const SetupRedirectUrlAfterLogin = (url) => {
    redirectUrlFormSelector.forEach((item, index) => {
        addRedirectUrl(item, url);
    });
}