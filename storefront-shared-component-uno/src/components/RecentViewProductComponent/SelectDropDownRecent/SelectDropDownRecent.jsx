import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import { useRef } from "react";
import styles from "./SelectDropDownRecent.module.css";
import React, { useState } from "react";
import { useEffect } from "react";

export const SelectDropDownRecent = ({ item, productData, onClickEvent }) => {
  const [value, setValue] = useState("");
  const [label, setLabel] = useState(false);
  const handleVariantChange = (e) => {
    const selectedIndex = e.target.selectedIndex;
    const selectedData = productData?.variants[selectedIndex - 1];
    setValue(selectedData?.title);
    if (!label) {
      setLabel(!label);
    }
    onClickEvent(selectedData);
  };
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
      className={`${styles.flits_floating_label} ${styles.flits_select_row}`}
    >
      <select
        className={`${styles.flits_floating_select} ${styles.flits_input} ${styles.flits_variant_select}`}
        value={value}
        onChange={handleVariantChange}
      >
        <option value="" style={{ display: "none" }}></option>
        {productData?.variants?.map((variant, index) => (
          <option
            available={`${variant?.available}`}
            image={`${variant?.image}`}
            inventory_management={`${variant?.inventory_management}`}
            inventory_policy={`${variant?.inventory_policy}`}
            inventory_quantity={`${variant?.inventory_quantity}`}
            price={`${variant?.price}`}
            product_id={`${variant?.product_id}`}
            title={`${variant?.title}`}
            value={`${variant?.value}`}
            variant_available={`${variant?.variant_available}`}
            variant_id={`${variant?.variant_id}`}
            key={index}
          >
            {variant?.title}
          </option>
        ))}
      </select>
      <span className={styles.flits_highlight}></span>
      <label
        ref={tooltipRef}
        className={label ? styles.flits_floating_change : ""}
      >
        {productData?.title}
      </label>
      <div className={styles.flits_select_arrow}>
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
