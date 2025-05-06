export const ReferralLink = (data) => {
  let flits_referral_link;
  let customer_name = window.flitsThemeAppExtensionObjects.customer.name;
  let customer_ref_code = window?.flitsThemeAppExtensionObjects?.customerExist
    ? parseInt(window.flitsThemeAppExtensionObjects.customer.customer_id).toString(36)
    : "";
  if (customer_ref_code) {
    flits_referral_link =
      "https://" +
      window.location.host +
      `${window?.commonEndpoint?.register ?? "/account/register"}?flits_refer_code=` +
      encodeURIComponent(unescape(btoa(encodeURIComponent(customer_ref_code)))) +
      "&flits_inviter_name=" +
      encodeURIComponent(unescape(btoa(encodeURIComponent(customer_name))));
  }
  return flits_referral_link;
};
