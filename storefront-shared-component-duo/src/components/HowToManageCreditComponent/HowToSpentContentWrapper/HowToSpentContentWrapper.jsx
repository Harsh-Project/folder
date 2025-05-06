import styles from "./HowToSpentContentWrapperModule.module.css";
import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { RenderSvgString } from "../../General/RenderSvgString";
import { UserBox } from "../../General/UserBox/UserBox";
import { HowItWorkContainer } from "../HowToSpentContainer/HowItWorkContainer/HowItWorkContainer";

export const HowToSpentContentWrapper = (props) => {
  const firstNameInitial = useSelector(
    (state) => state.storeFrontMyProfile.firstNameInitial
  );
  const lastNameInitial = useSelector(
    (state) => state.storeFrontMyProfile.lastNameInitial
  );
  return (
    <>
      <div
        className={`${styles.flits_account_box} ${styles.flits_how_to_spend_div}`}
      >
        <div className={styles.flits_how_to_spend_container}>
          {props?.children}
        </div>
      </div>
      <div
        className={`${styles.flits_mobile_account_box} ${styles.flits_how_to_spend_div}`}
      >
        <div className={styles.flits_how_to_spend_container}>
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
        </div>
        <Suspense fallback={<></>}>
          <HowItWorkContainer />
        </Suspense>
        {props?.children}
      </div>
    </>
  );
};
