import React, { Suspense, useEffect, useRef, useState } from "react";
import styles from "./CreditItemDetailModule.module.css";
import Collapsible from "react-collapsible";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import { RenderSvgString } from "../../General/RenderSvgString";
import { MoneyFormat } from "../../General/MoneyFormat/MoneyFormat";

export const CreditItemDetail = (props) => {
  const { item } = props;
  const [arrow, setArrow] = useState(false);
  const handleArrow = () => {
    setArrow(!arrow);
  };

  const commentRef = useRef(null);

  useEffect(() => {
    if (commentRef.current) {
      if (commentRef.current._tippy) {
        commentRef.current._tippy.setContent(item?.comment);
      } else {
        tippy(commentRef.current, {
          content: item?.comment,
          placement: "top",
        });
      }
    }
  }, [item?.comment]);

  return (
    <div className={`${styles.flits_credit_table_item}`}>
      <div
        className={`${styles.flits_row} ${styles.flits_d_flex} ${styles.flits_align_items_center}`}
      >
        <div
          className={`${styles.flits_col_md_3} ${styles.flits_d_flex} ${styles.flits_align_items_center} ${styles.flits_justify_content_between}`}
        >
          <span className={styles.flits_credit_date}>{item?.created_at}</span>
          {item?.metafields?.length > 0 && (
            <div
              className={styles.flits_credit_dropdown_btn}
              onClick={handleArrow}
            >
              {!arrow ? (
                <RenderSvgString svgString={window?.DuoIcon?.DropDown} />
              ) : (
                <RenderSvgString svgString={window?.DuoIcon?.DropUp} />
              )}
            </div>
          )}
        </div>
        <div className={`${styles.flits_col_sm_4} ${styles.flits_d_flex}`}>
          <p
            ref={commentRef}
            className={`${styles.flits_text_ellipsis} ${styles.flits_credit_comment}`}
          >
            {item?.comment}
          </p>
        </div>
        <div className={styles.flits_col_sm_3}>
          <span
            className={`${styles.flits_crdr} ${
              item?.credits < 0 ? styles.flits_dr : styles.flits_cr
            }`}
          >
            <span className={styles.flits_crdr_sign}>
              {item?.credits > 0 ? "+" : "-"}
            </span>
            <Suspense fallback={<></>}>
              <MoneyFormat price={Math.abs(item?.credits) / 100} />
            </Suspense>
          </span>
        </div>
        <div className={styles.flits_col_sm_2}>
          <span
            className={`${styles.flits_strong} ${styles.flits_credit_balance}`}
          >
            {parseFloat(item?.current_credits) < 0 ? (
              "- "
            ) : (
              <>
                {`\u00A0`}
                {`\u00A0`}
              </>
            )}
            {
              <Suspense fallback={<></>}>
                <MoneyFormat price={Math.abs(item?.current_credits) / 100} />
              </Suspense>
            }
          </span>
        </div>
        <div className={styles.flits_col_xs_8}>
          <span
            className={`${styles.flits_text_ellipsis} ${styles.flits_credit_comment} ${styles.flits_strong}`}
          >
            {item?.comment}
          </span>
          <div
            className={`${styles.flits_d_flex} ${styles.flits_align_items_center}`}
          >
            <span
              className={`${styles.flits_credit_date} ${styles.flits_nowwrap} ${styles.flits_mr_10}`}
            >
              {item?.created_at}
            </span>
            <span
              className={`${styles.flits_strong} ${styles.flits_credit_balance} ${styles.flits_mr_10}`}
            >
              <Suspense fallback={<></>}>
                <MoneyFormat price={Math.abs(item?.current_credits) / 100} />
              </Suspense>
            </span>
            {item?.metafields?.length > 0 && (
              <div
                className={styles.flits_credit_dropdown_btn}
                onClick={handleArrow}
              >
                {!arrow ? (
                  <RenderSvgString svgString={window?.DuoIcon?.DropDown} />
                ) : (
                  <RenderSvgString svgString={window?.DuoIcon?.DropUp} />
                )}
              </div>
            )}
          </div>
        </div>
        <div className={styles.flits_col_xs_4}>
          <span
            className={`${styles.flits_crdr} ${
              item?.credits < 0 ? styles.flits_dr : styles.flits_cr
            }`}
          >
            <span className={styles.flits_crdr_sign}>
              {item?.credits > 0 ? "+" : "-"}
            </span>
            <Suspense fallback={<></>}>
              <MoneyFormat price={Math.abs(item?.credits) / 100} />
            </Suspense>
          </span>
        </div>
      </div>
      <Collapsible open={arrow}>{props?.children}</Collapsible>
    </div>
  );
};
