import styles from "./RefundCreditGraphContainerModule.module.css";
import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { RenderSvgString } from "../../../General/RenderSvgString";
import { RefundCreditChart } from "./RefundCreditChart/RefundCreditChart";
import { RefundCreditTitle } from "./RefundCreditTitle/RefundCreditTitle";
import { RefundCreditImage } from "./RefundCreditImage/RefundCreditImage";
import { UserBox } from "../../../General/UserBox/UserBox";

export const RefundCreditGraphContainer = () => {
  const firstNameInitial = useSelector(
    (state) => state.storeFrontMyProfile.firstNameInitial
  );
  const lastNameInitial = useSelector(
    (state) => state.storeFrontMyProfile.lastNameInitial
  );
  return (
    <>
      <div className={styles.flits_account_box_header}>
        <Suspense fallback={<></>}>
          <RefundCreditChart />
          <RefundCreditTitle />
          <RefundCreditImage />
        </Suspense>
      </div>
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
        <div className={styles.flits_navigation_header_content}>
          <Suspense fallback={<></>}>
            <RefundCreditChart />
            <UserBox />
            <RefundCreditImage />
          </Suspense>
        </div>
      </div>
    </>
  );
};
