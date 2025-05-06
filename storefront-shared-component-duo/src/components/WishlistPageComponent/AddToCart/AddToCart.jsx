const styles = await import("./AddToCartModule.module.css").then((module) => module.default);
const React = await import("react").then((module) => module.default);
const GlobalStore= await import("redux-micro-frontend").then((module) => module.GlobalStore);

export const AddToCart = ({ value, handleAddToCartClick }) => {
  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;

  const { t } = useTranslationLanguage();

  const handleClick = async () => {
    handleAddToCartClick(value)
  };

  return (
    <>
      <button
        type="button"
        className={`${styles.flits_button} ${styles.flits_primary_btn} ${styles.flits_add_to_cart}`}
        data-btn-action="Add to cart"
        data-flits-add-action-from="wishlist"
        data-flits-add-cart-text="Add to Cart"
        disabled={!value?.available}
        onClick={handleClick}
        data-flits-sold-text="Sold Out"
      >
        {value?.available
          ? t("flits.buttons.add_to_cart", "Add to Cart")
          : t("flits.buttons.sold_out", "Sold Out")}
      </button>
    </>
  );
};
