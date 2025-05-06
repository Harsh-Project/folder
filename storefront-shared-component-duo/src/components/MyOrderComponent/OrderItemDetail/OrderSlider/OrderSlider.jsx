import styles from "./OrderSliderModule.module.css";
import React, { Suspense, useEffect, useRef, useState } from "react";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import { Tabs } from "@mui/material";
import { GlobalStore } from "redux-micro-frontend";
import { MoneyFormat } from "../../../General/MoneyFormat/MoneyFormat";

function getSlots(count, slot) {
  let slots = [];
  for (let i = 0; i < count; i = i + slot) {
    let start = i;
    let end = Math.min(i + slot - 1, count - 1);
    slots.push([start, end]);
  }
  return slots;
}

export const OrderSlider = ({ item }) => {
  const getStore = GlobalStore.Get();
  // eslint-disable-next-line no-unused-vars
  const [slot, setSlot] = useState(getSlots(item?.line_items?.length, 4));
  const [currentTab, setCurrentTab] = useState(0);
  const dotValue = useRef(0);
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();
  const previous = (
    <button
      type="button"
      disabled={dotValue.current <= 0}
      onClick={() => {
        dotValue.current = Math.max(0, dotValue.current - 1);
        setCurrentTab(slot[dotValue.current][0]);
      }}
      className={`${styles.flits_slider_prev} ${styles.flits_slider_arrow}`}
    >
      <img
        style={{ height: "20px", width: "20px" }}
        alt=""
        src="data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMy43NyAyNSI+PHRpdGxlPlByb2R1Y3QgUmlnaHQ8L3RpdGxlPjxwYXRoIGlkPSJMYXllcl8yIiBkYXRhLW5hbWU9IkxheWVyIDIiIGQ9Ik0uMzcsMTMuMzksMTEuNjEsMjQuNjNhMS4yNiwxLjI2LDAsMCwwLDEuNzktMS43OEwzLDEyLjUsMTMuNCwyLjE1QTEuMjYsMS4yNiwwLDAsMCwxMS42MS4zN0wuMzcsMTEuNjFBMS4yNiwxLjI2LDAsMCwwLC4zNywxMy4zOVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgMCkiLz48L3N2Zz4="
      ></img>
    </button>
  );

  const next = (
    <button
      disabled={dotValue.current >= slot.length - 1}
      type="button"
      onClick={() => {
        dotValue.current = Math.min(slot?.length - 1, dotValue.current + 1);
        setCurrentTab(slot[dotValue.current][1]);
      }}
      className={`${styles.flits_slider_next} ${styles.flits_slider_arrow}`}
    >
      <img
        style={{ height: "20px", width: "20px" }}
        alt=""
        src="data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMy43NyAyNSI+PHRpdGxlPlByb2R1Y3QgUmlnaHQ8L3RpdGxlPjxwYXRoIGlkPSJMYXllcl8yIiBkYXRhLW5hbWU9IkxheWVyIDIiIGQ9Ik0xMy40LDExLjYxLDIuMTYuMzdBMS4yNiwxLjI2LDAsMCwwLC4zNywyLjE1TDEwLjcyLDEyLjUuMzcsMjIuODVhMS4yNiwxLjI2LDAsMCwwLDEuNzksMS43OEwxMy40LDEzLjM5QTEuMjYsMS4yNiwwLDAsMCwxMy40LDExLjYxWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAwKSIvPjwvc3ZnPg=="
      ></img>
    </button>
  );

  const nameRef = useRef([]);

  useEffect(() => {
    nameRef.current.forEach((productTitleRef, index) => {
      if (productTitleRef) {
        if (productTitleRef._tippy) {
          productTitleRef._tippy.setContent(item?.line_items[index]?.title);
        } else {
          tippy(productTitleRef, {
            content: item?.line_items[index]?.title,
            placement: "top",
          });
        }
      }
    });
  }, [item?.line_items]);

  return (
    <div
      className={`${styles.flits_line_items} ${styles.flits_line_items_slick} ${styles.flits_slider_initialized} ${styles.flits_slider}`}
    >
      {previous}
      <Tabs
        value={currentTab}
        variant="scrollable"
        allowScrollButtonsMobile={false}
        indicatorColor={"red"}
        // centered={true}
        // selectionFollowsFocus={true}
        scrollButtons={false}
      >
        {item?.line_items?.map((item1, index) => (
          <div
            className={`${styles.flits_order_item} ${styles.flits_slider_slide} ${styles.flits_slider_slide_current}`}
            key={index}
            style={{ width: "118px" }}
          >
            <div className={`${styles.flits_product_image_thumbnail}`}>
              <img src={`https:${item1?.image}`} alt={item1?.title} />
              <span
                className={`${styles.flits_product_quantity_badge} ${styles.flits_badge}`}
              >
                {item1?.quantity}
              </span>
              {item1?.available === "false" && (
                <div className={styles.flits_ribbion_overlay}>
                  <span
                    className={`${styles.flits_bottom_full} ${styles.flits_ribbion} ${styles.flits_red}`}
                  >
                    {t("flits.order_page.sold_out", "Sold Out")}
                  </span>
                </div>
              )}
              {item1?.publish_at === "" && (
                <>
                  <span className={styles.flits_product_not_exist}>
                    {t("flits.order_page.product_unavailable", "Unavailable")}
                  </span>
                  <div className={styles.flits_ribbion_overlay}>
                    <span
                      className={`${styles.flits_bottom_full} ${styles.flits_ribbion} ${styles.flits_red}`}
                    >
                      {t("flits.order_page.product_unavailable", "Unavailable")}
                    </span>
                  </div>
                </>
              )}
            </div>
            <a href={item1?.url}>
              <p
                className={`${styles.flits_product_name} ${styles.flits_link} ${styles.flits_text_ellipsis}`}
                ref={(element) => (nameRef.current[index] = element)}
              >
                {item1?.title}
              </p>
            </a>
            <p className={styles.flits_product_price}>
              <Suspense fallback={<></>}>
                <MoneyFormat price={item1?.value_price / 100} />
              </Suspense>
            </p>
          </div>
        ))}
      </Tabs>
      {next}
    </div>
  );
};
