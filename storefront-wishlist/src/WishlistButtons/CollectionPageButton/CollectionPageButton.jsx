import React, { useEffect, useState } from "react";
import { GlobalStore } from "redux-micro-frontend";
import ReactDOM from "react-dom";

export const CollectionPageButton = ({ productCardPosition, selector }) => {
  const currentDivElement = window.document.querySelectorAll(selector)[0];
  const currentWishListed = false;
  const currentWishListCount =
    window.document
      .querySelectorAll(selector)[0]
      .getAttribute("data-flits-product-wsl-count") === ""
      ? 0
      : parseInt(
          window.document
            .querySelectorAll(selector)[0]
            .getAttribute("data-flits-product-wsl-count")
        );

  const [wishListed, setWishListed] = useState(currentWishListed);
  const [wishListCount, setWishListCount] = useState(currentWishListCount);
  // eslint-disable-next-line no-unused-vars
  const [form, setForm] = useState(currentDivElement);
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
    SetLocalStorage,
    GetLocalStorage,
    useTranslationLanguage,
  } = getStore._globalActions.Helpers[0];
  const API = getStore._globalActions.API[0].API;
  const FlitsMessageModal = window.UnoDuoComponent("FlitsMessageModal");
  const CollectionPageAddToWIshList = window.UnoDuoComponent(
    "CollectionPageAddToWIshList"
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
      product_title: currentDivElement.getAttribute("data-flits-product-title"),
      product_image: currentDivElement.getAttribute("data-flits-product-image"),
      product_handle: currentDivElement.getAttribute(
        "data-flits-product-handle"
      ),
      product_id: currentDivElement.getAttribute("data-flits-product-id"),
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
      !wishListed &&
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
      product_title: currentDivElement.getAttribute("data-flits-product-title"),
      product_image: currentDivElement.getAttribute("data-flits-product-image"),
      product_handle: currentDivElement.getAttribute(
        "data-flits-product-handle"
      ),
      product_id: currentDivElement.getAttribute("data-flits-product-id"),
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

  useEffect(() => {
    let isProductAddedToWishlist = IsProductAddedInWishlist(
      currentDivElement.getAttribute("data-flits-product-handle")
    );
    if (isProductAddedToWishlist) {
      setWishListed(true);
    }
  }, [IsProductAddedInWishlist, currentDivElement]);

  if (currentDivElement) {
    const formElement = currentDivElement;
    return (
      <>
        {ReactDOM.createPortal(
          <CollectionPageAddToWIshList
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
          image={currentDivElement.getAttribute("data-flits-product-image")}
          title={currentDivElement.getAttribute("data-flits-product-title")}
        />
      </>
    );
  }

  return null;
};
