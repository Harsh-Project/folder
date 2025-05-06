const checkoutButtonSelectors = ["input[name='checkout']", "button[name='checkout']", "[href$='checkout']"];
const updateButtonSelectors = ["input[name='update']", "button[name='update']", "[href$='update']"];

export const AppendStoreCreditDiv = () => {
    checkoutButtonSelectors.forEach((checkoutButtonSelector, checkoutButtonSelectorIndex) => {
        let checkoutButtons = window.document.querySelectorAll(checkoutButtonSelector);
        checkoutButtons.forEach((checkoutButton, checkoutButtonIndex) => {
            if(checkoutButton.getAttribute("data-flits") === "store-credit-added"){
                return true;
            }
            if(checkoutButton.style.display === "none" || checkoutButton.style.visibility === "hidden"){
                return true;
            }
            if(typeof checkoutButton.addEventListener != "function"){
                return true;
            }
            let divAppend = window.document.createElement("div");
            divAppend.style.display = "none";
            divAppend.classList.add("flits-cart-automatic-code");
            divAppend.setAttribute("data-flits-checkout-index", checkoutButtonIndex);
            checkoutButton.parentElement.insertBefore(divAppend, checkoutButton);
            checkoutButton.setAttribute("data-flits","store-credit-added");
            checkoutButton.setAttribute("data-flits-checkout-index", checkoutButtonIndex);
            checkoutButton.parentElement.setAttribute("data-flits-checkout-index", checkoutButtonIndex);
            checkoutButton.parentElement.setAttribute("data-flits", "store-credit-parent");
            let form = checkoutButton.closest('form');
            if(!form){
                form = document.getElementById(checkoutButton.getAttribute('form'));
            }
            if(form){
                form.setAttribute("data-flits", "store-credit-cart-form");
                form.setAttribute("data-flits-checkout-index", checkoutButtonIndex);
                updateButtonSelectors.forEach((updateButtonSelector, updateButtonSelectorIndex) => {
                    let updateButton = form.querySelector(updateButtonSelector);
                    if(!updateButton){
                        updateButton = window.document.querySelector(updateButtonSelector+"[form='cart']");
                    }
                    if(!updateButton){
                        return true;
                    }
                    updateButton.setAttribute("data-flits","store-credit-update-button");
                    updateButton.setAttribute("data-flits-checkout-index", checkoutButtonIndex);
                    updateButton.setAttribute("data-flits-index", updateButtonSelectorIndex);
                });
            }
        });
    });
}