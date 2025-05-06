import styles from "./PrimaryButton.module.css";
import React, { Suspense } from "react";
import { useState } from "react";
import { SnackBar } from '../../../General/SnackBar/SnackBar';

export const PrimaryButton = (props) => {
  const [snackBarMode, setSnackBarMode] = useState(null);
  const [message, setMessage] = useState("");

  const isDisabledOrNot = () => {
    const data = props?.item?.line_items;

    for (let i = 0; i < data?.length; i++) {
      if (data[i].available === "true") {
        return false;
      }
    }

    return true;
  };

  const handleClick = async () => {
    props?.handleReOrder(setMessage, props?.item, setSnackBarMode);
  };
  return (
    <>
      <button
        disabled={isDisabledOrNot()}
        className={`${styles.flits_button} ${styles.flits_primary_btn} ${styles.flits_mt_10} ${styles.fits_reorder_btn}`}
        onClick={handleClick}
        type="button"
      >
        {props?.label}
      </button>

      <Suspense fallback={<></>}>
        <SnackBar mode={snackBarMode} message={message} />
      </Suspense>
    </>
  );
};
