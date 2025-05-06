import Collapsible from "react-collapsible";
import { GlobalStore } from "redux-micro-frontend";
import styles from "./OrderItemDetailModule.module.css";
import React, { Suspense } from "react";
import { OrderSlider } from "./OrderSlider/OrderSlider"
import { MoneyFormat } from "../../General/MoneyFormat/MoneyFormat"

export const OrderItemDetail = ({ orderMode, item }) => {
  const getStore = GlobalStore.Get();
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();

  const getSubTotal = () => {
    let subtotal = Math.abs(item?.order_subtotal);
    let total = subtotal;

    for (let i = 0; i < item?.discount?.length; i++) {
      total += Math.abs(item?.discount[i].rate);
    }

    return total;
  };

  return (
    <Collapsible open={orderMode}>
      <div className={styles.flits_collaps_order_details}>
        <Suspense fallback={<></>}>
          <OrderSlider item={item} />
        </Suspense>
        <div className={styles.flits_order_price_breakdown}>
          <div className={styles.flits_price_row}>
            <div>
              <p>{t("flits.order_page.subtotal", "Sub Total")}</p>
            </div>
            <p className={styles.flits_strong}>
              <Suspense fallback={<></>}>
                <MoneyFormat price={getSubTotal() / 100} />
              </Suspense>
            </p>
          </div>
          {item?.discount?.length > 0 && (
            <div className={styles.flits_price_row}>
              <div>
                <p>{t("flits.order_page.discount_code", "Discount")}</p>
                {item?.discount?.map((data, index) => (
                  <small className={styles.flits_discount_code} key={index}>
                    {data?.title}
                  </small>
                ))}
              </div>
              <p className={styles.flits_strong}>
                <Suspense fallback={<></>}>
                  <MoneyFormat price={item?.discount[0]?.rate / 100} />
                </Suspense>
              </p>
            </div>
          )}
          <div className={styles.flits_price_row}>
            <div>
              <p>
                {t("flits.order_page.shipping_and_handling", "Shipping Cost")}
              </p>
            </div>
            <p className={styles.flits_strong}>
              <Suspense fallback={<></>}>
                <MoneyFormat
                  price={Math.abs(parseFloat(item?.order_shipping_cost)) / 100}
                />
              </Suspense>
            </p>
          </div>
          {item?.tax?.length > 0 &&
            item?.tax?.map((data, index) => (
              <div className={styles.flits_price_row} key={index}>
                <div>
                  <p>{`${data?.title}%`}</p>
                </div>
                <p className={styles.flits_strong}>
                  <Suspense fallback={<></>}>
                    <MoneyFormat price={data?.rate / 100} />
                  </Suspense>
                </p>
              </div>
            ))}
        </div>
      </div>
    </Collapsible>
  );
};
