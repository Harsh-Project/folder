export async function getIcon(dispatch, setIconReceive) {
  let lanUrl = window.flitsThemeAppExtensionObjects?.iconUrl
    ? window.flitsThemeAppExtensionObjects?.iconUrl
    : "https://cdn.shopify.com/s/files/1/0030/7491/6461/files/Flits_icons.json?v=1734670873";
  let lanCall = await fetch(lanUrl);
  let lang = await lanCall.json();
  window.flits_icons = lang;
  if (lang) dispatch(setIconReceive(true));
  return lang;
}
