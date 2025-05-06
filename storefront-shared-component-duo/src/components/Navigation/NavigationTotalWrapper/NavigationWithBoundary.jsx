import { useSelector } from "react-redux";
import styles from "./NavigationTotalWrapperModule.module.css";
import React, { Suspense } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { RenderSvgString } from "../../General/RenderSvgString";
import { UserBox } from '../../General/UserBox/UserBox';

export const NavigationWithBoundary = (props) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const firstNameInitial = useSelector(
    (state) => state.storeFrontMyProfile.firstNameInitial
  );
  const lastNameInitial = useSelector(
    (state) => state.storeFrontMyProfile.lastNameInitial
  );

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (props?.notNeedWrapper && screenWidth <= 767) {
    return props?.children;
  }
  return (
    <div
      className={`${styles.flits_account_box} ${styles.flits_with_boundary} ${
        styles.flits_account_box_active
      } ${props?.needMR ? styles.flits_mr : ""} ${
        props?.notNeedBoxShadow ? styles.flits_box_shadow : ""
      }`}
    >
      <div
        className={`${styles.flits_navigation_header} ${
          styles.flits_with_box_shadow
        } ${props?.notNeedBoxShadow ? styles.flits_remove_box_shadow : ""}`}
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
        className={`${styles.flits_container_box} ${
          props?.item?.remoteApp === "storeFrontDeliveryAddress" &&
          styles.flits_px_15
        } ${
          props?.item?.remoteApp === "storeFrontDeliveryAddress" &&
          styles.flits_pb_15
        } ${styles.flits_mt_25}`}
      >
        {props?.children}
      </div>
    </div>
  );
};
