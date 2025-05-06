import styles from "./TopOrderAction.module.css"
import React from 'react'
export const TopOrderWrapper = (props) => {
  return (
    <div className={styles.flits_product_variant_qty_action}>
        {props?.children}
    </div>
  )
}
