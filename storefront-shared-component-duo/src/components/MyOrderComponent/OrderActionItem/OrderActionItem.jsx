import { GlobalStore } from "redux-micro-frontend";
import styles from "./OrderActionItemModule.module.css";
import React, { Suspense, useState } from "react";
import { SecondaryButton } from "./SecondaryButton/SecondaryButton"
import { PrimaryButton } from "./PrimaryButton/PrimaryButton"
import { ContactUsButton } from "./ContactUsButton/ContactUsButton"
import { OrderItemDetailed } from "../OrderItemDetailed/OrderItemDetailed"

export const OrderActionItem = ({ item }) => {
  const [mode, setMode] = useState(false);
  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;

  const handleShowOrderClick = () => {
    setMode(!mode);
  };

  const { t } = useTranslationLanguage();
  return (
    <>
      <div
        className={`${styles.flits_order_row} ${styles.flits_order_action_row} ${styles.flits_text_right}`}
      >
        {window?.flitsThemeAppExtensionObjects?.Metafields
          .IS_ORDER_CONTACT_US_ENABLE && (
          <div className={styles.flits_contact_us_btn_div}>
            <Suspense fallback={<></>}>
              <ContactUsButton
                label={t(
                  "flits.order_contact_us.contact_us_button",
                  "Contact Us"
                )}
                item={item}
              />
            </Suspense>
          </div>
        )}
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
          ?.IS_REORDER_ENABLE && (
          <Suspense fallback={<></>}>
            <PrimaryButton
              label={t("flits.order_page.reorder", "Re-order")}
              item={item}
            />
          </Suspense>
        )}
      </div>
      {mode && (
        <Suspense fallback={<></>}>
          <OrderItemDetailed item={item} />
        </Suspense>
      )}
    </>
  );
};
