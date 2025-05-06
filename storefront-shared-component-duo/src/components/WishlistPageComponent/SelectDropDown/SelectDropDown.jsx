import { RenderSvgString } from "../../General/RenderSvgString";

const styles = await import("./SelectDropDownModule.module.css").then((module) => module.default);
const  { useState, React } = await import("react").then((module) => ({
  useState: module.useState,
  React: module.default
}));

export const SelectDropDown = ({ item, productData, onClickEvent }) => {
  const [value, setValue] = useState("");
  const [label, setLabel] = useState(false);
  const handleVariantChange = (e) => {
    const selectedIndex = e.target.selectedIndex;
    const selectedData = productData?.variants[selectedIndex];
    setValue(selectedData?.title);
    if (!label) {
      setLabel(!label);
    }
    onClickEvent(selectedData);
  };
  return (
    <div className={styles.flits_select_row}>
      <select
        className={`${styles.flits_input} ${styles.flits_variant_select}`}
        value={value}
        onChange={handleVariantChange}
      >
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
      <div className={styles.flits_select_arrow}><RenderSvgString svgString={window?.DuoIcon?.Select} /></div>
    </div>
  );
};
