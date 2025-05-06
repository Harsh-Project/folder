import styles from "./ReOrderButtonModule.module.css";
import React, { Suspense, useState } from "react";
import { GlobalStore } from "redux-micro-frontend";
import { SnackBar } from '../../../../General/SnackBar/SnackBar';

export const ReOrderButton = (props) => {
  const { handleReOrder, item } = props;
  const [snackBarMode, setSnackBarMode] = useState(null);
  const [message, setMessage] = useState("");
  const getStore = GlobalStore.Get();
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();

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
    handleReOrder(setMessage, item, setSnackBarMode);
  };
  return (
    <>
      <button
        disabled={isDisabledOrNot()}
        className={`${styles.flits_button} ${styles.flits_primary_btn} ${styles.flits_mx_15} ${styles.flits_my_10} ${styles.fits_reorder_btn} ${styles.flits_margin}`}
        onClick={handleClick}
        type="button"
      >
        {t("flits.order_page.reorder", "Re-order")}
      </button>
      <Suspense fallback={<></>}>
        <SnackBar mode={snackBarMode} message={message} />
      </Suspense>
    </>
  );
};
