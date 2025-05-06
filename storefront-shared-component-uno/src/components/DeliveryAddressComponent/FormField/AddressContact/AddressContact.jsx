import styles from "./AddressContact.module.css";
import React, { Suspense } from "react";
import { AddressContactInputEditMode } from '../AddressContactInputEditMode/AddressContactInputEditMode';

export const AddressContact = (props) => {
  return (
    <div className={`${styles.flits_col_md_4} ${styles.flits_mb_15}`}>
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
  );
};
