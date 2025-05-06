import { Suspense, useRef } from "react";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import styles from "./RefundCreditDetailed.module.css";
import React from "react";
import { useEffect } from "react";
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
      <div className={`${styles.flits_col_md_3}`}>
        <p className={styles.flits_product_tag_credit}>
          <Suspense fallback={<></>}>
            <MoneyFormat price={Math.abs(item?.credits) / 100} />
          </Suspense>
        </p>
      </div>
      <div className={`${styles.flits_col_md_6} ${styles.flits_text_center}`}>
        <a
          className={`${styles.flits_product_title} ${styles.flits_text_nowrap}`}
          target="_blank"
          ref={product}
          rel="noreferrer"
          href={`${window?.commonEndpoint?.product ?? ""}/products/${item?.product_handle}?variant=${item?.variant_id}`}
        >
          {item?.product_title}
        </a>
      </div>
      <div className={styles.flits_col_md_3}>
        <div className={styles.flits_product_tag_svg}>
          <RenderSvgString svgString={window?.UnoIcon?.TagIcon} />
        </div>
        <a
          className={styles.flits_product_tag}
          rel="noreferrer"
          target="_blank"
          href={`/search?q=${item?.tag}`}
        >
          {item?.tag}
        </a>
      </div>
    </div>
  );
};
