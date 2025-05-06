import styles from "./MarkDefault.module.css";
import React from "react";

export const MarkDefault = (props) => {
  return (
    props?.needMark && (
      <div className={styles.flits_col_md_12}>
        <div className={styles.flits_input_row}>
          <input
            onChange={props?.handleChange}
          type={props?.type}
          className={styles.flits_input}
          name={props?.name}
          value={props?.value}
          checked={props?.value}
          id={props?.id}
          ></input>
          <label
          for={props?.id}

            className={styles.flits_input_label}
          >
            {props?.label}
          </label>
        </div>
      </div>
    )
  );
};
