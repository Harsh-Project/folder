import "tippy.js/dist/tippy.css";
const React = await import("react").then((module) => module.default);
const styles = await import("./CollectionPageAddToWishList.module.css").then(
  (module) => module.default
);
const GlobalStore = await import("redux-micro-frontend").then(
  (module) => module.GlobalStore
);
const useEffect = await import("react").then((module) => module.useEffect);
const tippy = await import("tippy.js").then((module) => module.default);
const useRef = await import("react").then((module) => module.useRef);
/* eslint-disable jsx-a11y/anchor-is-valid */

export const CollectionPageAddToWIshList = ({
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
          ? t("flits.wishlisted_product_page.remove_from_wishlist_button")
          : t("flits.wishlisted_product_page.add_to_wishlist_button"),
        placement: "top",
        arrow: true,
        theme: "light",
      });
    }
  }, [wishListed, t]);
  return (
    <div
      ref={buttonRef}
      className={`${styles.flits_wishlist_colection} ${styles.flits_wishlist_colection_style} ${styles.flits_wishlist_button_style}`}
    >
      <a
        onClick={handleButtonClick}
        className={`${styles.flits_wls_button} ${styles.flits_wls_two} ${styles.flits_wls_desktop} ${styles.flits_wls_button_secondary} ${styles.flits_wls_button_full_width} ${styles.flits_wls_deactivate} ${styles.flits_wls_inactive}`}
      >
        <div className={styles.flits_wls_icon_with_text}>
          <div className={styles.flits_wls_icon_with_text_icon}>
            <div className={styles.flits_btn_effect}>
              <svg
                className={`${styles.heart_full} ${styles.flits_wls_icon_svg} ${
                  styles.icon_svg_size_4
                } ${
                  wishListed
                    ? styles.flits_change_color
                    : styles.flits_wls_icon_svg_color_blue
                }`}
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="currentColor"
                stroke_width="2"
                fill="none"
                stroke_linecap="round"
                stroke_linejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              {wishListed && (
                <div className={styles.flits_wls_effect_group}>
                  <span className={styles.flits_wls_effect}></span>
                  <span className={styles.flits_wls_effect}></span>
                  <span className={styles.flits_wls_effect}></span>
                  <span className={styles.flits_wls_effect}></span>
                  <span className={styles.flits_wls_effect}></span>
                </div>
              )}
            </div>
          </div>
        </div>
      </a>
      {parseInt(
        window?.flitsThemeAppExtensionObjects?.Metafields?.WSL_COUNT_ENABLE
      ) ? (
        <a className={styles.flits_wls_count_btn} style={{ display: "flex" }}>
          {wishListCount}
        </a>
      ) : null}
    </div>
  );
};
