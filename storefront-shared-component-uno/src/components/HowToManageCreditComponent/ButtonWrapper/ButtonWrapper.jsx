import styles from "./ButtonWrapper.module.css"
import React from 'react'

export const ButtonWrapper = (props) => {
  return (
    <ul className={`${styles.flits_nav} ${styles.flits_nav_pils}`} id="flits-pills-tab">{props?.children}</ul>
  )
}

