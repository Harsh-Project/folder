import "tippy.js/dist/tippy.css";
const tippy = await import("tippy.js").then((module) => module.default);
const styles = await import("./SelectDropDownSimple.module.css").then(
  (module) => module.default
);
const { React, useRef } = await import("react").then((module) => ({
  React: module.default,
  useRef: module.useRef,
}));
const useEffect = await import("react").then((module) => module.useEffect);

export const SelectDropDownSimple = ({ item, productData }) => {
  const label = false;
  const tooltipLabelRef = useRef(null);

  useEffect(() => {
    if (tooltipLabelRef.current) {
      tippy(tooltipLabelRef.current, {
        content: productData?.title,
        placement: "top",
        arrow: true,
        theme: "light",
      });
    }
  }, [productData?.title]);
  return (
    <div
      ref={tooltipLabelRef}
      className={`${styles.flits_floating_label} ${styles.flits_select_row} ${styles.flits_without_select}`}
    >
      <select
        disabled={true}
        className={`${styles.flits_floating_select} ${styles.flits_input} ${styles.flits_variant_select}`}
        value={productData?.variants[0]?.title}
      >
        <option value="" style={{ display: "none" }}></option>
      </select>
      <span className={styles.flits_highlight}></span>
      <label
        className={label ? styles.flits_floating_change : ""}
        ref={tooltipLabelRef}
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
