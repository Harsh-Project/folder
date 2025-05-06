import { GlobalStore } from "redux-micro-frontend";
import React, { Suspense } from "react";
import styles from "./NavigationLinkModule.module.css";
import { useSelector } from "react-redux";
import { MoneyFormat } from "../../General/MoneyFormat/MoneyFormat";
import { Link } from "react-router-dom";

export const NavigationLinkWithBadge = ({
  item,
  handleLinkClick,
  index,
  activeLink,
}) => {
  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;
  const addressCount = useSelector(
    (state) => state.storeFrontDeliveryAddress.addressCount
  );
  let orderCount = parseInt(
    window?.flitsThemeAppExtensionObjects?.customer?.order_count
  );
  if (
    parseInt(window?.flitsThemeAppExtensionObjects?.customer?.order_count) === 0
  ) {
    orderCount = parseInt(
      window?.flitsThemeAppExtensionObjects?.customer?.orderSize
    );
  }
  const wishListCount = useSelector(
    (state) => state.storeFrontWishList.wishListCount
  );
  const { creditData, refundCreditApiData } = useSelector(
    (state) => state.storeFrontCredit
  );

  const { t } = useTranslationLanguage();

  return (
    <div
      className={`${styles.flits_menu_item} ${styles.flits_slider_slide} ${
        styles.flits_slider_slide_current
      } ${
        activeLink === index ? styles.flits_menu_active : ""
      } flits_navigation_${item?.path} flits_navigation_item`}
      key={index}
      name={item?.remoteApp}
    >
      <Suspense fallback={<></>}>
        <Link
          id={item?.path}
          to={item?.path}
          key={index}
          exact={"true"}
          onClick={() => {
            handleLinkClick(index);
          }}
          className={`${styles.flits_nav_link} flits_navigation_link_${item?.path} flits_navigation_link`}
        >
          {item?.duoSvg ? (
            typeof item?.duoSvg === "string" ? (
              <span
                dangerouslySetInnerHTML={{ __html: item?.duoSvg }}
                className={`${styles.flits_menu_img} flits_navigation_link_${item?.path}_icon flits_navigation_link_icon`}
              ></span>
            ) : (
              <span
                className={`${styles.flits_menu_img} flits_navigation_link_${item?.path}_icon flits_navigation_link_icon`}
              >
                {item?.duoSvg}
              </span>
            )
          ) : null}
          <span
            className={`${styles.flits_menu_title} flits_navigation_link_${item?.path}_label flits_navigation_link_label`}
          >
            {t(item?.label[0], item?.label[1])}
          </span>
        </Link>
      </Suspense>
      {item?.remoteApp === "storeFrontDeliveryAddress" && (
        <span
          className={`${styles.flits_menu_badge} ${styles.flits_badge} flits_navigation_link_${item?.path}_badge flits_navigation_link_badge`}
          style={{
            opacity: 1,
          }}
        >
          {addressCount}
        </span>
      )}
      {item?.remoteApp === "storeFrontOrder" && (
        <span
          className={`${styles.flits_menu_badge} ${styles.flits_badge} flits_navigation_link_${item?.path}_badge flits_navigation_link_badge`}
          style={{ opacity: 1 }}
        >
          {orderCount}
        </span>
      )}
      {item?.remoteApp === "storeFrontCredit" && creditData && (
        <span
          className={`${styles.flits_menu_badge} ${styles.flits_badge} flits_navigation_link_${item?.path}_badge flits_navigation_link_badge`}
          style={{
            opacity: 1,
          }}
        >
          {parseFloat(creditData?.customer?.credits) < 0 ? "- " : ""}
          {
            <Suspense fallback={<></>}>
              <MoneyFormat
                price={Math.abs(creditData?.customer?.credits) / 100}
              />
            </Suspense>
          }
        </span>
      )}
      {item?.remoteApp === "storeFrontRefundCredit" && refundCreditApiData && (
        <span
          className={`${styles.flits_menu_badge} ${styles.flits_badge} flits_navigation_link_${item?.path}_badge flits_navigation_link_badge`}
          style={{
            opacity: 1,
          }}
        >
          {parseFloat(refundCreditApiData?.current_refund_credits) < 0
            ? "- "
            : ""}
          {
            <Suspense fallback={<></>}>
              <MoneyFormat
                price={
                  Math.abs(refundCreditApiData?.current_refund_credits) / 100
                }
              />
            </Suspense>
          }
        </span>
      )}
      {item?.remoteApp === "storeFrontWishListPage" && wishListCount && (
        <span
          className={`${styles.flits_menu_badge} ${styles.flits_badge} flits_navigation_link_${item?.path}_badge flits_navigation_link_badge`}
          style={{
            opacity: 1,
          }}
        >
          {wishListCount?.count ?? 0}
        </span>
      )}
    </div>
  );
};
