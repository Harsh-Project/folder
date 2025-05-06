import { useSelector } from "react-redux";
import styles from "./RecentViewContentWrapperModule.module.css";
import React, { Suspense } from "react";
import { RenderSvgString } from "../../General/RenderSvgString";
import { UserBox } from "../../General/UserBox/UserBox";

export const RecentViewContentWrapper = (props) => {
  const firstNameInitial = useSelector(
    (state) => state.storeFrontMyProfile.firstNameInitial
  );
  const lastNameInitial = useSelector(
    (state) => state.storeFrontMyProfile.lastNameInitial
  );
  const recentlyViewedData = useSelector(
    (state) => state.storeFrontRecentlyViewedProducts.recentlyViewedData
  );

  if (!recentlyViewedData) {
    return null;
  }

  return (
    <>
      <div
        className={`${styles.flits_navigation_header} ${styles.flits_with_box_shadow} ${styles.flits_pb_30}`}
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
        className={`${styles.flits_container_box} ${styles.flits_wishlist_container} ${styles.flits_mt_25}`}
      >
        {props?.children}
        <div className={styles.flits_clearfix}></div>
      </div>
    </>
  );
};
