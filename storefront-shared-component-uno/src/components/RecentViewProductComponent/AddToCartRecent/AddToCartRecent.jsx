import styles from "./AddToCartRecent.module.css";
import React from "react";
import { GlobalStore } from "redux-micro-frontend";

export const AddToCartRecent = ({ value, handleAddToCartClick }) => {
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
        className={`${styles.flits_button} ${styles.flits_primary_btn} ${styles.flits_mt_10} ${styles.flits_add_to_cart} ${styles.flits_ml_0}`}
        data-btn-action="Add to cart"
        data-flits-add-action-from="wishlist"
        data-flits-add-cart-text="Add to Cart"
        disabled={!value?.available}
        onClick={handleClick}
        data-flits-sold-text="Sold Out"
      >
        {value?.available
          ? t("flits.buttons.add_to_cart","Add to Cart")
          : t("flits.buttons.sold_out","Sold Out")}
      </button>
    </>
  );
};
