import styles from "./AddressContactModule.module.css";
import React, { Suspense } from "react";
import { AddressContactInputEditMode } from '../AddressContactInputEditMode/AddressContactInputEditMode';

export const AddressContact = (props) => {
  return (
    <>
      <div
        className={`${styles.flits_col_md_4} ${styles.flits_col_sm_6} ${styles.flits_mb_15} ${styles.flits_desktop}`}
      >
        <div
          className={`${styles.flits_phone_with_country_div} ${styles.flits_address_phone_with_country_div}`}
        >
          <div className={styles.flits_input_wrap}>
            {props?.children}
            <Suspense fallback={<></>}>
              <AddressContactInputEditMode
                readOnly={false}
                type={props?.type}
                disabled={false}
                name={props?.name}
                edit={true}
              />
            </Suspense>
          </div>
        </div>
      </div>
      <div
        className={`${styles.flits_col_xs_12} ${styles.flits_px_0} ${styles.flits_mobile}`}
      >
        <div
          className={`${styles.flits_phone_with_country_div} ${styles.flits_address_phone_with_country_div}`}
        >
          <div className={styles.flits_input_wrap}>
            <Suspense fallback={<></>}>
              <AddressContactInputEditMode
                placeholder={props?.placeholder}
                readOnly={false}
                type={props?.type}
                disabled={false}
                name={props?.name}
                edit={true}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
};
