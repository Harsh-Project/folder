import styles from "./SelectDropDownSimpleRecentModule.module.css";
import React from "react";

export const SelectDropDownSimpleRecent = ({ item, productData }) => {
  return (
    <div
      style={{ visibility: "hidden" }}
      className={`${styles.flits_select_row}`}
    >
      <select
        disabled={true}
        className={`${styles.flits_input} ${styles.flits_variant_select}`}
        value={productData?.variants[0]?.title}
      >
        <option value="" style={{ display: "none" }}></option>
      </select>
      <div className={styles.flits_select_arrow} style={{ display: "none" }}>
        <svg
          viewBox="0 0 24 24"
          width="14"
          height="14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          shapeRendering="geometricPrecision"
        >
          <path d="M6 9l6 6 6-6"></path>
        </svg>
      </div>
    </div>
  );
};
