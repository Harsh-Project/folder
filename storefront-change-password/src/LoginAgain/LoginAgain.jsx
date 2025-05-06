import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const LoginAgain = ({ newPassword, setLoginAgain }) => {
  const dispatch = useDispatch();
  const setConfirmNewPassword = window.updatePasswordState("setConfirmNewPassword");
  const setNewPassword = window.updatePasswordState("setNewPassword");

  useEffect(() => {
    let login_form = document.createElement("form");
    login_form.setAttribute("action", "/account/login");
    login_form.style.display = "none";
    login_form.setAttribute("method", "post");
    login_form.setAttribute("autocomplete", "off");

    let emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.name = "customer[email]";
    emailInput.autocomplete = "off";
    emailInput.value = window?.flitsThemeAppExtensionObjects?.customer?.email;
    login_form.appendChild(emailInput);

    let checkout = document.createElement("input");
    checkout.type = "hidden";
    checkout.name = "checkout_url";
    checkout.autocomplete = "off";
    checkout.value = window.location.href;
    login_form.appendChild(checkout);

    let passwordInput = document.createElement("input");
    passwordInput.type = "password";
    passwordInput.name = "customer[password]";
    passwordInput.autocomplete = "off";
    passwordInput.value = newPassword;
    login_form.appendChild(passwordInput);
    document.body.append(login_form);

    let formtype = document.createElement("input");
    formtype.type = "hidden";
    formtype.name = "form_type";
    formtype.autocomplete = "off";
    formtype.value = "customer_login";
    login_form.appendChild(formtype);

    login_form.setAttribute("data-shopify-captcha", true);
    window?.Shopify?.captcha === undefined
      ? login_form.submit()
      : window.Shopify.captcha.protect(login_form, () => {
          login_form.submit();
        });
  }, [
    setLoginAgain,
    setNewPassword,
    dispatch,
    setConfirmNewPassword,
    newPassword,
  ]);

  return null;
};
