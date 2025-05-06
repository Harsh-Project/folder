import styles from "./MyProfileEditButtonModule.module.css"
import React from 'react'
import { RenderSvgString } from "../../General/RenderSvgString";

export const MyProfileEditButton = (props) => {
    const handleClick = () => {
        props?.onClickEvent()
    }
  return (
    <div className={styles.flits_button_float} onClick={handleClick}>
      <div className={`${styles.flits_button_icon} ${styles.flits_edit_button}`}>
      <RenderSvgString svgString={window?.DuoIcon?.ProfileEdit} />
      </div>
    </div>
  )
}

