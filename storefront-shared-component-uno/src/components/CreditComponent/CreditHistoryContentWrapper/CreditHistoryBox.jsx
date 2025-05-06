import React from "react";
import styles from "./CreditHistoryContentWrapper.module.css";

export const CreditHistoryBox = (props) => {
    return (<>
        <div className={`${styles.flits_credit_box} ${styles.flits_history_credit_box}`}>
            {props?.children}
        </div>
    </>);
}