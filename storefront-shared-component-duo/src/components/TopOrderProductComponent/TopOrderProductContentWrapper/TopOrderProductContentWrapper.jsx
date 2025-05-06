import { useSelector } from "react-redux";
import styles from "./TopOrderProductContentWrapperModule.module.css";
import React, { Suspense } from "react";
import { RenderSvgString } from "../../General/RenderSvgString";
import { UserBox } from '../../General/UserBox/UserBox';

export const TopOrderProductContentWrapper = (props) => {
  const firstNameInitial = useSelector((state) => state.storeFrontMyProfile.firstNameInitial);
  const lastNameInitial = useSelector((state) => state.storeFrontMyProfile.lastNameInitial);
  return (
    <>
      <div className={`${styles.flits_tab_box_body} ${styles.flits_desktop}`}>
        <div className={`${styles.flits_top_order_list_div}`}>
          {props.children}
          <div className={styles.flits_clearfix}></div>
        </div>
      </div>
      <div
        className={`${styles.flits_mobile_account_box} ${styles.flits_top_order_div} ${styles.flits_mobile}`}
      >
        <div className={`${styles.flits_top_order_mobile_list}`}>
          <div
            className={`${styles.flits_navigation_header} ${
              styles.flits_with_box_shadow
            } ${styles.flits_pb_30}`}
          >
            <a href={window?.commonEndpoint?.logout ?? "/account/logout"} className={styles.flits_logout_button} noInstant="" data-no-instant="">
            <RenderSvgString svgString={window?.DuoIcon?.LogoutMobile} />
            </a>
            <div
              className={styles.flits_user_avatar}
              data-flits-name={`${
                firstNameInitial?.length > 0 ? firstNameInitial.charAt(0).toUpperCase() : ""
              }${lastNameInitial?.length > 0 ? lastNameInitial.charAt(0).toUpperCase() : ""}`}
            ></div>
            <Suspense fallback={<></>}>
            <UserBox mt={true} />
            </Suspense>
          </div>
          {props.children}
        </div>
      </div>
    </>
  );
};
