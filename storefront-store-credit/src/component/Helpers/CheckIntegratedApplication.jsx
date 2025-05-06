
export const CheckZapietDateTimeSelected = () => {
    /* Integration with Store Pickup + Delivery by Zapiet - https://apps.shopify.com/click-and-collect */
    if (window.Zapiet) {
        var isDateTimeSelected = false;

        if (window.Zapiet.Widget.checkoutEnabled()) {
            isDateTimeSelected = true;
        }

        if (!isDateTimeSelected) {
            return false;
        }
    }
    return true;
}
export const CheckIntegratedApplication = () => {
    const isZapiet = CheckZapietDateTimeSelected();
    if(!isZapiet){
        return false;
    }
    return true;
}