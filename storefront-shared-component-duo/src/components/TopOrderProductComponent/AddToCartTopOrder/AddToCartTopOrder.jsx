import styles from "./AddToCartTopOrderModule.module.css";
import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useSelector } from "react-redux";

export const AddToCartTopOrder = ({ item, handleAddToCartClick }) => {

  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;
  const orderField = useSelector(
    (state) => state.storeFrontTopOrderProduct.orderField
  );

  const { t } = useTranslationLanguage();

  const handleAddToCart = async () => {
    handleAddToCartClick()
  };

  return (
    <>
      <button
        type="button"
        className={`${styles.flits_button} ${styles.flits_primary_btn} ${styles.flits_add_to_cart}`}
        data-btn-action="Add to cart"
        data-flits-add-action-from="wishlist"
        data-flits-add-cart-text="Add to Cart"
        disabled={!orderField[`${item[0]?.product_id}Availabel`]}
        onClick={handleAddToCart}
        data-flits-sold-text="Sold Out"
      >
        {orderField[`${item[0]?.product_id}Availabel`]
          ? t("flits.buttons.add_to_cart","Add to Cart")
          : t("flits.buttons.sold_out","Sold Out")}
      </button>
    </>
  );
};
