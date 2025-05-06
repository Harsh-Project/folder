const styles = await import("./WishListContentWrapperModule.module.css").then((module) => module.default);
const React = await import("react").then((module) => module.default)

export const WishListChildContentWrapper = (props) => {
  return (
    <div
      className={`${styles.flits_box_card} ${styles.flits_wishlist_product_list} ${styles.flits_list}`}
    >
      {props?.children}
    </div>
  );
};
