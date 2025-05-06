export const handleCopy = async (setSnackBarMode, setMessage, t) => {
  setSnackBarMode("processing");
  setMessage(t("flits.refer_friend_page.referral_link_copied", "Link Copied"));

  const inputElement = document.querySelector("#refer");

  if (inputElement) {
    try {
      await navigator.clipboard.writeText(inputElement.value);

      setTimeout(() => {
        setSnackBarMode(null);
        setMessage("");
      }, 2500);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }
};
