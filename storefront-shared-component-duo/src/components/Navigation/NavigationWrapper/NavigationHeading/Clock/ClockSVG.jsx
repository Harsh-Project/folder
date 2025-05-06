import React from "react";
import styles from './Clock.module.css';
export const ClockSVG = (props) => {
    const hourAngle = "rotate("+props.hourAngle+" 10 10)";
    const minuteAngle = "rotate("+props.minuteAngle+" 10 10)";
    const secondAngle = "rotate("+props.secondAngle+" 10 10)";
    return (
    <svg className={`${styles.flits_svg_clock} flits_navigation_clock_svg`}>
    <g>
      <circle className={`${styles.flits_clock_circle} flits_navigation_clock_circle`} cx="50%" cy="50%" r="45%"></circle>
    </g>
    <g className={`${styles.flits_clock_hande} flits_navigation_clock_handle`}>
      <line x1="50%" y1="50%" x2="50%" y2="25%" id="flits-hourhand" transform={hourAngle} >
      </line>
      <line x1="50%" y1="50%" x2="50%" y2="15%" id="flits-minutehand" transform={minuteAngle}>
      </line>
      <line x1="50%" y1="50%" x2="50%" y2="12%" id="flits-secondhand" transform={secondAngle}>
      </line>
    </g>
    <circle className={`${styles.flits_clock_hand_center} flits_navigation_clock_handle_center`} cx="50%" cy="50%" r="3%"></circle>
  </svg>
  );
}