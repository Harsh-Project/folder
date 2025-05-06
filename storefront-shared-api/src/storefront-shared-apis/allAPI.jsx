import { container } from "./MicroFrontEndAPI"
import { language } from "./MicroFrontEndLanguageAPi";
import { myprofile } from "./MicroFronendMyProfile";
import { productPage } from "./MicroFrontEndProductPageAPI";
import { changepassword } from "./MicroFrontendChangePassword";
import { custompage } from './MicroFrontendCustomPage';
import { howtomanagecredit } from "./MicroFrontendHowToManageCredit";
import { credit } from './MicroFrontendCredit';
import { referfriend } from './MicroFrontendReferFriend';
import { ApiNotification } from "./ApiNotification"
import { wishlist } from './MicroFrontendWishList';
import { recentlyviewedproducts } from './MicroFrontendRecentlyViewedProducts';
import { order } from "./MicroFrontendOrder";
import { deliveryaddress } from './MicroFrontendDeliveryAddress';
import { loginPage } from './MicroFrontendLoginPage';
import { sociallogin } from './MicroFrontendSocialLogin';
import { cartpage } from './MicroFrontendCartPage';
import { Shopify } from './Shopify';
import { analytic } from './Analytic';

export const API = {
    referfriend: referfriend,
    wishlist: wishlist,
    analytic: analytic,
    microfrontend: container,
    credit: credit,
    custompage: custompage,
    notification:  ApiNotification,
    deliveryaddress: deliveryaddress,
    howtomanagecredit: howtomanagecredit,
    sociallogin: sociallogin,
    changepassword: changepassword,
    loginPage: loginPage,
    cartpage: cartpage,
    myprofile: myprofile,
    order: order,
    recentlyviewedproducts: recentlyviewedproducts,
    multilangauge: language,
    productPage: productPage,
    Shopify: Shopify,
};
