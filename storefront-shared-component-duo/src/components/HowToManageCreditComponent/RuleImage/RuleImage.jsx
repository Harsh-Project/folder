import styles from "./RuleImageModule.module.css"
import React from 'react'

export const RuleImage = ({ rule }) => {
  return (
    <div className={styles.flits_avatar}>
      <img className={styles.flits_rule_image} alt="img" src={rule?.image} />
    </div>
  )
}

