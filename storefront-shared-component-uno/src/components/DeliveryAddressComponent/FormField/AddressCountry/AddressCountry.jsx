import styles from "./AddressCountry.module.css";
import React from "react";
import { RenderSvgString } from "../../../General/RenderSvgString";

export const AddressCountry = (props) => {
  return (
    <div className={`${styles.flits_col_md_4} ${styles.flits_mb_15}`}>
      <div className={styles.flits_input_wrap}>
      {props?.children}
        <div className={styles.flits_select_row}>
          <select
            value={props?.value}
            onChange={props?.handleChange}
            className={styles.flits_input}
            id={props?.id}
            name={props?.name}
          >
            {props?.countryData?.length > 0 &&
              props?.countryData?.map((item, index) => (
                <option value={item?.code} key={index} disabled={!item?.code}>
                  {item?.name}
                </option>
              ))}
          </select>
          <div className={styles.flits_select_arrow}><RenderSvgString svgString={window?.UnoIcon?.Select} 
/></div>
        </div>
      </div>
    </div>
  );
};
