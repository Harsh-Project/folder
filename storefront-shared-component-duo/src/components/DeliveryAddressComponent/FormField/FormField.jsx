import styles from "./FormFieldModule.module.css";
import React from "react";
import { RenderSvgString } from "../../General/RenderSvgString";

export const FormField = (props) => {
  const {
    Company,
    Default,
    Province,
    Postal,
    Address1,
    City,
    Country,
    Contact,
    Address2,
    handleResetClick,
    FirstName,
    Save,
    LastName,
  } = props;
  return (
    <>
      <div className={styles.flits_row}>
        <FirstName />
        <LastName />
      </div>
      <div className={styles.flits_row}>
        <Address1 />
        <Address2 />
      </div>
      <div className={`${styles.flits_row} ${styles.flits_desktop}`}>
        <Company />
        <Postal />
        <Contact />
        <City />
        <Country />
        <Province />
      </div>
      <div className={`${styles.flits_mobile} ${styles.flits_row}`}>
        <Company />
        <Postal />
        <Contact />
      </div>
      <div className={`${styles.flits_mobile} ${styles.flits_row}`}>
        <City />
        <Country />
        <Province />
      </div>
      <div
        className={`${styles.flits_row} ${styles.flits_mt_30} ${styles.flits_d_flex} ${styles.flits_align_items_center} ${styles.flits_desktop}`}
      >
        <Default />
        <Save />
      </div>
      <div className={`${styles.flits_mobile} ${styles.flits_row}`}>
        <Default />
      </div>
      <div className={`${styles.flits_mobile} ${styles.flits_row}`}>
        <Save />
      </div>
      <div onClick={handleResetClick} className={styles.flits_button_float}>
        <div
          className={`${styles.flits_button_icon} ${styles.flits_address_cancel_btn}`}
        >
          <RenderSvgString svgString={window?.DuoIcon?.CancelAddressForm} />
        </div>
      </div>
    </>
  );
};
