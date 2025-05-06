import { GlobalStore } from "redux-micro-frontend";
import React, { Suspense, useEffect, useState } from "react";
import styles from "./OrderItemDetailed.module.css";
import { MoneyFormat } from "../../General/MoneyFormat/MoneyFormat";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

export const OrderItemDetailed = ({ item }) => {
  const getStore = GlobalStore.Get();
  const [isMobile, setIsMobile] = useState(false)
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;

  const { t } = useTranslationLanguage();

  const getSubTotal = () => {
    let subtotal = Math.abs(item?.order_subtotal);
    let total = subtotal;

    for (let i = 0; i < item?.discount?.length; i++) {
      total += Math.abs(item?.discount[i].rate);
    }

    return total;
  };

  useEffect(() => {
    const handleResizeChange = () => {
      setIsMobile(window?.matchMedia("(max-width: 768px)")?.matches)
    }
    window.addEventListener("resize",handleResizeChange);
    return () => {
      window.removeEventListener("resize",handleResizeChange);
    };
  }, []);

  return (
    <div className={styles.flits_order_details_summary}>
      <div className={styles.flits_address_row}>
        <div className={styles.flits_address_section}>
          <div
            className={`${styles.flits_shipping_address} ${styles.flits_address_box}`}
          >
            <p
              className={`${styles.flits_address_label} ${styles.flits_title}`}
            >
              {t("flits.order_page.shipping_address", "Shipping Address")}
            </p>
            <p>
              {item?.order_shipping_address?.name}
              {item?.order_shipping_address?.name !== "" && <br />}
              {item?.order_shipping_address?.company}
              {item?.order_shipping_address?.company !== "" && <br />}
              {item?.order_shipping_address?.address1}
              {item?.order_shipping_address?.address1 !== "" && <br />}
              {item?.order_shipping_address?.address2}
              {item?.order_shipping_address?.address2 !== "" && <br />}
              {`${item?.order_shipping_address?.zip} ${item?.order_shipping_address?.city} ${item?.order_shipping_address?.province_code}`}
              {(item?.order_shipping_address?.zip !== "" ||
                item?.order_shipping_address?.city !== "" ||
                item?.order_shipping_address?.province_code !== "") && <br />}
              {item?.order_shipping_address?.country}
            </p>
          </div>
          <div
            className={`${styles.flits_shipping_address} ${styles.flits_address_box}`}
          >
            <p
              className={`${styles.flits_address_label} ${styles.flits_title}`}
            >
              {t("flits.order_page.billing_address", "Billing Address")}
            </p>
            <p>
              {item?.order_billing_address?.name}
              {item?.order_billing_address?.name !== "" && <br />}
              {item?.order_billing_address?.company}
              {item?.order_billing_address?.company !== "" && <br />}
              {item?.order_billing_address?.address1}
              {item?.order_billing_address?.address1 !== "" && <br />}
              {item?.order_billing_address?.address2}
              {item?.order_billing_address?.address2 !== "" && <br />}
              {`${item?.order_billing_address?.zip} ${item?.order_billing_address?.city} ${item?.order_billing_address?.province_code}`}
              {(item?.order_billing_address?.zip !== "" ||
                item?.order_billing_address?.city !== "" ||
                item?.order_billing_address?.province_code !== "") && <br />}
              {item?.order_billing_address?.country}
            </p>
          </div>
        </div>
      </div>
      <div className={styles.flits_cost_breakup_row}>
        <div className={styles.flits_order_cost_breakup}>
          <p className={styles.flits_title}>
            {t("flits.order_page.cost_breakup", "Cost Breakup")}
          </p>
          <div
            className={`${styles.flits_order_row} ${styles.flits_order_subtotal}`}
          >
            <span className={styles.flits_label}>
              {t("flits.order_page.subtotal", "Sub Total")}
            </span>
            <span className={styles.flits_value}>
              <Suspense fallback={<></>}>
                <MoneyFormat price={getSubTotal() / 100} />
              </Suspense>
            </span>
          </div>
          {item?.discount?.length > 0 &&
            item?.discount?.map((data, index) => (
              <div
                key={index}
                className={`${styles.flits_order_row} ${styles.flits_order_discount}`}
              >
                <span
                  ref={isMobile ? (element) => {
                    if (element) {
                      const tippyInstance = tippy(element, {
                        content: data?.title,
                        placement: "top",
                        arrow: true,
                        theme: "light",
                      });

                      element.addEventListener("click", () => {
                        tippyInstance.show();
                      });
                    }
                  } : null}
                  className={styles.flits_label}
                >
                  {t("flits.order_page.discount_code", "Discount")}:{" "}
                  {data?.title}
                </span>
                <span className={styles.flits_value}>
                  <Suspense fallback={<></>}>
                    <MoneyFormat price={data?.rate / 100} />
                  </Suspense>
                </span>
              </div>
            ))}
          {item?.tax?.length > 0 &&
            item?.tax?.map((data, index) => (
              <div
                key={index}
                className={`${styles.flits_order_row} ${styles.flits_order_tax}`}
              >
                <span className={styles.flits_label}>{`${data?.title}%`}</span>
                <span className={styles.flits_value}>
                  <Suspense fallback={<></>}>
                    <MoneyFormat price={data?.rate / 100} />
                  </Suspense>
                </span>
              </div>
            ))}
          <div
            className={`${styles.flits_order_row} ${styles.flits_order_shipping_price}`}
          >
            <span className={styles.flits_label}>
              {t("flits.order_page.shipping_and_handling", "Shipping Cost")}
            </span>
            <span className={styles.flits_value}>
              <Suspense fallback={<></>}>
                <MoneyFormat
                  price={Math.abs(item?.order_shipping_cost) / 100}
                />
              </Suspense>
            </span>
          </div>
          <div
            className={`${styles.flits_order_row} ${styles.flits_order_grand_total}`}
          >
            <span className={styles.flits_label}>
              {t("flits.order_page.grand_total", "Grand Total")}
            </span>
            <span className={styles.flits_value}>
              <Suspense fallback={<></>}>
                <MoneyFormat price={item?.order_total / 100} />
              </Suspense>
            </span>
          </div>
          <div
            className={`${styles.flits_order_row} ${styles.flits_order_payment_type}`}
          >
            <span className={styles.flits_label}>
              {t("flits.order_page.payment_type", "Payment Type")}
            </span>
            <span
              style={{ textTransform: "capitalize" }}
              className={styles.flits_value}
            >
              {item?.order_payment_type}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
