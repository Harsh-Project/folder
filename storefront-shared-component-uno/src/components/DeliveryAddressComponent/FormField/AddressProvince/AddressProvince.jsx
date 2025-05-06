import styles from "./AddressProvince.module.css";
import React from "react";
import { RenderSvgString } from "../../../General/RenderSvgString";

export const AddressProvince = (props) => {
  return (
    props?.provinceData[props?.formData?.country]?.length > 0 && (
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
              {props?.provinceData[props?.formData?.country]?.map((item, index) => (
                <option value={item?.code} key={index}>
                  {item?.name}
                </option>
              ))}
            </select>
            <div className={styles.flits_select_arrow}><RenderSvgString svgString={window?.UnoIcon?.Select} 
/></div>
          </div>
        </div>
      </div>
    )
  );
};
