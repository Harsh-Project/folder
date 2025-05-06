import { MoneyFormat } from "../../../General/MoneyFormat/MoneyFormat";
import React, { Suspense, useState } from "react";
import styles from "./RefundCreditItemDetail.module.css";
import Collapsible from "react-collapsible";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import { useRef } from "react";
import { useEffect } from "react";
import { RenderSvgString } from "../../../General/RenderSvgString";

export const RefundCreditItemDetail = (props) => {
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
    <li
      className={`${styles.flits_credit_log_item} ${
        arrow ? styles.flits_credit_border : ""
      }`}
      id={item?.key}
    >
      <div
        className={`${styles.flits_row} ${styles.flits_credit_log_detail} ${
          arrow ? styles.flits_text_bold : ""
        }`}
      >
        <div
          className={`${styles.flits_col_md_3} ${styles.flits_credit_right_border}`}
        >
          <div>
            <div
              className={`${styles.flits_credit_icon} ${styles.flits_earn_credit_icon_round}`}
            >
              {item?.credits < 0 ? (
                <RenderSvgString svgString={window?.UnoIcon?.MinusIcon} />
              ) : (
                <RenderSvgString svgString={window?.UnoIcon?.PlusIcon} />
              )}
            </div>
            <p className={styles.flits_credit_value}>
              <Suspense fallback={<></>}>
                <MoneyFormat price={Math.abs(item?.credits) / 100} />
              </Suspense>
            </p>
          </div>
          {item?.metafields?.length > 0 && (
            <div className={styles.flits_credit_dropdown} onClick={handleArrow}>
              {!arrow ? (
                <RenderSvgString svgString={window?.UnoIcon?.DropDown} />
              ) : (
                <RenderSvgString svgString={window?.UnoIcon?.DropUp} />
              )}
            </div>
          )}
        </div>
        <div
          className={`${styles.flits_col_md_6} ${styles.flits_credit_right_border} ${styles.flits_text_center}`}
        >
          <p ref={commentRef} className={styles.flits_credit_comment}>
            {item?.comment}
          </p>
        </div>
        <div className={styles.flits_col_md_3}>
          <p className={styles.flits_credit_date}>{item?.created_at}</p>
        </div>
      </div>

      <Collapsible open={arrow}>{props?.children}</Collapsible>
    </li>
  );
};
