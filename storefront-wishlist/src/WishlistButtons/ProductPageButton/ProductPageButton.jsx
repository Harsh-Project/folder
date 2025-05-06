import React from "react";
import { useCallback, useEffect, useState } from "react";
import { GlobalStore } from "redux-micro-frontend";
import ReactDOM from "react-dom";
import styles from "./ProductPageButton.module.css";

function decodeHtml(html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

export const ProductPageButton = () => {
  const [wishListed, setWishListed] = useState(false);
  const [wishListCount, setWishListCount] = useState(
    parseInt(window?.flitsThemeAppExtensionObjects?.product?.wishlistCount)
  );
  const [form, setForm] = useState(false);
  const [snackBarMode, setSnackBarMode] = useState(null);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [emailValue, setEmailValue] = useState(null);
  const [openMessageModal, setOpenMessageModal] = useState(false);
  const wishlistKeyInLocalStorage = "flits_wishlist_products";
  const customerEmailKeyInLocalStorage = "flits_customer_email";

  const getStore = GlobalStore.Get();
  const SnackBar = window.UnoDuoComponent("SnackBar");
  const {
    IsProductAddedInWishlist,
    CheckIsMinuteOrNot,
    SetLocalStorage,
    GetLocalStorage,
    useTranslationLanguage,
  } = getStore._globalActions.Helpers[0];
  const API = getStore._globalActions.API[0].API;
  const FlitsMessageModal = window.UnoDuoComponent("FlitsMessageModal");
  const ProductPageAddToWishList = window.UnoDuoComponent(
    "ProductPageAddToWishList"
  );
  const ModalForm = window.UnoDuoComponent("ModalForm");

  const { t } = useTranslationLanguage();

  const handleButtonClickModal = async (input) => {
    setWishListCount(wishListCount + 1);
    if (!GetLocalStorage(customerEmailKeyInLocalStorage)) {
      SetLocalStorage(customerEmailKeyInLocalStorage, input);
    }
    setEmailValue(input);
    setOpenModal(false);
    setWishListed(true);
    setOpenMessageModal(true);

    const data = {
      customer_hash: "",
      token: window?.flitsThemeAppExtensionObjects?.customer?.shop_token,
      customer_id: "",
      customer_email: input,
      product_title:
      `${decodeHtml(decodeURIComponent(atob(window?.flitsThemeAppExtensionObjects?.product?.product_title).replace(/\+/g, " ")))}`,
      product_image:
        window?.flitsThemeAppExtensionObjects?.product?.product_image,
      product_handle:
        window?.flitsThemeAppExtensionObjects?.product?.product_handle,
      product_id: window?.flitsThemeAppExtensionObjects?.product?.product_id,
      wsl_product_count: parseInt(wishListCount) + 1,
    };

    const response = await API.wishlist.add_to_wishlist(data);
    if (response?.status) {
      setSnackBarMode("wishlist");
      setSnackBarMessage("added");
    }

    setTimeout(() => {
      setSnackBarMode(null);
      setSnackBarMessage("");
    }, 2000);
    SetLocalStorage(wishlistKeyInLocalStorage, response.products_handle);
  };

  const handleButtonClick = async () => {
    if (
      (!window?.flitsThemeAppExtensionObjects?.customer?.customer_id ||
        window?.flitsThemeAppExtensionObjects?.customer?.customer_id === "" ||
        window?.flitsThemeAppExtensionObjects?.customer?.customer_id ===
          "-1") &&
      !document.querySelector(`.${styles.flits_button_click}`) &&
      !GetLocalStorage(customerEmailKeyInLocalStorage)
    ) {
      setOpenModal(true);
      return;
    }

    let data = {
      customer_hash:
        window?.flitsThemeAppExtensionObjects?.customer?.customer_hash ?? "",
      token: window?.flitsThemeAppExtensionObjects?.customer?.shop_token ?? "",
      customer_id:
        window?.flitsThemeAppExtensionObjects?.customer?.customer_id === "" ||
        window?.flitsThemeAppExtensionObjects?.customer?.customer_id === "-1"
          ? ""
          : window?.flitsThemeAppExtensionObjects?.customer?.customer_id,
      customer_email: window?.flitsThemeAppExtensionObjects?.customer?.email
        ? window?.flitsThemeAppExtensionObjects?.customer?.email
        : GetLocalStorage(customerEmailKeyInLocalStorage)
        ? GetLocalStorage(customerEmailKeyInLocalStorage)
        : "",
      product_title:
      `${decodeHtml(decodeURIComponent(atob(window?.flitsThemeAppExtensionObjects?.product?.product_title).replace(/\+/g, " ")))}`,
      product_image:
        window?.flitsThemeAppExtensionObjects?.product?.product_image,
      product_handle:
        window?.flitsThemeAppExtensionObjects?.product?.product_handle,
      product_id: window?.flitsThemeAppExtensionObjects?.product?.product_id,
    };

    const callApi = wishListed;
    if (callApi) {
      setWishListed(false);
      setWishListCount(wishListCount - 1);
      data.wsl_product_count = parseInt(wishListCount) - 1;

      const response = await API.wishlist.remove_from_wishlist(data);
      if (response?.status) {
        setSnackBarMode("information");
        setSnackBarMessage(
          t(
            "flits.wishlisted_product_page.product_remove_from_wishlist",
            "Product removed from your wishlist"
          )
        );
      }

      setTimeout(() => {
        setSnackBarMode(null);
        setSnackBarMessage("");
      }, 2000);
      SetLocalStorage(wishlistKeyInLocalStorage, response.products_handle);
    } else {
      setWishListed(true);
      setWishListCount(wishListCount + 1);

      data.wsl_product_count = parseInt(wishListCount) + 1;

      const response = await API.wishlist.add_to_wishlist(data);
      if (response?.status) {
        setSnackBarMode("wishlist");
        setSnackBarMessage("added");
      }

      setTimeout(() => {
        setSnackBarMode(null);
        setSnackBarMessage("");
      }, 2000);
      SetLocalStorage(wishlistKeyInLocalStorage, response.products_handle);
    }
  };

  const getData = useCallback(async () => {
    const value = GetLocalStorage("timeOfWishListApiCall");
    const minute = 5;
    if (
      !GetLocalStorage(customerEmailKeyInLocalStorage) &&
      (window?.flitsThemeAppExtensionObjects?.customer?.customer_id === "-1" ||
        window?.flitsThemeAppExtensionObjects?.customer?.customer_id === "")
    ) {
      return;
    }
    if (!CheckIsMinuteOrNot(value, minute)) {
      return;
    }

    const res = await API.wishlist.get_data();
    const data = res?.data.map((item) => item?.product_handle);
    const localStorageData = data.join(",");
    SetLocalStorage(wishlistKeyInLocalStorage, localStorageData);
    SetLocalStorage("timeOfWishListApiCall", new Date());
  }, [CheckIsMinuteOrNot, SetLocalStorage, API.wishlist, GetLocalStorage]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    const form = Math.max(parseInt(
      window?.flitsThemeAppExtensionObjects?.Metafields?.WSL_CODE_AUTOMATIC
    ),0)
      ? document.querySelectorAll(
          "form[action*='/cart/add']:not([id*='product-form-installment'])"
        )[0]
      : document.querySelector(".flits-product-page-wishlist-button");
    if (form) {
      setForm(true);
    }
    if (!form) {
      // here for trade theme we used static theme_store_id to attach wishlist button
      if (
        Math.max(parseInt(
          window?.flitsThemeAppExtensionObjects?.Metafields?.WSL_CODE_AUTOMATIC
        ),0) && parseInt(window?.flitsThemeAppExtensionObjects?.theme?.theme_store_id) ===
          2699 &&
        document.querySelectorAll("share-button")[0]
      ) {
        setForm(true);
      }
    }

    let isProductAddedToWishlist = IsProductAddedInWishlist(
      window?.flitsThemeAppExtensionObjects?.product?.product_handle
    );
    if (isProductAddedToWishlist) {
      setWishListed(true);
    }
  }, [IsProductAddedInWishlist]);

  if (form) {
    const formElement = Math.max(parseInt(
      window?.flitsThemeAppExtensionObjects?.Metafields?.WSL_CODE_AUTOMATIC
    ),0)
      ? (document.querySelectorAll(
          "form[action*='/cart/add']:not([id*='product-form-installment'])"
        )[0] || document.querySelectorAll("share-button")[0])
      : document.querySelector(".flits-product-page-wishlist-button");

    return (
      <>
        {ReactDOM.createPortal(
          <ProductPageAddToWishList
            wishListed={wishListed}
            handleButtonClick={handleButtonClick}
            wishListCount={wishListCount}
          />,
          formElement
        )}
        {openModal && (
          <ModalForm
            openModal={openModal}
            setOpenModal={setOpenModal}
            handleButtonClickModal={handleButtonClickModal}
          />
        )}
        {openMessageModal && (
          <FlitsMessageModal
            openMessageModal={openMessageModal}
            setOpenMessageModal={setOpenMessageModal}
            emailValue={emailValue}
          />
        )}
        <SnackBar
          mode={snackBarMode}
          message={snackBarMessage}
          image={window?.flitsThemeAppExtensionObjects?.product?.product_image}
          title={decodeHtml(decodeURIComponent(atob(window?.flitsThemeAppExtensionObjects?.product?.product_title).replace(/\+/g, " ")))}
        />
      </>
    );
  }

  return null;
};
