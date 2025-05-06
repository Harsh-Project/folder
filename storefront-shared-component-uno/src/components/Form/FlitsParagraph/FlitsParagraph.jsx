import React from "react";
import styles from "./FlitsParagraph.module.css";

export const FlitsParagraph = (props) => {
  return <p className={styles.flits_paragraph}>{props?.paragraph}</p>;
};
