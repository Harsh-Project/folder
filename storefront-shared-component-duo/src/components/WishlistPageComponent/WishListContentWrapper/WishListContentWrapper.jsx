import { RenderSvgString } from "../../General/RenderSvgString";

const styles = await import("./WishListContentWrapperModule.module.css").then(
  (module) => module.default
);
const { Suspense, React } = await import("react").then((module) => ({
  React: module.default,
  Suspense: module.Suspense,
}));
const useSelector = await import("react-redux").then(
  (module) => module.useSelector
);
const lazily = await import("react-lazily").then((module) => module.lazily);
const { UserBox } = lazily(() => import("../../General/UserBox/UserBox"))

export const WishListContentWrapper = (props) => {
  const firstNameInitial = useSelector(
    (state) => state.storeFrontMyProfile.firstNameInitial
  );
  const lastNameInitial = useSelector(
    (state) => state.storeFrontMyProfile.lastNameInitial
  );
  const wishListData = useSelector(
    (state) => state.storeFrontWishList.wishListData
  );

  if (!wishListData) {
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
