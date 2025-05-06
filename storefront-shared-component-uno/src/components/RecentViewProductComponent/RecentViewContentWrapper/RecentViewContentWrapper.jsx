import styles from "./RecentViewContentWrapper.module.css"
import React from 'react'

export const RecentViewContentWrapper = (props) => {
  return (
    <div className={styles.flits_tab_box_body}>
        <div className={styles.flits_wishlist_list_div}>
            <ul className={styles.flits_wishlist_product_list}>{props?.children}</ul>
        </div>
    </div>
  )
}

