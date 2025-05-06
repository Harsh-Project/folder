import React from "react";
import styles from './Clock.module.css';

export const DateTime = (props) => {
    return (
        <p className={`${styles.flits_current_time} flits_navigation_current_time_value`}>{props.formattedTime}</p>
    );
}