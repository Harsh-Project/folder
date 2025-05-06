import styles from "./CustomPageWrapperModule.module.css";
import React, { Suspense, useEffect, useState } from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useSelector } from "react-redux";
import { RenderSvgString } from "../../General/RenderSvgString";
import { UserBox } from "../../General/UserBox/UserBox";

export const CustomPageWrapper = (props) => {
  const getStore = GlobalStore.Get();
  const firstNameInitial = useSelector(
    (state) => state.storeFrontMyProfile.firstNameInitial
  );
  const lastNameInitial = useSelector(
    (state) => state.storeFrontMyProfile.lastNameInitial
  );
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();

  useEffect(() => {
    const handleResize = () => {
      if (props?.path === "subscriptions/list") {
        const getAppstleNeedToLoad = document?.querySelectorAll(
          ".AppstleCustomerPortal"
        )?.[0]?.children;
        if (getAppstleNeedToLoad?.length === 0) {
          window.appstleSubscriptionCustomerPortalInit(
            ".AppstleCustomerPortal"
          );
        }
      }
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const isSmallScreen = screenWidth <= 767;

  return (
    <>
      {!isSmallScreen ? (
        <div>
          <div
            className={`${styles.flits_account_box_header} ${styles.flits_desktop}`}
          >
            <div className={styles.flits_header_title}>
              {t(props?.label[0], props?.label[1]).toLowerCase()}
            </div>
          </div>
          <div
            className={`${styles.flits_container_box} ${styles.flits_desktop}`}
          >
            <div className={styles.flits_box_card}>{props.children}</div>
          </div>
        </div>
      ) : (
        <div>
          <div
            className={`${styles.flits_navigation_header} ${
              styles.flits_with_box_shadow
            } ${
              props?.notNeedBoxShadow ? styles.flits_remove_box_shadow : ""
            } ${styles.flits_mobile}`}
          >
            <a
              href={window?.commonEndpoint?.logout ?? "/account/logout"}
              className={styles.flits_logout_button}
              noInstant=""
              data-no-instant=""
            >
              <RenderSvgString svgString={window?.DuoIcon?.LogoutMobile} />
            </a>
            <div
              className={styles.flits_user_avatar}
              data-flits-name={`${
                firstNameInitial?.length > 0
                  ? firstNameInitial.charAt(0).toUpperCase()
                  : ""
              }${
                lastNameInitial?.length > 0
                  ? lastNameInitial.charAt(0).toUpperCase()
                  : ""
              }`}
            ></div>
            <Suspense fallback={<></>}>
              <UserBox mt={true} />
            </Suspense>
          </div>
          <div
            className={`${styles.flits_box_card} ${styles.flits_header_title} ${styles.flits_p_10} ${styles.flits_mobile}`}
          >
            {t(props?.label[0], props?.label[1]).toLowerCase()}
          </div>

          <div
            className={`${styles.flits_container_box} ${styles.flits_mt_25} ${styles.flits_mobile}`}
          >
            <div className={`${styles.flits_box_card} ${styles.flits_p_15}`}>
              {props.children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
