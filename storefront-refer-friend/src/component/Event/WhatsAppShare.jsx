export const handleWhatsappShare = (t) => {
    const inputElement = document.querySelector("#refer").value;
    const encodedDescription = encodeURIComponent(
      t("flits.refer_friend_page.referral_program_invitation_message", "You can earn credit for creating an account with {{ shop_name }}. Use this link and get rewarded : {{ link }}", {
        shop_name: window?.flitsThemeAppExtensionObjects?.shop_name,
        link: inputElement,
      })
    );

    const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodedDescription}`;

    const popupWidth = 700;
    const popupHeight = 700;
    const left = (window.innerWidth - popupWidth) / 2;
    const top = (window.innerHeight - popupHeight) / 2;

    window.open(
      whatsappShareUrl,
      "Whatsapp Share",
      `width=${popupWidth},height=${popupHeight},left=${left},top=${top}`
    );
  };