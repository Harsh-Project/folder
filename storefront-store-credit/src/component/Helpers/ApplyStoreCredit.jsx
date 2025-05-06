import { GetShopifyCartdata } from "./GetShopifyCartData";
import { RedirectToCheckout } from "./RedirectToCheckout";
import { GlobalStore } from "redux-micro-frontend";

export const ApplyStoreCredit = ({event, cartData, t, checkoutButton, selectedValue}) => {
    const getStore = GlobalStore.Get();
    const API = getStore._globalActions.API[0].API;
    // let old_text = checkoutButton.innerHTML;
    let new_text = t('flits.cart_page.applying_credit_message','Applying credit please wait');

    switch (checkoutButton.tagName.toString().toLowerCase()) {
      case 'input':
        // old_text = checkoutButton.value;
        checkoutButton.value = new_text;
        break;
      case 'button':
      default :
        // old_text = checkoutButton.innerHTML;
        checkoutButton.innerHTML = new_text;
        break;
    }
    checkoutButton.disabled = true;
    let cart = GetShopifyCartdata(cartData);
    if (cartData.total_price <= 0) {
        RedirectToCheckout({discount: "+"}, checkoutButton);
        return false;
    }
    API.credit.apply_credit({
        customer_hash: window?.flitsThemeAppExtensionObjects?.customer?.customer_hash,
        token: window?.flitsThemeAppExtensionObjects?.customer?.shop_token,
        data: cart,
        spent_rule_id: selectedValue
    }).then((resp) => {
         if (!resp.status) {
            RedirectToCheckout({discount: "+"}, checkoutButton);
            return;
          }
          RedirectToCheckout({
            discount: encodeURIComponent(resp.code)
          }, checkoutButton);
          return;
    }).catch(() => {
        RedirectToCheckout({discount: "+"}, checkoutButton);
    });

}