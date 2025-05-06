import React from "react";
import styles from "./FlitsParagraphModule.module.css";

export const FlitsParagraph = (props) => {
  return <p className={styles.flits_paragraph}>{props?.paragraph}</p>;
};
