import styles2 from "../BackButtonComponent/BackButtonComponent.module.css";
import { GlobalStore } from "redux-micro-frontend";
import React, { Suspense } from "react";
import styles from "./NavigationLink.module.css";
import { useSelector } from "react-redux";
import { RenderSvgString } from "../../General/RenderSvgString";
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

  const handleRemoveRoute = () => {
    var takeClass = styles2.flits_hide_route;
    var takeClass2 = styles2.flits_hide_route2;
    var hideRoutes = document.getElementsByClassName(takeClass)[0];
    var hideRoutes2 = document.getElementsByClassName(takeClass2)[0];
    if (hideRoutes) hideRoutes.classList.remove(styles2.flits_hide_route);
    if (hideRoutes2) hideRoutes2.classList.remove(styles2.flits_hide_route2);
  };
  return (
    <div
      className={`${styles.flits_menu_item} ${
        activeLink === index ? styles.flits_active : ""
      } flits_navigation_${item?.path} flits_navigation_item`}
      key={index}
      name={item?.remoteApp}
    >
      <Suspense fallback={<></>}>
        <Link
          to={item?.path}
          key={index}
          id={item?.path}
          exact={"true"}
          onClick={() => {
            handleRemoveRoute();
            handleLinkClick(index);
          }}
          className={`${styles.flits_nav_link} flits_navigation_link_${item?.path} flits_navigation_link`}
        >
          <div
            className={`${styles.flits_navigation_item_wrapper} flits_navigation_link_${item?.path}_wrapper flits_navigation_link_wrapper`}
          >
            <div
              className={`${styles.flits_navigation_item} flits_navigation_link_${item?.path}_content_wrapper flits_navigation_link_content_wrapper`}
            >
              {item?.duoSvg && typeof item?.duoSvg === "string" ? (
                <span
                  dangerouslySetInnerHTML={{ __html: item?.duoSvg }}
                  className={`${styles.flits_menu_img} flits_navigation_link_${item?.path}_icon flits_navigation_link_icon`}
                ></span>
              ) : null}
              <span
                className={`${styles.flits_menu_title} flits_navigation_link_${item?.path}_label flits_navigation_link_label`}
              >
                {t(item?.label[0], item?.label[1])}
              </span>
              {item?.remoteApp === "storeFrontDeliveryAddress" && (
                <span
                  className={`${styles.flits_badge} ${styles.flits_badge_nav} flits_navigation_link_${item?.path}_badge flits_navigation_link_badge`}
                  style={{
                    opacity: 1,
                  }}
                >
                  {addressCount}
                </span>
              )}
              {item?.remoteApp === "storeFrontOrder" && (
                <span
                  className={`${styles.flits_badge} ${styles.flits_badge_nav} flits_navigation_link_${item?.path}_badge flits_navigation_link_badge`}
                  style={{ opacity: 1 }}
                >
                  {orderCount}
                </span>
              )}
              {item?.remoteApp === "storeFrontCredit" && creditData && (
                <span
                  className={`${styles.flits_badge} ${styles.flits_badge_nav} flits_navigation_link_${item?.path}_badge flits_navigation_link_badge`}
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
              {item?.remoteApp === "storeFrontRefundCredit" &&
                refundCreditApiData && (
                  <span
                    className={`${styles.flits_badge} ${styles.flits_badge_nav} flits_navigation_link_${item?.path}_badge flits_navigation_link_badge`}
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
                            Math.abs(
                              refundCreditApiData?.current_refund_credits
                            ) / 100
                          }
                        />
                      </Suspense>
                    }
                  </span>
                )}
              {item?.remoteApp === "storeFrontWishListPage" &&
                wishListCount && (
                  <span
                    className={`${styles.flits_badge} ${styles.flits_badge_nav} flits_navigation_link_${item?.path}_badge flits_navigation_link_badge`}
                    style={{
                      opacity: 1,
                    }}
                  >
                    {wishListCount?.count ?? 0}
                  </span>
                )}
            </div>
            <div
              className={`${styles.flits_arrow}  flits_navigation_link_${item?.path}_right_arrow flits_navigation_link_right_arrow`}
            >
              <RenderSvgString svgString={window?.UnoIcon?.RightSideArrow} />
            </div>
          </div>
        </Link>
      </Suspense>
    </div>
  );
};
