import React from "react"
import { useState, useEffect } from "react";
import styles from "./CreditUsageComponent.module.css";
import { Dropdown } from "./Dropdown/Dropdown";
import { ApplyStoreCredit } from "../component/Helpers/ApplyStoreCredit";
import { GlobalStore } from "redux-micro-frontend";
import { useSelector } from "react-redux";
import { RemoveOldDiscountCodes } from "../component/Helpers/RemoveOldDiscountCodes";
import { RedirectToCheckout } from '../component/Helpers/RedirectToCheckout';
import { CheckIntegratedApplication } from '../component/Helpers/CheckIntegratedApplication';

export const CreditUsageContainer = (props) => {
    const checkoutIndex = props.appendedTo.getAttribute("data-flits-checkout-index");
    // if form and parent element is same then parentElement can be null
    // const parentElement = window.document.querySelector("[data-flits='store-credit-parent'][data-flits-checkout-index='"+checkoutIndex+"']");
    const checkoutButton = window.document.querySelector("[data-flits='store-credit-added'][data-flits-checkout-index='"+checkoutIndex+"']");
    const checkoutForm = window.document.querySelector("[data-flits='store-credit-cart-form'][data-flits-checkout-index='"+checkoutIndex+"']");
    const updateCartButton = window.document.querySelector("[data-flits='store-credit-update-button'][data-flits-checkout-index='"+checkoutIndex+"']");

    // const availableSpentRules = props.availableSpentRules;

    let cartData = useSelector((state) => state.StoreFrontShopifyData.cartData);

    const getStore = GlobalStore.Get();

    const [selectedValue, setSelectedValue] = useState(-1);

    const handleOnChange = (newValue) => {
        setSelectedValue(parseInt(newValue));
    }

    const useTranslationLanguage = getStore._globalActions.Helpers[0].useTranslationLanguage;
    const { t } = useTranslationLanguage();

    const handleCheckoutEvent = (event) => {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        const isCheckoutPossible = CheckIntegratedApplication();
        if(!isCheckoutPossible){
            return false;
        }
        if(selectedValue === -1){
            RemoveOldDiscountCodes();
            RedirectToCheckout({discount: "+"}, checkoutButton);
        }else{
            ApplyStoreCredit({event, cartData, t, checkoutButton, selectedValue});
        }
        return false;
    }

    const handleUpdateButtonClickEvent = (event) => {
        event.target.setAttribute('data-flits-clicked', 'update-cart-btn');
    }

    const handleGlobalClickEvent = (event) => {
        const DataFlitsClicked = event.target.getAttribute("data-flits-clicked");
        if(!DataFlitsClicked || DataFlitsClicked !== "update-cart-btn"){
            updateCartButton?.removeAttribute('data-flits-clicked');
        }
    }

    const handleFormSubmitEvent = (event) => {
        const submitter = event.submitter;
        if (submitter.getAttribute("flitsFormSubmitted")) {
            checkoutForm.submit();
            return true;
        }
        if (window.document.querySelectorAll("[data-flits-clicked='update-cart-btn']").length > 0) {
            return true;
        }
        var submitBtn = null;
        if (event.originalEvent && event.originalEvent.submitter) {
          submitBtn = event.originalEvent.submitter;
        }
        if (!submitBtn && document.activeElement.type === "submit") {
          submitBtn = document.activeElement;
        }
        if (!submitBtn) {
          // We assume that checkout button has name attrobute with checkout
          submitBtn = checkoutButton;
        }
        if (!submitBtn) {
          return true;
        }
        return handleCheckoutEvent(event);
    }

    useEffect(() => {
        checkoutButton?.addEventListener('click', handleCheckoutEvent);
        updateCartButton?.addEventListener('click', handleUpdateButtonClickEvent);
        window.document.addEventListener('click', handleGlobalClickEvent);
        checkoutForm?.addEventListener('submit', handleFormSubmitEvent);
        return () => {
            checkoutButton?.removeEventListener('click', handleCheckoutEvent);
            updateCartButton?.removeEventListener('click', handleUpdateButtonClickEvent);
            window.document.removeEventListener('click', handleGlobalClickEvent);
            checkoutForm?.removeEventListener('submit', handleFormSubmitEvent);
        }
    });
    return (<>
    <div className={styles.flits_credit_code_div}>
        <Dropdown {...props} onChange={handleOnChange} />
    </div>
    </>);
}