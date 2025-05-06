import { Facebook } from "./Buttons/Facebook";
import { Google } from "./Buttons/Google";
import { Twitter } from "./Buttons/Twitter";
import { Amazon } from "./Buttons/Amazon";
import { ErrorDiv } from "./ErrorDiv";
import React from "react";
import styles from "./SocialLogin.module.css";
import { GlobalStore } from "redux-micro-frontend";

export const SocialLoginDiv = () => {
    const getStore = GlobalStore.Get()
    const CheckRequireField = getStore._globalActions.Helpers[0].CheckRequireField
    const requireField = {
        facebook: ["IS_FACEBOOK_ENABLE"],
        google: ["IS_GOOGLE_ENABLE"],
        amazon: ["IS_AMAZON_ENABLE"],
        twitter: ["IS_TWITTER_ENABLE"]
    }
    return (
    <div className={styles.flits_social_login_container}>
        <div className={styles.flits_social_login_btn_grp}>
            {CheckRequireField(requireField["facebook"]) && <Facebook />}
            {CheckRequireField(requireField["google"]) && <Google />}
            {CheckRequireField(requireField["twitter"]) && <Twitter />}
            {CheckRequireField(requireField["amazon"]) && <Amazon />}
        </div>
        <ErrorDiv />
    </div>
    );
}