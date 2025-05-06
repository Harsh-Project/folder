export const SubmitLoginForm = (email, password) => {
    let form = document.querySelector('form#customer_login');
    //we have added below code to resolve reCaptcha issue and captcha function provided by Shopify
    function submitForm(form){
        form.querySelector('input[name="customer[email]"]').value = email;
        form.querySelector('input[name="customer[password]"]').value = password;
        form.submit();
    }
    form.setAttribute('data-shopify-captcha',true);
    window?.Shopify?.captcha === undefined ? submitForm(form) :
    window.Shopify.captcha.protect(form, () => {submitForm(form)})
}