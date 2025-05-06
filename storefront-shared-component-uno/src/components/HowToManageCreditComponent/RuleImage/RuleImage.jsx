import styles from "./RuleImage.module.css"
import React from 'react'

export const RuleImage = ({ rule }) => {
  return (
    <div className={styles.flits_avatar}>
      <img className={styles.flits_rule_image} alt="img" src={`data:image/svg+xml;base64,${window?.ImageArray[rule?.module_on]?.icon}`} />
    </div>
  )
}

