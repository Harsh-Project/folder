import React from "react";
import { useEffect, useState } from "react";
import { CollectionPageButton } from "./WishlistButtons/CollectionPageButton/CollectionPageButton";
import { GlobalStore } from "redux-micro-frontend";
import { useCallback } from "react";

function WisListCollection(props) {
  const getStore = GlobalStore.Get();
  const wishlistKeyInLocalStorage = "flits_wishlist_products";
  const {
    Utility,
    SetLocalStorage,
    GetLocalStorage,
    CheckIsMinuteOrNot,
    EVENTS,
    SetupCollectionPageEvents,
  } = getStore._globalActions.Helpers[0]
  const customerEmailKeyInLocalStorage = "flits_customer_email";
  const API = getStore._globalActions.API[0].API;
  const [collectionCards, setCollectionCards] = useState(null);

  const updateCollectionPage = (event) => {
    setTimeout(() => {
      const getCards = document.getElementsByClassName(
        "flits-collection-page-wishlist-button"
      );
      if (getCards?.length > 0) {
        const arrayFromHtmlCollection = Array.from(getCards);
        setCollectionCards(arrayFromHtmlCollection);
      }
    }, 1000);
  };

  useEffect(() => {
    updateCollectionPage();
  }, []);

  useEffect(() => {
    console.log("useEffect subscribe event");
    Utility.subscribeEvent(EVENTS.AJAX_COLLECTION_UPDATE, updateCollectionPage);
    return () => {
      Utility.unsubscribeEvent(
        EVENTS.AJAX_COLLECTION_UPDATE,
        updateCollectionPage
      );
    };
  }, [Utility, EVENTS.AJAX_COLLECTION_UPDATE]);

  useEffect(() => {
    SetupCollectionPageEvents();
  }, [SetupCollectionPageEvents]);

  useEffect(() => {
    const loaders = document.getElementsByClassName("flits_initial_loader");
    for (let i = 0; i < loaders.length; i++) {
      loaders[i].style.display = "none";
    }
  });

  const getData = useCallback(async () => {
    if (!window?.flitsThemeAppExtensionObjects?.customer?.customer_id) {
      return;
    }
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
  }, [CheckIsMinuteOrNot, API.wishlist, SetLocalStorage, GetLocalStorage]);

  useEffect(() => {
    getData();
  }, [getData]);

  if (!collectionCards || collectionCards?.length <= 0) {
    return null;
  }

  return (
    Array.isArray(collectionCards) &&
    collectionCards?.length > 0 &&
    collectionCards.map((item, index) => {
      const handle = item.getAttribute("data-flits-product-handle");
      const selector =
        ".flits-collection-page-wishlist-button[data-flits-product-handle='" +
        handle +
        "']";
      return (
        <CollectionPageButton
          productCardPosition={item}
          selector={selector}
          index={`${index}_${handle}`}
          key={`${index}_${handle}`}
        />
      );
    })
  );
}

export default WisListCollection;
