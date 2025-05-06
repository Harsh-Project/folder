import { GlobalStore } from "redux-micro-frontend";
import styles from "./OrderActionItem.module.css";
import React, { Suspense, useState } from "react";
import Collapsible from "react-collapsible";
import { ContactUsButton } from './ContactUsButton/ContactUsButton';
import { SecondaryButton } from './SecondaryButton/SecondaryButton';
import { PrimaryButton } from "./PrimaryButton/PrimaryButton";
import { OrderItemDetailed } from '../OrderItemDetailed/OrderItemDetailed';

export const OrderActionItem = ({ item, handleReOrder }) => {
  const [mode, setMode] = useState(false);
  const [openDiv, setOpenDiv] = useState(item?.tippyData && true);
  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;

  const handleShowOrderClick = () => {
    setMode(!mode);
  };

  const handleClose = () => {
    setOpenDiv(!openDiv);
  };

  const { t } = useTranslationLanguage();
  return (
    <>
      <div
        className={`${styles.flits_order_row} ${styles.flits_order_action_row} ${styles.flits_text_right}`}
      >
        {window?.flitsThemeAppExtensionObjects?.Metafields
          .IS_ORDER_CONTACT_US_ENABLE ? (
          <div className={styles.flits_contact_us_btn_div}>
            {openDiv && (
              <div
                className={`${styles.flits_contact_us_tooltip} ${styles.flits_tooltip_active}`}
              >
                <p className={styles.flits_notify_close} onClick={handleClose}>
                  ✕
                </p>
                <p className={styles.flits_notify_msg}>{item?.tippyData}</p>
                <div className={styles.flits_contact_us_tooltip_arrow}></div>
              </div>
            )}
            <Suspense fallback={<></>}>
              <ContactUsButton item={item} />
            </Suspense>
          </div>
        ) : null}
        <Suspense fallback={<></>}>
          <SecondaryButton
            label={
              !mode
                ? t("flits.order_page.show_order_details", "View Order")
                : t("flits.order_page.hide_order_details", "Hide Order")
            }
            handleShowOrderClick={handleShowOrderClick}
          />
        </Suspense>
        {window?.flitsThemeAppExtensionObjects?.Metafields
          ?.IS_REORDER_ENABLE ? (
          <Suspense fallback={<></>}>
            <PrimaryButton
              label={t("flits.order_page.reorder", "Re-order")}
              item={item}
              handleReOrder={handleReOrder}
            />
          </Suspense>
        ) : null}
      </div>
      <Collapsible open={mode}>
        <Suspense fallback={<></>}>
        <OrderItemDetailed item={item} />
        </Suspense>
      </Collapsible>
    </>
  );
};
