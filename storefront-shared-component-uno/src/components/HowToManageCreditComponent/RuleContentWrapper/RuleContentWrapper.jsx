import React from 'react'
import styles from "./RuleContentWrapper.module.css"

export const RuleContentWrapper = (props) => {
  return (
    <div className={styles.flits_rule_card}>
        <div className={`${styles.flits_rule_box} ${props?.rule?.is_earned ? styles.flits_earned_rule : ""} ${props?.rule?.is_earned ? styles.flits_z_dept_1 : ""}`}>
            <div className={styles.flits_crad_rule_content}>
            {props?.children}
            </div>
        </div>
    </div>
  )
}

