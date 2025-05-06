import { GetErrorMsg } from "./GetErrorMsg";
import { useSelector } from "react-redux";
import React from "react";
import styles from "./SocialLogin.module.css";

export const ErrorDiv = () => {
    const urlFlitsError = useSelector((state) => state.storeFrontContainer.urlFlitsError);
    const errorMsg = GetErrorMsg(urlFlitsError);
    if(urlFlitsError === -1){
        return null;
    }
    return (
        <div className={styles.flits_social_login_error}>
          {errorMsg}
        </div>
    );
}