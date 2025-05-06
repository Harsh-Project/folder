import { useEffect } from "react";
import styles from "./SelectDropDownSimpleRecent.module.css";
import React from "react";
import { useRef } from "react";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

export const SelectDropDownSimpleRecent = ({ item, productData }) => {
  const label = false;
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (tooltipRef.current) {
      tippy(tooltipRef.current, {
        content: productData?.title,
        placement: "top",
        arrow: true,
        theme: "light",
      });
    }
  }, [productData?.title]);
  return (
    <div
      ref={tooltipRef}
      className={`${styles.flits_floating_label} ${styles.flits_select_row} ${styles.flits_without_select}`}
    >
      <select
        ref={tooltipRef}
        disabled={true}
        className={`${styles.flits_floating_select} ${styles.flits_input} ${styles.flits_variant_select}`}
        value={productData?.variants[0]?.title}
      >
        <option value="" style={{ display: "none" }}></option>
      </select>
      <span className={styles.flits_highlight}></span>
      <label
        ref={tooltipRef}
        className={label ? styles.flits_floating_change : ""}
      >
        {productData?.title}
      </label>
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
