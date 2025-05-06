import styles from "./NavigationHeadingModule.module.css";
import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Clock } from "./Clock/Clock";

export const NavigationHeading = () => {
  const firstNameInitial = useSelector(
    (state) => state.storeFrontMyProfile.firstNameInitial
  );
  const lastNameInitial = useSelector(
    (state) => state.storeFrontMyProfile.lastNameInitial
  );
  return (
    <div
      className={`${styles.flits_navigation_header} ${styles.flits_with_shadow} flits_navigation_header_wrapper`}
    >
      <div
        className={`${styles.flits_user_avatar} flits_navigation_user_avatar_logo`}
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
      <div className={`${styles.flits_user_box} flits_navigation_user_box`}>
        <div className={`${styles.flits_d_flex} flits_navigation_customer_full_name_wrapper`}>
          <p
            className={`${styles.flits_h4} ${styles.flits_user_name} flits_navigation_customer_full_name`}
          >{`${firstNameInitial} ${lastNameInitial}`}</p>
        </div>
        <div
          className={`${styles.flits_d_flex} ${styles.flits_align_items_center} flits_navigation_clock_wrapper`}
        >
          <Suspense fallback={<></>}>
            <Clock />
          </Suspense>
        </div>
      </div>
    </div>
  );
};
