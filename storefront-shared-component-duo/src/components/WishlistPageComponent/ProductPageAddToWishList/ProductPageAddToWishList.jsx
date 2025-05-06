import "tippy.js/dist/tippy.css";
const { React, useEffect, useRef } = await import("react").then((module) => ({
  React: module.default,
  useEffect: module.useEffect,
  useRef: module.useRef,
}));
const tippy = await import("tippy.js").then((module) => module.default);
const styles = await import("./ProductPageAddToWishList.module.css").then(
  (module) => module.default
);
const GlobalStore = await import("redux-micro-frontend").then(
  (module) => module.GlobalStore
);

export const ProductPageAddToWishList = ({
  wishListed,
  handleButtonClick,
  wishListCount,
}) => {
  const getStore = GlobalStore.Get();
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();
  const buttonRef = useRef(null);

  useEffect(() => {
    if (buttonRef.current) {
      tippy(buttonRef.current, {
        content: wishListed
          ? t("flits.wishlisted_product_page.remove_from_wishlist_button", "Added to Wishlist")
          : t("flits.wishlisted_product_page.add_to_wishlist_button", "Add to Wishlist"),
        placement: "top",
        arrow: true,
        theme: "light",
      });
    }
  }, [wishListed, t]);
  return (
    <div
      ref={buttonRef}
      className={`${styles.flits_wishlist_button_product_page}`}
    >
      <div className={styles.flits_wishlist_button}>
        <div
          className={`${styles.flits_button_section} ${
            wishListed ? styles.flits_button_click : ""
          }`}
          onClick={handleButtonClick}
        >
          <div className={styles.flits_heart_icon_section}>
            <svg
              className={`${styles.flits_heart_icon} ${
                wishListed ? styles.flits_clicked_heart : ""
              }`}
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            {wishListed && (
              <div className={styles.flits_icon_effect}>
                <span className={styles.flits_icon_effect_span}></span>
                <span className={styles.flits_icon_effect_span}></span>
                <span className={styles.flits_icon_effect_span}></span>
                <span className={styles.flits_icon_effect_span}></span>
                <span className={styles.flits_icon_effect_span}></span>
              </div>
            )}
          </div>
          {parseInt(window?.flitsThemeAppExtensionObjects?.Metafields?.WSL_BTN_TYPE) === 1 && <div
            className={`${styles.flits_button_text} ${
              wishListed ? styles.flits_clicked_text : ""
            }`}
          >
            {wishListed
              ? t("flits.wishlisted_product_page.remove_from_wishlist_button", "Added to Wishlist")
              : t("flits.wishlisted_product_page.add_to_wishlist_button", "Add to Wishlist")}
          </div>}
        </div>
        {parseInt(window?.flitsThemeAppExtensionObjects?.Metafields?.WSL_COUNT_ENABLE) ? <div className={styles.flits_wishlist_count}>{wishListCount}</div> : null}
      </div>
    </div>
  );
};
