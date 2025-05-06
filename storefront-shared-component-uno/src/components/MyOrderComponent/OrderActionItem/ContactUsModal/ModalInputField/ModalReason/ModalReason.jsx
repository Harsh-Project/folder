import styles from "./ModalReason.module.css";
import { GlobalStore } from "redux-micro-frontend";
import React from "react";
import { Suspense } from "react";
import { RenderSvgString } from "../../../../../General/RenderSvgString";
import { FlitsLabel } from "../../../../../Form/FlitsLabel/FlitsLabel";

export const ModalReason = (props) => {
  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;
  const { t } = useTranslationLanguage();

  const handleValueChange = (e) => {
    props?.onClickEvent(e);
  };
  return (
    <div className={`${styles.flits_col_md_12} ${styles.flits_popup_mb_15}`}>
      <div className={styles.flits_input_wrap}>
        <Suspense fallback={<></>}>
          <FlitsLabel {...props} />
        </Suspense>
        <div className={styles.flits_select_row}>
          <select
            className={`${styles.flits_input} ${styles.flits_form_reason}`}
            name={props?.name}
            onChange={handleValueChange}
            id={props?.id}
          >
            <option value="" disabled={true} selected={true}>
              {t("flits.order_contact_us.select_any_reason", "Select a Reason")}
            </option>
            {props?.option?.map((data, index) => (
              <option value={data.value} key={index}>
                {data.title}
              </option>
            ))}
          </select>
          <div className={styles.flits_select_arrow}><RenderSvgString svgString={window?.UnoIcon?.Select} 
/></div>
        </div>
      </div>
      {props?.reasonError && props?.reasonError?.length > 0 && (
        <small className={styles.flits_form_alert}>
          <span className={styles.flits_error_icon}></span>
          {props?.reasonError}
        </small>
      )}
    </div>
  );
};
