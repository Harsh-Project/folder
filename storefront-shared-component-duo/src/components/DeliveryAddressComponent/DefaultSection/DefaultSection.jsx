import styles from "./DefaultSectionModule.module.css";
import React, { Suspense } from "react";
import { NewAddressMobile } from './NewAddressMobile/NewAddressMobile';

export const DefaultSection = (props) => {
  return (
    <>
      <Suspense  fallback={<></>}>
        <NewAddressMobile />
      </Suspense>
      <div
        className={`${styles.flits_address_list} ${styles.flits_address_list_static_row}`}
      >
        {props?.children}
      </div>
    </>
  );
};
