export const handleShare = (t) => {
  const inputElement = document.querySelector("#refer").value;
  const description = t("flits.refer_friend_page.referral_program_invitation_message", "You can earn credit for creating an account with {{ shop_name }}. Use this link and get rewarded : {{ link }}", {
    shop_name: window?.flitsThemeAppExtensionObjects?.shop_name,
    link: inputElement,
  });
  navigator.share({ title: "Refer Friend", text: description });
};
