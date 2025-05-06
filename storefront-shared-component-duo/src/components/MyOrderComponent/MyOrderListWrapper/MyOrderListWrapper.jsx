import styles from "./MyOrderListWrapperModule.module.css"
import React from 'react'

export const MyOrderListWrapper = (props) => {
  return (
    <div className={`${styles.flits_order_list} ${styles.list}`}>
      {props?.children}
    </div>
  )
}

