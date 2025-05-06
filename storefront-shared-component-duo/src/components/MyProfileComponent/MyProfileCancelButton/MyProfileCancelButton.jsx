import styles from "./MyProfileCancelButtonModule.module.css"
import React from 'react'
import { RenderSvgString } from "../../General/RenderSvgString"

export const MyProfileCancelButton = (props) => {

  const handleChange = () => {
    props?.onClickEvent()
  }
  return (
    <div className={styles.flits_button_float} onClick={handleChange}>
      <div className={`${styles.flits_button_icon} ${styles.flits_cancel_button}`}>
      <RenderSvgString svgString={window?.DuoIcon?.ProfileCancel} />
      </div>
    </div>
  )
}

