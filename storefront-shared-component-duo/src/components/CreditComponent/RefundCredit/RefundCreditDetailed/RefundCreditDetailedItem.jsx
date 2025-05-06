import styles from "./RefundCreditDetailedSectionModule.module.css";
import React, { Suspense, useEffect, useRef } from "react";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import { RenderSvgString } from "../../../General/RenderSvgString";
import { MoneyFormat } from "../../../General/MoneyFormat/MoneyFormat";

export const RefundCreditDetailedItem = (props) => {
  const { item } = props;

  const product = useRef(null);

  useEffect(() => {
    if (product.current) {
      if (product.current._tippy) {
        product.current._tippy.setContent(item?.product_title);
      } else {
        tippy(product.current, {
          content: item?.product_title,
          placement: "top",
        });
      }
    }
  }, [item?.product_title]);
  return (
    <div className={`${styles.flits_row}`}>
      <div
        className={`${styles.flits_col_sm_3} ${styles.flits_d_flex} ${styles.flits_align_items_center}`}
      >
        <RenderSvgString svgString={window?.DuoIcon?.TagIcon} />
        <span>
          <a
            className={styles.flits_product_tag_name}
            // rel="noreferrer"
            href={`/search?q=${item?.tag}`}
          >
            {item?.tag}
          </a>
        </span>
      </div>
      <div className={styles.flits_col_sm_4}>
        <span>
          <a
            className={`${styles.flits_text_ellipsis} ${styles.flits_product_title} ${styles.flits_link}`}
            // rel="noreferrer"
            ref={product}
            href={`${window?.commonEndpoint?.product ?? ""}/products/${item?.product_handle}?variant=${item?.variant_id}`}
          >
            {item?.product_title}
          </a>
        </span>
      </div>
      <div className={`${styles.flits_col_sm_3} ${styles.flits_text_center}`}>
        <span className={styles.flits_product_credit}>
          <Suspense fallback={<></>}>
            <MoneyFormat price={Math.abs(item?.credits) / 100} />
          </Suspense>
        </span>
      </div>
    </div>
  );
};
