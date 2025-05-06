const styles = await import("./WishListContentWrapper.module.css").then(
  (module) => module.default
);
const React = await import("react").then((module) => module.default);

export const WishListContentWrapper = (props) => {
  return (
    <div className={styles.flits_tab_box_body}>
      <div className={styles.flits_wishlist_list_div}>
        <ul className={styles.flits_wishlist_product_list}>
          {props?.children}
        </ul>
      </div>
    </div>
  );
};
